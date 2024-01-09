import { GeneralStatusEnum } from '../enum/status.general.enum';

export class BaseModel {
  status: GeneralStatusEnum | null | undefined;
  createdAt: Date | null | undefined;
  createdBy: string | null | undefined;
  updatedAt: Date | null | undefined;
  updatedBy: string | null | undefined;
}
