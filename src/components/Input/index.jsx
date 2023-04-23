import styles from './input.module.scss';

export function Input(props) {
    return (
        <input type="text" className={styles.input} {...props}/>
    )
}

export function InputMessage(props) {
    return (
        <input type="text" className={styles.message} {...props}/>
    )
}