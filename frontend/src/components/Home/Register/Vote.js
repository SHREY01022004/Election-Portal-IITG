import styles from "./Vote.module.css"
const Vote = (props) => {
    return (
    <div className={`flex flex-col ${styles.main} p-4 mx-2`}>
        <div className={`${styles.success}`}>
            You have successfully registered
        </div>
        <div className={`${styles.cont} p-2 flex mt-2`}>
            <div className="flex flex-col">
                <div className={`${styles.name}`}>
                    {props.name}
                </div>
                <div className={`${styles.batch}`}>
                    {props.prog}
                </div>
            </div>
            <div className="flex flex-col ml-auto mr-0">
                <div className={`${styles.batch}`}>
                {props.roll_no}
                </div>
                <div className={`${styles.batch}`}>
                {props.hostel}
                </div>
            </div>
        </div>
        <div className={`${styles.msg} mt-2`}>
            Please visit CC to cast your vote. Show this screen on your smart phone.
        </div>
    </div>
    );
}
export default Vote;