import { createContext, useState, useEffect } from "react";
import { getContacts, createContact } from "../services/contact.service";

export const ContactsContext = createContext({});

export function ContactsContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedContacts, setSelectedContacts] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

//   const handleSelectContact = (contactId) => {
//     setSelectedContacts((prevSelectedContacts) => {
//       if (prevSelectedContacts.includes(contactId)) {
//         return prevSelectedContacts.filter((id) => id !== contactId);
//       } else {
//         return [...prevSelectedContacts, contactId];
//       }
//     });
//   };

  const onSelectAll = () => {
    if (selectAll) {
      setSelectedContacts(contacts);
      setSelectAll(false);
    } else {
      //const allContactsIds = filteredContacts.map(contact => contact.id);
      setSelectedContacts(filteredContacts);
      setSelectAll(true);
    }
  };

  function onSelectContact(contact) {
    setSelectedContacts((prevSelected) => {
      if (prevSelected.includes(contact)) {
        return prevSelected.filter((contacto) => contacto !== contact);
      }
      return [...prevSelected, contact];
    });
  }

  function setContactsAndSave(newContacts) {
    setContacts(newContacts);
    localStorage.setItem("contacts:saved", JSON.stringify(newContacts));
  }

  async function loadSavedContacts() {
    const contacts = await getContacts();
    if (contacts) {
      setContacts(contacts);
    }
  }

  useEffect(() => {
    loadSavedContacts();
  }, []);

  function addContact(newContact) {
    setContactsAndSave([...contacts, newContact]);
    createContact(newContact);
  }

  function deleteContact(contactId) {
    const newContacts = contacts.filter((item) => {
      return item.id !== contactId;
    });
    setContactsAndSave(newContacts);
  }

  function onChangeSearch(event) {
    setSearch(event.target.value);
  }

  let filteredContacts;
  if (Array.isArray(contacts)) {
     filteredContacts = contacts.filter((item) => {
        return item.names.toLowerCase().includes(search.toLowerCase());
      });
  }


  return (
    <ContactsContext.Provider
      value={{
        addContact,
        contacts,
        search,
        deleteContact,
        onChangeSearch,
        filteredContacts,
        selectedContacts,
        onSelectContact,
        onSelectAll,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
