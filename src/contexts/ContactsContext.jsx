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
    console.log('entra por aquiwis')
    console.log('valor de selectAll:', selectAll)
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
    const prevSelecteds = selectedContacts.filter((contacto) => contacto !== contact);
    setSelectedContacts([...prevSelecteds, contact]);
    // setSelectedContacts((prevSelected) => {
    //   if (prevSelected.includes(contact)) {
    //     return prevSelected.filter((contacto) => contacto !== contact);
    //   }
    //   return [...prevSelected, contact];
    // });
  }

  function onDeSelectContact(contact) {
    const prevSelecteds = selectedContacts.filter((contacto) => contacto !== contact);
    setSelectedContacts(prevSelecteds);
  }

  function setContactsAndSave(newContacts) {
    setContacts(newContacts);
    localStorage.setItem("contacts:saved", JSON.stringify(newContacts));
  }

  async function loadSavedContacts() {
    const contacts = await getContacts();
    if (Array.isArray(contacts) && contacts.length > 0) {
      setContacts(contacts);
    }
  }

  useEffect(() => {
    loadSavedContacts();
  }, []);

  function addContact(newContact) {
    //setContactsAndSave([...contacts, newContact]);
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

  let filteredContacts = [];
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
        onDeSelectContact,
        onSelectAll,
        selectAll,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
