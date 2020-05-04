import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";
import {
  IGoogleKnowledgeGraphData,
  INewsTopic,
} from "./gooleKnowledgeGraphData";
import { StorageService } from "../storage/storage.service";
import { Itopics } from "../storage/topics";
import { ModalController } from "@ionic/angular";
import { ModalPageComponent } from "../modal-page/modal-page.component";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  newsTopics: INewsTopic[] = [];
  courses: string[] = [];
  selectedCourse: string;
  displayTopic: INewsTopic;

  constructor(
    private httpService: HttpService,
    private storage: StorageService,
    public modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.courses = this.storage.getTopics().map((r) => r.courseName);

    const topics: Itopics[] = JSON.parse(
      JSON.stringify(this.storage.getTopics())
    );

    for (const t of topics) {
      const graphDataList: IGoogleKnowledgeGraphData[] = [];
      this.httpService
        .getGoogleKnowledgeGraphData(t.topic)
        .subscribe((data) => {
          if (data != null) {
            for (let item of data.itemListElement) {
              if (item.result.name != "" && item.result.detailedDescription) {
                let d: IGoogleKnowledgeGraphData = {
                  name: item.result.name,
                  description: item.result.description,
                  detailDescription: item.result.detailedDescription
                    ? {
                        url: item.result.detailedDescription.url,
                        articleBody:
                          item.result.detailedDescription.articleBody,
                      }
                    : null,
                };
                graphDataList.push(d);
              }
            }
          }
        });

      const newsTopic: INewsTopic = {
        courseName: t.courseName,
        topic: t.topic,
        date: t.date,
        googleKnowledgeGraphData: graphDataList,
      };
      this.newsTopics.push(newsTopic);
    }

    this.selectedCourse = this.newsTopics[0].courseName;
    this.displayTopic = this.newsTopics[0];
  }

  onCourseChange(event): void {
    this.selectedCourse = event.detail.value;
    this.displayTopic = this.newsTopics.filter(
      (r) => r.courseName == event.detail.value
    )[0];
  }

  async openModalDetailed(event, url, topic) {
    const myModal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        url: url,
        topic: topic,
      },
    });
    return await myModal.present();
  }
}
