import styles from "./Alert.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { IAlertData } from "../../../../types";


interface IProps {
    alertData: IAlertData | null
}

export default function Alert({ alertData }: IProps) {
    if(!alertData) return null;
    const [showAlert, setShowAlert] = useState<boolean>(true);

    let type = styles.success;
    if (alertData.type === "warning") {
        type = styles.warning;
    } else if (alertData.type === "danger") {
        type = styles.danger;
    }

    useEffect(() => {
        if (alertData === null) return;
        setShowAlert(true);
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [alertData]);

    return (
        <div className={classNames(styles.alertWrapper, showAlert ? styles.shown : styles.hidden)}>
            <div className={classNames(styles.alertContent, type)} onClick={()=> setShowAlert(false)}>
                <p>{alertData.text}</p>
            </div>
        </div>
    )
}