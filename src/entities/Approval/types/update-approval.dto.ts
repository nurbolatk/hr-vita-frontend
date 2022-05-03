import type { ApprovalStatus } from 'entities/Approval/types';

export type UpdateApprovalDTO = {
  id: number;
  masterId?: number | null;
  status?: ApprovalStatus;
};

export type CreateApprovalDTO = { department: string; masterId: number; candidateId: number };
