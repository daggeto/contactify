export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  city: string;
  phone: string;
  isActive: boolean;
}

export type Filter = {
  name: string;
  city: string;
  isActive: boolean;
}

export type SortDirection = "asc" | "desc";