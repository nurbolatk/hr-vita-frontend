import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { InterivewStatus, Interview, InterviewNIO } from 'entities/Interview';

dayjs.locale('ru');

export function parseInterviewStatus(status: InterivewStatus): string {
  switch (status) {
    case InterivewStatus.FAILED:
      return 'Failed';
    case InterivewStatus.PASSED:
      return 'Passed';
    default:
      return 'Not started';
  }
}
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
      statusText: parseInterviewStatus(interview.status),
    };
  });
}
