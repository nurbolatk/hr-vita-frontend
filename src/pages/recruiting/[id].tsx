import { LoadingOverlay } from '@mantine/core';
import { api, Candidate, EditCandidateForm } from 'entities/Candidate';
import React from 'react';
import { useQuery } from 'react-query';
import { useIdParam } from 'shared/hooks';

export function RecruitingDetailsRoute() {
  const id = useIdParam();

  const { data: candidate, isLoading } = useQuery<Candidate>(['candidate', id], api.getOneById(id));

  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      {candidate && (
        <EditCandidateForm
          defaultValues={{
            form: {
              firstName: candidate.firstName,
              lastName: candidate.lastName,
              email: candidate.email,
              position: candidate.position.name,
              department: candidate.department.name,
              phone: candidate.phone ?? '',
              salary: String(candidate.salary ?? ''),
              location: candidate.location ?? '',
            },
            documents: candidate.documents,
            status: candidate.status,
          }}
        />
      )}
    </div>
  );
}
