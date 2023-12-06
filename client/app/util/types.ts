export type UserData = {
  email: string;
  id?: string;
  password?: string;
};

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  staus?: number;
  UserData?: UserData | null;
};

export type LinkConfig = {
  label: string;
  href: string;
};
