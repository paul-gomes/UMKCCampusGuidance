export interface IGoogleKnowledgeGraphData {
  name: string;
  description: string;
  url: string;
  detailDescription: IDetailDescription;
}

export interface IDetailDescription {
  url: string;
  articleBody: string;
}
