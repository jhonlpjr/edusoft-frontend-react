import { Input, InputMessage } from '../Input'
import styles from './addcontact.module.scss'
import { MdPersonAddAlt1, MdAddCircle, MdRemoveCircle, MdMessage, MdCheckCircle } from 'react-icons/md'
import { useState } from 'react'
import { useContacts } from '../../hooks/useContacts'
import { createContact, getContacts } from '../../services/contact.service'

export function AddContact() {
    const [isShowingAddContact, setIsShowingAddContact] = useState(false)
    const [isShowingSendWhatsApp, setIsShowingSendWhatsApp] = useState(false)
    //const [avatar , setAvatar] = useState("")
    const [names, setNames] = useState("")
    const [lastNames, setLastNames] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [message, setMessage] = useState("")

    const { addContact } = useContacts();

    const { deleteContact, isSelected, onSelectContact, selectedContacts, selectAll, contacts } = useContacts();

    function toggleFormAddContact() {
        setIsShowingAddContact(!isShowingAddContact);
    }

    function toggleFormWhatsApp() {
        setIsShowingSendWhatsApp(!isShowingSendWhatsApp);
    }

    function onSubmitContact(event) {
        event.preventDefault()
        addContact({
            //id: crypto.randomUUID(),
            names: names,
            lastNames: lastNames,
            phoneNumber: phoneNumber,
            // avatar: !avatar ? null : avatar
        })
        setNames("")
        setLastNames("")
        setPhoneNumber("")
    }

    function onSubmitWhatsApp(event) {
        event.preventDefault()
        if (selectAll) {
            console.log('Nuestrame los contacts:', contacts)
            contacts.forEach((contact) => {
                window.open(
                    `https://api.whatsapp.com/send?phone=${contact.phoneNumber}&text=${encodeURIComponent(
                       message
                    )}`,
                    '_blank'
                )
            })
        } else {
            console.log('Nuestrame los selectedContacts:', selectedContacts)
            selectedContacts.forEach((contact) => {
                window.open(
                    `https://api.whatsapp.com/send?phone=${contact.phoneNumber}&text=${encodeURIComponent(
                        message
                    )}`,
                    '_blank'
                )
            })
        }


        setMessage("")

    }

    // function onChangeAvatar(event) {
    //     setAvatar(event.target.value.trim(""))
    // }

    function onChangeNames(event) {
        setNames(event.target.value)
    }

    function onChangeLastNames(event) {
        setLastNames(event.target.value)
    }

    function onChangePhone(event) {
        setPhoneNumber(event.target.value)
    }

    function onChangeMessage(event) {
        setMessage(event.target.value)
    }

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <button onClick={toggleFormAddContact} className={isShowingAddContact ? styles.circle : ""} style={isShowingAddContact ? { background: '#fe6161' } : {}}>
                    {isShowingAddContact ? (
                        <MdRemoveCircle size={20} />
                    ) : (
                        <>
                            <MdPersonAddAlt1 size={20} />
                            Adicionar Contacto
                        </>
                    )}
                </button>

                <button onClick={toggleFormWhatsApp} className={isShowingSendWhatsApp ? styles.circle : ""} style={isShowingSendWhatsApp ? { background: '#fe6161' } : {}}>
                    {isShowingSendWhatsApp ? (
                        <MdRemoveCircle size={20} />
                    ) : (
                        <>
                            <MdMessage size={20} />
                            Enviar WhatsApp
                        </>
                    )}
                </button>

                <p className={styles.credits}>
                    Created by <a href="https://github.com/jhonlpjr" target="_blank">JRR</a>
                </p>
            </header>
            {isShowingAddContact && (
                <form onSubmit={onSubmitContact} className={styles.form}>

                    <Input placeholder='Nombres *' required onChange={onChangeNames} value={names} />
                    <Input placeholder='Apellidos *' required onChange={onChangeLastNames} value={lastNames} />
                    <Input placeholder='Teléfono *' required onChange={onChangePhone} value={phoneNumber} />
                    <button className={styles.circle}><MdAddCircle size={20} /></button>
                </form>
            )}

            {isShowingSendWhatsApp && (
                <form onSubmit={onSubmitWhatsApp} className={styles.form}>

                    <InputMessage placeholder='Mensaje: *' required onChange={onChangeMessage} value={message} />
                    <button className=''><><MdCheckCircle size={20} />Enviar WhatsApp</></button>


                </form>
            )}
        </section>
    )
}