import { Alert, Button, Group, MantineTheme, Modal, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { useAuth } from 'app/providers';
import { api } from 'entities/Files/api';
import React, { SVGAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { CheckCircleIcon, CrossIcon, ImageIcon, UploadIcon } from 'shared/components/icons';
import { ModalActions } from 'shared/components/organisms/Modal/libs/ModalActions';
import { formatBytes } from 'shared/helpers';
import { Props } from './props';

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
  <Group position="center" spacing="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} width={80} height={80} />

    <div>
      <Text size="xl" inline>
        Drag file here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Image/PDF/Word file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

function UploadFile({ uploaded, setUploaded }: Props) {
  const theme = useMantineTheme();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const { token } = useAuth();
  const { register, handleSubmit } = useForm<{ name: string }>();

  const closeModal = () => {
    setModalOpen(false);
  };

  const mutation = useMutation(
    (name: string) => {
      const formData = new FormData();
      formData.append('file', file!, file!.name); // TODO: assert
      formData.append('name', name);
      return api.uploadDocuments(formData, token);
    },
    {
      onSuccess(result) {
        closeModal();
        setUploaded(result);
      },
    }
  );

  function uploadFile(form: { name: string }) {
    mutation.mutate(form.name);
  }

  return (
    <div>
      {/* {mutation.isSuccess && (
        <Alert color="green" title="Success!" className="mb-4" icon={<CheckCircleIcon />}>
          File <strong>{uploaded?.originalname}</strong> was uploaded successfully
        </Alert>
      )} */}
      {uploaded && (
        <div className="flex gap-x-4 items-baseline">
          <Text>{uploaded.name}: </Text>
          <Alert
            variant="light"
            color="gray"
            className="mb-4 flex-1"
            withCloseButton
            closeButtonLabel="Delete"
            onClose={() => {
              setUploaded(null);
              mutation.reset();
            }}
            title={
              <p>
                <strong>{uploaded?.originalname}</strong>
              </p>
            }>
            File size {formatBytes(uploaded.size)}
          </Alert>
        </div>
      )}
      <Dropzone
        onDrop={(files) => {
          setFile(files[0]);
          setModalOpen(true);
        }}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={[
          'image/png',
          'image/gif',
          'image/jpeg',
          'image/svg+xml',
          'image/webp',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]}
        loading={mutation.isLoading}>
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Modal opened={modalOpen} onClose={closeModal} title="Add more info" centered>
        <form onSubmit={handleSubmit(uploadFile)}>
          <TextInput
            required
            label="What kind of file is this?"
            placeholder="e.g. Resume, Photo, etc."
            {...register('name')}
          />
          {file && (
            <Alert className="mt-4" color="gray">
              {file.name}
            </Alert>
          )}
          <ModalActions>
            <Button
              variant="default"
              color="gray"
              onClick={closeModal}
              sx={{
                opacity: 0.8,
              }}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </ModalActions>
        </form>
      </Modal>
    </div>
  );
}

export { UploadFile };
