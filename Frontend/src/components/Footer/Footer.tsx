import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.about}>
                    <h2>О сайте</h2>
                    <p>Этот сайт создан для любителей шахмат. Здесь вы можете играть, наблюдать за партиями и участвовать в турнирах.</p>
                </div>
                <div className={styles.contacts}>
                    <h2>Контакты</h2>
                    <p>Email: info@chessonline.com</p>
                    <p>Телефон: +123 456 7890</p>
                </div>
                <div className={styles.legal}>
                    <h2>Политика конфиденциальности</h2>
                    <p><a href="/privacy-policy">Политика конфиденциальности</a></p>
                    <p><a href="/terms-of-service">Условия использования</a></p>
                </div>
                <div className={styles.socialNetworks}>
                    <h2>Мы в социальных сетях</h2>
                    <div className={styles.linksWrapper}>
                        <a href="https://web.telegram.org/" target="_blank" >
                            <div className={styles.tgIcon} />
                        </a>
                        <a href="https://vk.com/" target="_blank" >
                            <div className={styles.vkIcon} />
                        </a>
                        <a href="https://ok.ru/" target="_blank" >
                            <div className={styles.okIcon} />
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.copy}>
                &copy; 2024 Chess Online. Все права защищены.
            </div>
        </footer>
    );
};