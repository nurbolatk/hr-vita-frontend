import { Button, Card, LoadingOverlay, Table, Text, Title } from '@mantine/core';
import { api, Candidate } from 'entities/Candidate';
import { parseCandidateStatusJSX } from 'entities/Candidate/helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export function RecruitingIndexRoute() {
  const { data: candidates, isLoading } = useQuery<Candidate[]>('candidates', api.getAll);
  const { t } = useTranslation();
  const rows = candidates?.map((candidate: Candidate) => {
    return (
      <tr key={candidate.id}>
        <td>
          <Link className="block" to={`/recruiting/${candidate.id}`}>
            {candidate.firstName} {candidate.lastName}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/recruiting/${candidate.id}`}>
            {candidate.position.name}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/recruiting/${candidate.id}`}>
            {candidate.department.name}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/recruiting/${candidate.id}`}>
            {candidate.salary}
          </Link>
        </td>

        <td>
          <Link className="block" to={`/recruiting/${candidate.id}`}>
            {parseCandidateStatusJSX(candidate.status, t)}
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div className="flex items-center gap-x-4 mb-6">
        <Title order={2}>{t('Candidates')}</Title>
        <Button<typeof Link> compact component={Link} to="/candidates/new">
          {t('Add candidate')}
        </Button>
      </div>
      <Card withBorder shadow="sm" className="relative p-0">
        <LoadingOverlay visible={isLoading} />
        <Table highlightOnHover verticalSpacing={16} horizontalSpacing={16}>
          <thead>
            <tr>
              <th>{t('Name')}</th>
              <th>{t('Position')}</th>
              <th>{t('Department')}</th>
              <th>{t('Salary')}</th>
              <th>{t('Status')}</th>
            </tr>
          </thead>

          {!isLoading && (!rows || rows.length < 1) && <tbody>{t('No candidates')}</tbody>}
          {rows && <tbody>{rows}</tbody>}
        </Table>
      </Card>
    </div>
  );
}
