import { Badge } from '@mantine/core';
import React from 'react';
import { Candidate, CandidateStatus } from '..';

export function parseCandidateStatus(candidate: Candidate): JSX.Element {
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
