import { LoadingOverlay } from '@mantine/core';
import { api, Candidate, EditCandidateForm } from 'entities/Candidate';
import { interviewToInterviewState } from 'entities/Interview/helper';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export function RecruitingDetailsRoute() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id as string, 10);

  const { data: candidate, isLoading } = useQuery<Candidate>(['candidate', id], api.getOneById(id));
  console.log({ id, candidate });
  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      {candidate && (
        <EditCandidateForm
          defaultValue={{
            ...candidate,
            position: candidate.position.name,
            department: candidate.department.name,
            phone: candidate.phone ?? '',
            salary: String(candidate.salary ?? ''),
            location: candidate.location ?? '',
            interviews: interviewToInterviewState(candidate.interviews),
          }}
        />
      )}
    </div>
  );
}
