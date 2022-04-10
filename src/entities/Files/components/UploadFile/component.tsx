import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  MantineTheme,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { useAuth } from 'app/providers';
import { UserDocument } from 'entities/Files';
import { api } from 'entities/Files/api';
import React, { SVGAttributes, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { CrossIcon, ImageIcon, UploadIcon } from 'shared/components/icons';
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
  const [rejected, setRejected] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const { token } = useAuth();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const removeRejectedAlert = () => {
    setRejected(false);
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
        setUploaded([...uploaded, result]);
      },
    }
  );

  const uploadFile = () => {
    if (nameInputRef.current) {
      mutation.mutate(nameInputRef.current.value);
    }
  };

  const removeFile = (upFile: UserDocument) => {
    setUploaded(uploaded.filter((doc) => doc.id !== upFile.id));
  };

  return (
    <div>
      {uploaded.map((upFile) => (
        <div key={upFile.id} className="flex gap-x-4 items-baseline">
          <Text>{upFile.name}: </Text>
          <Alert
            variant="light"
            color="gray"
            className="mb-4 flex-1"
            withCloseButton
            closeButtonLabel="Delete"
            onClose={() => {
              removeFile(upFile);
            }}
            title={
              <p>
                <strong>{upFile?.originalname}</strong>
              </p>
            }>
            File size {formatBytes(upFile.size)}
          </Alert>
        </div>
      ))}
      {rejected && (
        <Alert
          variant="light"
          color="red"
          className="mb-4"
          withCloseButton
          onClose={removeRejectedAlert}
          title={
            <p>
              <strong>File upload rejected</strong>
            </p>
          }>
          The file is too big. It should not exceed 5mb
        </Alert>
      )}
      <Dropzone
        onDrop={(files) => {
          setFile(files[0]);
          setModalOpen(true);
          removeRejectedAlert();
        }}
        multiple={false}
        onReject={() => setRejected(true)}
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
        <div className="relative">
          <LoadingOverlay visible={mutation.isLoading} />
          <TextInput
            required
            label="What kind of file is this?"
            placeholder="e.g. Resume, Photo, etc."
            name="name"
            ref={nameInputRef}
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
            <Button type="button" onClick={uploadFile}>
              Save
            </Button>
          </ModalActions>
        </div>
      </Modal>
    </div>
  );
}

export { UploadFile };
