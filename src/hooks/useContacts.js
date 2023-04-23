import { useContext } from "react";
import { ContactsContext } from "../contexts/ContactsContext";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createContact } from "../services/contact.service";

export function useContacts() {
    const context = useContext(ContactsContext);
    return context
}
// export function useContacts() {
//     const [contacts, setContacts] = useState([]);
  
//     useEffect(() => {
//       async function fetchContacts() {
//         try {
//           const response = await axios.get('/contact');
//           setContacts(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       }
  
//       fetchContacts();
//     }, []);
  
//     async function addContact(contactData) {
//       try {
//         const response = createContact(contactData);
//         setContacts([...contacts, response.data]);
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//     async function updateContact(contactId, contactData) {
//       try {
//         const response = await axios.put(`/contact/${contactId}`, contactData);
//         const updatedContacts = contacts.map((contact) => {
//           if (contact.id === contactId) {
//             return response.data;
//           }
//           return contact;
//         });
//         setContacts(updatedContacts);
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//     async function deleteContact(contactId) {
//       try {
//         await axios.delete(`/contact/${contactId}`);
//         const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
//         setContacts(updatedContacts);
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//     return {
//       contacts,
//       addContact,
//       updateContact,
//       deleteContact,
//     };
//  }