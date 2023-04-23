import styles from './contact.module.scss'
import { MdDeleteForever } from 'react-icons/md';
import placeholderImg from '../../assets/placeholder_user.png';
import { useContacts } from '../../hooks/useContacts';

export function Contact(props) {
    //console.log('daton:', props)
    const { deleteContact, isSelected, onSelectContact } = useContacts();
    //const { deleteContact, isSelected, onSelectContact } = props;

    return(
        <div className={styles.container}>
            <div>
                {/*<img src={props.contactData.avatar ?? placeholderImg} alt={props.contactData.name} />*/}
                <input type="checkbox" checked={isSelected} onChange={() => onSelectContact(props.contactData)} />
                <div className={styles.details}>
                    <strong>{props.contactData.names} {props.contactData.lastNames}</strong>
                    <span>{props.contactData.phoneNumber}</span>
                </div>
            </div>
            <button onClick={() => deleteContact(props.contactData.id)} className={styles.delete}>
                <MdDeleteForever size={20} />
            </button>
        </div>
    )
}