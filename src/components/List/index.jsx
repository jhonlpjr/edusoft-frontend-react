import React, { useState, useEffect } from 'react';
import { Contact } from '../Contact'
import styles from './list.module.scss'
import { FaSadTear } from "react-icons/fa"
import { MdMessage } from "react-icons/md"
import { useContacts } from '../../hooks/useContacts'
import { getContacts } from '../../services/contact.service';

export function List() {

    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [search, setSearch] = useState('');

    const { onSelectAll, selectAll, selectedContacts } = useContacts();

    useEffect(() => {

        getContacts()
            .then((response) => {
                setContacts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const filtered = contacts.filter((item) =>
            `${item.names} ${item.lastNames}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredContacts(filtered);

    }, [contacts, search]);

    //const { filteredContacts, search } = useContacts();

    return (
        <section className={styles.container}>

            <button onClick={onSelectAll}>{!selectAll ? 'Seleccionar todo' : 'Desmarcar todo'}</button>

            {/* {selectedContacts.length > 0 && (
                <button>
                    <>
                        <MdMessage size={20} />
                        Enviar WhatsApp
                    </> ({selectedContacts.length})
                </button>
            )} */}

            {filteredContacts.map((item) => {
                return (
                    <Contact key={item.id} contactData={item} />
                )
            })}

            {filteredContacts.length <= 0 && (
                <div className={styles.empty}>
                    <FaSadTear size={50} />
                    <div>
                        {search ? (
                            <>
                                <strong>No se encontró ningún contacto...</strong>
                                <p>Busque otro o adicione uno nuevo</p>
                            </>
                        ) : (
                            <>
                                <strong>La lista de contactos esta vacía...</strong>
                                <p>Adicione seus contatos para começar a interagir</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}