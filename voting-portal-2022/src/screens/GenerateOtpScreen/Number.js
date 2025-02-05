import styles from "./Number.module.css"

const Number = (props) => {
    return(
        <div className={`${styles.cont} p-2`}>
            <div className={`${styles.text} mx-1.5`}>
                {props.number}
            </div>
        </div>
    )
}

export default Number;