import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";
import { IGoogleKnowledgeGraphData } from "./gooleKnowledgeGraphData";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"]
})
export class Tab4Page implements OnInit {
  topic: string = "Ionic";
  graphDataList: IGoogleKnowledgeGraphData[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getGoogleKnowledgeGraphData(this.topic).subscribe(data => {
      if (data != null) {
        for (let item of data.itemListElement) {
          console.log(item.result);
          let d: IGoogleKnowledgeGraphData = {
            name: item.result.name,
            description: item.result.description,
            url: item.result.url,
            detailDescription: item.result.detailedDescription
              ? {
                  url: item.result.detailedDescription.url,
                  articleBody: item.result.detailedDescription.articleBody
                }
              : null
          };
          this.graphDataList.push(d);
        }
        console.log(this.graphDataList);
      }
    });
  }
}
