import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import Overlay from "../Overlay/Overlay";
import AuthForm from "./AuthForm";
import styles from "./AuthPopUp.module.css";
import RegForm from "./RegForm";
import { showOrHideAuthPopUp, switchFormToReg } from "../../redux/slices/componentSlice";
import { useState } from "react";

export default function AuthPopUp() {
    const showRegForm = useAppSelector(state => state.components.showRegForm);
    const showOverlay = useAppSelector(state => state.components.showAuthPopUp);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Overlay
            setShowOverlay={showOrHideAuthPopUp}
            showOverlay={showOverlay}
        >
            <div className={styles.authPopUpContent}>
                {showRegForm ? <RegForm loading={loading} setLoading={setLoading} /> : <AuthForm loading={loading} setLoading={setLoading} />}
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
    )
}