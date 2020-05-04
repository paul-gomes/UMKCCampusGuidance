import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";
import { IGoogleKnowledgeGraphData } from "./gooleKnowledgeGraphData";
import { StorageService } from "../storage/storage.service";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  topic: string = "Ionic";
  graphDataList: IGoogleKnowledgeGraphData[] = [];
  courses: string[] = [];

  constructor(
    private httpService: HttpService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.courses = this.storage.getCourseList().map((r) => r.name);
    console.log(this.courses);
    this.httpService
      .getGoogleKnowledgeGraphData(this.topic)
      .subscribe((data) => {
        if (data != null) {
          for (let item of data.itemListElement) {
            console.log(item.result.name);
            console.log(item.result.detailedDescription);
            if (item.result.name != "" && item.result.detailedDescription) {
              //console.log(item.result);
              let d: IGoogleKnowledgeGraphData = {
                name: item.result.name,
                description: item.result.description,
                detailDescription: item.result.detailedDescription
                  ? {
                      url: item.result.detailedDescription.url,
                      articleBody: item.result.detailedDescription.articleBody,
                    }
                  : null,
              };
              this.graphDataList.push(d);
            }
          }
          console.log(this.graphDataList);
        }
      });
  }
}
