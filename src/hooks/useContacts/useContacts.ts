import { useContext } from "react";
import { ContactsContext } from "./context";

export function useContacts() {
  return useContext(ContactsContext);
}