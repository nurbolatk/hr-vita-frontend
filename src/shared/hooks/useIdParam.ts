import { useParams } from 'react-router-dom';

export function useIdParam(): number {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id as string, 10);
  return id;
}
