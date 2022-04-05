import { Button, Card, LoadingOverlay, Table, Title } from '@mantine/core';
import { api, Candidate } from 'entities/Candidate';
import { parseCandidateStatus } from 'entities/Candidate/helpers';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export function RecruitingIndexRoute() {
  const { data: candidates, isLoading } = useQuery<Candidate[]>('candidates', api.getAll);

  const rows = candidates?.map((candidate: Candidate) => {
    return (
      <tr key={candidate.id}>
        <td>{candidate.firstName}</td>
        <td>{candidate.lastName}</td>
        <td>{candidate.position.name}</td>
        <td>{candidate.department.name}</td>
        <td>{candidate.salary}</td>
        <td>{parseCandidateStatus(candidate)}</td>
        <td>
          <Button compact size="xs" color="red">
            Approve
          </Button>
        </td>
      </tr>
    );
  });

  console.log(rows);

  return (
    <div>
      <div className="flex items-center gap-x-4 mb-6">
        <Title order={2}>Candidates</Title>
        <Button<typeof Link> component={Link} to="/candidates/new">
          Add candidate
        </Button>
      </div>
      <Card withBorder shadow="sm" className="relative p-0">
        <LoadingOverlay visible={isLoading} />
        <Table striped highlightOnHover verticalSpacing={16} horizontalSpacing={16}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Second Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {!isLoading && (!rows || rows.length < 1) && <tbody>No candidates</tbody>}
          {rows && <tbody>{rows}</tbody>}
        </Table>
      </Card>
    </div>
  );
}
