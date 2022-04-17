import { Badge } from '@mantine/core';
import React from 'react';
import { Candidate, CandidateResponse, CandidateStatus } from '..';

export function parseCandidateStatus(candidate: CandidateResponse | Candidate): CandidateStatus {
  return candidate.status === CandidateStatus.HIRED || candidate.status === CandidateStatus.FAILED
    ? candidate.status
    : candidate.interviews.length === 0
    ? CandidateStatus.NOT_STARTED
    : CandidateStatus.ONGOING;
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

export function parseCandidateStatusJSX(status: CandidateStatus, t: any): JSX.Element {
  switch (status) {
    case CandidateStatus.ONGOING:
      return (
        <Badge className="cursor-pointer" color="blue">
          {t(parseCandidateStatusLabel(status))}
        </Badge>
      );
    case CandidateStatus.FAILED:
      return (
        <Badge className="cursor-pointer" color="red">
          {t(parseCandidateStatusLabel(status))}
        </Badge>
      );
    case CandidateStatus.HIRED:
      return (
        <Badge className="cursor-pointer" color="teal">
          {t(parseCandidateStatusLabel(status))}
        </Badge>
      );
    default:
      return (
        <Badge className="cursor-pointer" color="gray">
          {t(parseCandidateStatusLabel(status))}
        </Badge>
      );
  }
}
