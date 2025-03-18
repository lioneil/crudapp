export type Task = {
  id: string | number | undefined;
  title: string | undefined;
  completed: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
};
