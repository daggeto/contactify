import React, { useState, useEffect, useCallback } from "react";
import { Filter, User } from "types";

import { ContactsContext } from "./context";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export function ContactsProvider({ children }: Props) {
  const [initialContacts, setInitialContacts] = useState<User[]>([]);
  const [contacts, setContacts] = useState<User[]>([]);
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    city: "",
    isActive: false,
  });

  const setFilterValue = useCallback((key: string, value: string) => {
    setFilter({ ...filter, [key]: value });
  }, [filter]);

  const filterContacts = useCallback(() => {
    const newContactsToDisplay = initialContacts.filter((contact) => {
      if (filter.name != "" && !contact.name.includes(filter.name)) {
        return false;
      }

      if (filter.city != "" && contact.city !== filter.city) {
        return false;
      }
      
      if (filter.isActive && !contact.isActive) {
        return false;
      }

      return true;
    });

    setContacts(newContactsToDisplay);
  }, [filter, setContacts]);

  useEffect(() => {
    const availableCities = [];
    initialContacts.forEach((contact) => {
      if ( !availableCities.includes(contact.city)) {
        availableCities.push(contact.city);
      }
    });

    setCities(availableCities);
  }, [initialContacts]);

  useEffect(() => {
    setLoading(true);
    fetch("https://contactify-api.herokuapp.com/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setInitialContacts(data);
        setContacts(data);
        setLoading(false);
      });
  }, []);

  return (
    <ContactsContext.Provider
      value={{ loading, cities, contacts, filter, setFilterValue, filterContacts, sort: "asc" }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
