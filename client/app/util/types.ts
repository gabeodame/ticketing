export type UserData = {
  email: string;
  id: string;
};

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  staus?: number;
  currentUser?: UserData | null;
};
