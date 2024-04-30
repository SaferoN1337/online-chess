import styles from "./AuthPopUp.module.css";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { showOrHideAuthPopUp, switchFormToReg } from "../../redux/slices/componentSlice";

import Overlay from "../Overlay/Overlay";
import AuthForm from "./forms/AuthForm";
import RegForm from "./forms/RegForm";
import Alert from "../Alert/Alert";

export default function AuthPopUp() {
    const dispatch = useAppDispatch();
    const showRegForm = useAppSelector(state => state.components.showRegForm);
    const showOverlay = useAppSelector(state => state.components.showAuthPopUp);
    const alertData = useAppSelector(state => state.components.authAlertData);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <Alert alertData={alertData} />
            <Overlay
                setShowOverlay={showOrHideAuthPopUp}
                showOverlay={showOverlay}
            >
                <div className={styles.authPopUpContent}>
                    {showRegForm
                        ?
                        <RegForm loading={loading} setLoading={setLoading} />
                        :
                        <AuthForm loading={loading} setLoading={setLoading} />
                    }
                    {showRegForm
                        ?
                        <button
                            onClick={() => dispatch(switchFormToReg(false))}
                            className={styles.switchButton}
                        >Уже есть аккаунт</button>
                        :
                        <button
                            onClick={() => dispatch(switchFormToReg(true))}
                            className={styles.switchButton}
                        >Зарегистрироваться</button>
                    }
                </div>
            </Overlay>
        </>
    )
}