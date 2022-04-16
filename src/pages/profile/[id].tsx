import { Card, TextInput, Text } from '@mantine/core';
import { SelectDepartment } from 'entities/Department';
import { api, SelectEmployee } from 'entities/Employee';
import { SelectPosition } from 'entities/Position';
import React from 'react';
import { useQuery } from 'react-query';
import { useIdParam } from 'shared/hooks';

export function ProfileRoute() {
  const id = useIdParam();
  const { data: employee, isLoading } = useQuery(['employee', id], () => api.getOneById(id));

  return (
    <section className="mx-auto">
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        <form className="grid gap-4 col-span-3">
          <Card withBorder shadow="md" p="lg" className="space-y-2 overflow-visible">
            <h3 className="mb-3 text-xl">Profile</h3>
            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <TextInput label="Имя" className="font-medium block" type="text" />
              <TextInput label="Фамилия" className="font-medium block" type="text" />
            </div>

            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <TextInput label="Эл. почта" className="font-medium block" type="email" />
              <TextInput label="Номер телефона" className="font-medium block" type="tel" />
            </div>

            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <TextInput label="Зарплата" className="font-medium block" type="number" />
              <TextInput label="Место жительства" className="font-medium block" type="text" />
            </div>

            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <SelectPosition value={employee?.position.name} />
              <SelectDepartment value={employee?.department.name} />
            </div>
            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <div>
                <Text size="sm" weight={500}>
                  Supervisor
                </Text>
                <SelectEmployee defaultValue={employee?.supervisor?.id} />
              </div>
              status
            </div>
          </Card>
        </form>
      </div>
    </section>
  );
}
