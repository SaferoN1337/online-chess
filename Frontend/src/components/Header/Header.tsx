import styles from './Header.module.css';
import useSession from '../../hooks/useSession';
import AuthPopUp from './AuthPopUp/AuthPopUp';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { showOrHideAuthPopUp } from '../../redux/slices/componentSlice';
import { Link, NavLink } from 'react-router-dom';
import MobileHeader from './MobileHeader/MobileHeader';

export default function Header() {
    const session = useSession();
    const dispatch = useAppDispatch();

    const handleClickLogin = () => {
        dispatch(showOrHideAuthPopUp(true));
    };

    const handleClickLogout = () => {
        // Логика для выхода
    };

    return (
        <header className={styles.header}>
            <AuthPopUp />
            <div className={styles.contentWrapper}>
                <MobileHeader session={session}/>
                <div className={styles.logo}>
                    <Link to="/">
                        <h1>Шахматы Онлайн</h1>
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/tournaments">Турниры</NavLink>
                    <NavLink to="/contacts">Контакты</NavLink>
                </nav>
                <div className={styles.authButtons}>
                    {session ? (
                        <button onClick={handleClickLogout}>Профиль</button>
                    ) : (
                        <button onClick={handleClickLogin}>Войти</button>
                    )}
                </div>
            </div>
        </header>
    );
};