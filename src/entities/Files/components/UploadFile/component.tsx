import { Alert, Group, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useAuth } from 'app/providers';
import { api } from 'entities/Files/api';
import React, { SVGAttributes, useState } from 'react';
import { useMutation } from 'react-query';
import { CheckCircleIcon, CrossIcon, ImageIcon, UploadIcon } from 'shared/components/icons';
import type { UserDocument } from '../../types';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({ status, ...props }: SVGAttributes<SVGElement> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <UploadIcon {...props} />;
  }

  if (status.rejected) {
    return <CrossIcon {...props} />;
  }

  return <ImageIcon {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} width={80} height={80} />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

function UploadFile() {
  const theme = useMantineTheme();
  const { token } = useAuth();
  const [uploaded, setFile] = useState<UserDocument | null>(null);

  const mutation = useMutation(
    (file: File) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return api.uploadDocuments(formData, token);
    },
    {
      onSuccess(result) {
        setFile(result);
      },
    }
  );

  return uploaded ? (
    <Alert color="green" title="Success!" icon={<CheckCircleIcon />}>
      <strong>{uploaded.originalname}</strong> was uploaded successfully
    </Alert>
  ) : (
    <Dropzone
      onDrop={(files) => {
        mutation.mutate(files[0]);
      }}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      loading={mutation.isLoading}>
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}

export { UploadFile };
