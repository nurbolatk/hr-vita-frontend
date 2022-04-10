import type { ApprovalStatus } from 'entities/Approval/types';

export type UpdateApprovalDTO = {
  id: number;
  masterId?: number | null;
  status?: ApprovalStatus;
};
