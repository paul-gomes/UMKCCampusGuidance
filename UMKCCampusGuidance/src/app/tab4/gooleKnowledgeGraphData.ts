export interface IGoogleKnowledgeGraphData {
  name: string;
  description: string;
  detailDescription: IDetailDescription;
}

export interface IDetailDescription {
  url: string;
  articleBody: string;
}
