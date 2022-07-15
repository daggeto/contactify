import React, { useState, useEffect } from "react";
import { Filter } from "types";

import { ContactsContext } from "./context";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const filter = {
    name: undefined,
    city: undefined,
    isActive: undefined,
  } as Filter;

  useEffect(() => {
    setLoading(true);
    fetch("https://contactify-api.herokuapp.com/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      });
  }, []);

  return (
    <ContactsContext.Provider value={{ loading, contacts, filter, sort: "asc" }}>{children}</ContactsContext.Provider>
  );
}
