export enum UserStatusesEnum {
  ACTIVE = "active",
  BLOCK = "block",
}

export type UserStatuses = `${UserStatusesEnum}`;

export interface UserBase {
  index?: number;
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: UserStatuses;
}

export interface UserWithPassword extends UserBase {
  password?: string;
  confirmPassword?: string;
}

export interface User {
  user: UserBase;
  access_token: string | undefined;
}

export interface OtpBody {
  pin: string;
}
