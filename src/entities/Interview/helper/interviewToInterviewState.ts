import dayjs from 'dayjs';
import { dequal } from 'dequal';
import { Interview, InterviewState } from '..';

export function interviewToInterviewState(interviews: Interview[]): InterviewState[] {
  return interviews.map((interview) => {
    console.log('are they equal?', dequal(new Date(interview.datetime), new Date(interview.datetime)));

    return {
      id: interview.id,
      date: new Date(interview.datetime),
      time: new Date(interview.datetime),
      interviewerId: interview.interviewer.id,
    };
  });
}

export function combineDateAndTime(date: Date, time: Date): Date {
  const djdate = dayjs(date);
  const djtime = dayjs(time);
  let datetime = djdate.add(djtime.hour(), 'hour');
  datetime = datetime.add(djtime.minute(), 'minute');
  return datetime.toDate();
}
