import styles from "./MobileHeader.module.css";
import classNames from "classnames";

import { useState } from "react";
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from "../../../redux/hooks/hooks";
import { showOrHideAuthPopUp } from "../../../redux/slices/componentSlice";
import { Session } from "../../../../../types";

interface IProps {
    session: Session | undefined
}
export default function MobileHeader({ session }: IProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useAppDispatch();

    function onLogIn() {
        dispatch(showOrHideAuthPopUp(true));
        setIsMenuOpen(false);
    }
    
    return (
        <>
            <div className={classNames(styles.burgerMenu, styles.closeButton, isMenuOpen ? styles.open : '')} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <nav className={classNames(styles.navBlock, isMenuOpen ? styles.navOpen : '')}>
                {session ?
                    <div className={styles.profile}>{session.login}</div>
                    :
                    <button className={styles.logInButton} onClick={onLogIn}>Войти</button>}

                <div className={styles.linkWrapper}>
                    <NavLink to="/">Главная</NavLink>
                </div>
                <div className={styles.linkWrapper}>
                    <NavLink to="/tournaments">Турниры</NavLink>
                </div>
                <div className={styles.linkWrapper}>
                    <NavLink to="/contacts">Контакты</NavLink>
                </div>

                <div className={styles.contacts}>
                    <p><span>Email:</span> info@chessonline.com</p>
                    <p><span>Телефон:</span> +123 456 78-90</p>
                </div>
            </nav>
        </>
    )
}