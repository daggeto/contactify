import React from "react";
import { User, Filter } from "types";

interface Value {
  contacts: User[];
  loading: boolean;
  filter: Filter;
  sort: 'asc' | 'desc';
}

export const ContactsContext = React.createContext<Value | null>(null);