import { useState } from 'react';
import styles from './contact.module.scss'
import { MdDeleteForever } from 'react-icons/md';
import placeholderImg from '../../assets/placeholder_user.png';
import { useContacts } from '../../hooks/useContacts';

export function Contact(props) {
    //console.log('daton:', props)
    const [selected, setSelected] = useState(false);
    const { deleteContact, selectAll, onSelectContact, onDeSelectContact } = useContacts();
    //const { deleteContact, isSelected, onSelectContact } = props;
    //console.log('mostrin:', selected)

    function handleSelect() {
        if(!selected) {
            onSelectContact(props.contactData);
            setSelected(true);
        } else {
            onDeSelectContact(props.contactData);
            setSelected(false);
        }
    }

    return(
        <div className={styles.container}>
            <div>
                {/*<img src={props.contactData.avatar ?? placeholderImg} alt={props.contactData.name} />*/}
                <input type="checkbox" checked={selectAll || selected ? true : false} onChange={() => handleSelect()} />
                <div className={styles.details}>
                    <strong>{props.contactData.names} {props.contactData.lastNames} / {props.contactData.phoneNumber}</strong>
                    <span>Colegio: {props.contactData.names} / Código: {props.contactData.code}</span>
                    <span>Dirección: {props.contactData.address} / Red: {props.contactData.network}</span>
                </div>
            </div>
            <button onClick={() => deleteContact(props.contactData.id)} className={styles.delete}>
                <MdDeleteForever size={20} />
            </button>
        </div>
    )
}