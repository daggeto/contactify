import React, { useState, useEffect, useCallback } from "react";
import { Filter, User, SortDirection } from "types";

import { ContactsContext } from "./context";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export function ContactsProvider({ children }: Props) {
  const [initialContacts, setInitialContacts] = useState<User[]>([]);
  const [contacts, setContacts] = useState<User[]>([]);
  const [cities, setCities] = useState([]);
  const [sort, setSort] = useState<SortDirection>("asc");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    city: "",
    isActive: false,
  });

  const setFilterValue = useCallback(
    (key: string, value: string) => {
      setFilter({ ...filter, [key]: value });
    },
    [filter]
  );

  const filterContacts = useCallback(() => {
    let newContactsToDisplay = initialContacts.filter((contact) => {
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
  }, [filter, sort, initialContacts, setContacts]);

  useEffect(() => {
    const availableCities = [];
    initialContacts.forEach((contact) => {
      if (!availableCities.includes(contact.city)) {
        availableCities.push(contact.city);
      }
    });

    setCities(availableCities);

    filterContacts();
  }, [initialContacts]);

  useEffect(() => {
    let sortedContacts = [...contacts];

    sortedContacts.sort((contactA, contactB) => {
      return contactA.name.localeCompare(contactB.name);
    });

    if (sort === "desc") {
      sortedContacts = sortedContacts.reverse();
    }
    
    setContacts(sortedContacts);
  }, [sort]);

  useEffect(() => {
    setLoading(true);
    fetch("https://contactify-api.herokuapp.com/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setInitialContacts(data);
        setContacts(data);
        setLoading(false);
        filterContacts();
      });
  }, []);

  return (
    <ContactsContext.Provider
      value={{ loading, cities, contacts, filter, setFilterValue, filterContacts, sort, setSort }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
