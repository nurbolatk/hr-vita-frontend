import { Button, Table, Title } from '@mantine/core';
import { api, Entity } from 'entities/Candidate';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export function RecruitingIndexRoute() {
  const { data: candidates } = useQuery<Entity[]>('candidates', api.getAll);

  const rows = candidates?.map((candidate: Entity) => {
    return (
      <tr key={candidate.id}>
        <td>{candidate.firstName}</td>
        <td>{candidate.lastName}</td>
      </tr>
    );
  });

  return (
    <div>
      <Title order={2}>Candidates</Title>
      <div>
        <Button<typeof Link> component={Link} to="/candidates/new">
          Add candidate
        </Button>
        <Button variant="outline">Send application</Button>
      </div>
      <section>
        <Table>
          <thead>
            <tr>
              <th>Element position</th>
              <th>Element name</th>
              <th>Symbol</th>
              <th>Atomic mass</th>
            </tr>
          </thead>
          {!rows && <p>No candidates</p>}
          {rows && <tbody>{rows}</tbody>}
        </Table>
      </section>
    </div>
  );
}
