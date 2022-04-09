import dayjs from 'dayjs';
import type { Interview, InterviewNIO } from 'entities/Interview';

export function parseInterviewNIOs(interviews: InterviewNIO[]): Interview[] {
  return interviews.map((interview) => {
    const date = dayjs(interview.date);
    const start = dayjs(interview.start);
    const end = dayjs(interview.end);
    const datetime = `${date.format('MMM D, YYYY')} ${start.format('HH:MM')} - ${end.format('HH:MM')}`;

    return {
      ...interview,
      datetime,
      date: new Date(interview.date),
      start: new Date(interview.start),
      end: new Date(interview.end),
    };
  });
}
