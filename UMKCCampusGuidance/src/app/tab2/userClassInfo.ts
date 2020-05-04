export interface IUserClassInfo {
  building: string;
  lat: number;
  long: number;
  courses: ICourse[];
}

export interface ICourse {
  courseName: string;
  room: string;
}
