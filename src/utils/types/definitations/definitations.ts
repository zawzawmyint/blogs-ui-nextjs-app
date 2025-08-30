export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Blog {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  User: User;
}

export interface User {
  name: string;
  id: string;
}
