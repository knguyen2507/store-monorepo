import { Request } from 'express';

export interface RequestWithUser extends Request {
  token: string;
  user: {
    id: string;
    name: string;
    phone: string;
  };
}
