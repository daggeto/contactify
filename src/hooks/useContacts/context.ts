import React from "react";
import { User, Filter, SortDirection } from "types";

interface Value {
  contacts: User[];
  loading: boolean;
  filter: Filter;
  sort: SortDirection;
  cities: string[];
  setFilterValue: (key: string, value: string) => void;
  filterContacts: () => void;
  setSort: (direction: SortDirection) => void;
}

export const ContactsContext = React.createContext<Value | null>(null);