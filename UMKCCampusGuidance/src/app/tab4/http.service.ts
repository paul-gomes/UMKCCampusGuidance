import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  url: string = "https://kgsearch.googleapis.com/v1/entities:search?query=";
  API_KEY: string = "AIzaSyC5dhJkaeDDqQqCFRIxMlHSIglBHx-TvdE";

  constructor(private http: HttpClient) {}

  getGoogleKnowledgeGraphData(searchString: string): Observable<any> {
    let data = this.http.get(
      `${this.url}${searchString}&key=${this.API_KEY}&limit=10&indent=True`
    );
    return data;
  }
}
