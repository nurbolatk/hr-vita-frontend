import { Badge } from '@mantine/core';
import React from 'react';
import { Candidate, CandidateResponse, CandidateStatus } from '..';

export function parseCandidateStatus(candidate: CandidateResponse | Candidate): CandidateStatus {
  return candidate.interviews.length === 0
    ? CandidateStatus.NOT_STARTED
    : candidate.status !== CandidateStatus.HIRED && candidate.status !== CandidateStatus.FAILED
    ? CandidateStatus.ONGOING
    : candidate.status;
}

export function parseCandidateStatusJSX(candidate: Candidate): JSX.Element {
  switch (candidate.status) {
    case CandidateStatus.ONGOING:
      return <Badge className="cursor-pointer">Ongoing</Badge>;
    case CandidateStatus.FAILED:
      return (
        <Badge className="cursor-pointer" color="red">
          Failed
        </Badge>
      );
    case CandidateStatus.HIRED:
      return (
        <Badge className="cursor-pointer" color="teal">
          Hired
        </Badge>
      );
    default:
      return (
        <Badge className="cursor-pointer" color="gray">
          Not Started
        </Badge>
      );
  }
}

export function parseCandidateStatusLabel(status: CandidateStatus): string {
  switch (status) {
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
