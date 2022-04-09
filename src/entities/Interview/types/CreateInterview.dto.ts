export type CreateInterviewDto = {
  interviewerId: number;
  datetime: Date;
};

export type CreateInterviewNOO = {
  interviewerId: number;
  intervieweeId: number;
  date: Date;
  start: Date;
  end: Date;
  location: string;
  name: string;
};
