import { Candidate, CandidateStatus } from '..';

export function parseCandidateStatus(candidate: Candidate): string {
  switch (candidate.status) {
    case CandidateStatus.ONGOING:
      return 'Ongoing';
    case CandidateStatus.FAILED:
      return 'Failed';
    case CandidateStatus.HIRED:
      return 'Hired';
    default:
      return 'Not Started';
  }
}
