import styles from "./Alert.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { IAlertData } from "../../../../types";


interface IProps {
    alertData: IAlertData | null
}

export default function Alert({ alertData }: IProps) {
    const [showAlert, setShowAlert] = useState<boolean>(true);
    useEffect(() => {
        if (!alertData) return;

        setShowAlert(true);
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [alertData]);

    let type = styles.success;
    if (!alertData) {
        return null;
    }
    
    if (alertData.type === "warning") {
        type = styles.warning;
    } else if (alertData.type === "danger") {
        type = styles.danger;
    }

    return (
        <div className={classNames(styles.alertWrapper, showAlert ? styles.shown : styles.hidden)}>
            <div className={classNames(styles.alertContent, type)} onClick={() => setShowAlert(false)}>
                <p>{alertData.text}</p>
            </div>
        </div>
    )
}