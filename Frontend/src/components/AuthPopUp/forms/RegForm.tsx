import styles from "../AuthPopUp.module.css";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import { useAppDispatch } from "../../../redux/hooks/hooks";
import { setAccessToken } from "../../../redux/slices/usersSlice";
import { setAuthAlertData } from "../../../redux/slices/componentSlice";

import { POSTApiRequest } from "../../../apiRequest";
import { IAccessTokenData, Session } from "../../../../../types";

interface IFormInputs {
    "login": string,
    "email": string,
    "password": string,
    "repeatPassword": string
}

interface InputsValueForAPI {
    "login": string,
    "email": string,
    "password": string,
}

interface IProps {
    loading: boolean,
    setLoading: React.Dispatch<boolean>,
}

export default function RegForm({ loading, setLoading }: IProps) {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = async (inputsValue) => {
        if (loading) return;
        setLoading(true);
        const response = await POSTApiRequest<InputsValueForAPI, IAccessTokenData>("/registration", {
            "login": inputsValue.login,
            "email": inputsValue.email,
            "password": inputsValue.password
        });
        setLoading(false);

        if (response.result === "success") {
            console.log(response.data);
            const session = jwtDecode(response.data.accessToken) as Session;
            dispatch(setAuthAlertData({ type: "success", text: `Пользователь успешно зарегистрирован. Добро пожаловать ${session.login}!` }));
            dispatch(setAccessToken(response.data));
        } else {
            console.log(response);
            dispatch(setAuthAlertData({ type: "warning", text: response.message }));
        }
    }

    return (
        <>
            <h2 className={styles.title}>Регистрация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <input
                        {...register("login", {
                            required: { value: true, message: "обязательное поле" },
                            pattern: { value: /^[a-zа-яё0-9_-]*$/i, message: "логин может состоять только из букв, цифр и символов _-" },
                            minLength: { value: 3, message: "логин не может быть короче 3 символов" },
                            maxLength: { value: 32, message: "максимальная длина логина 32 символа" }
                        })}
                        type="login"
                        placeholder="Логин"
                    />
                    <img className={styles.icon} src="/icons/user-icon.png" alt="user" />
                    {!errors.login ? null :
                        <div className={styles.error}>
                            {errors.login.message}
                        </div>
                    }
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        {...register("email", {
                            required: { value: true, message: "обязательное поле" },
                            pattern: { value: /^[\w._-]+@[a-z]{2,}\.[a-z]{2,}$/, message: "Неверный формат email" },
                            maxLength: { value: 128, message: "максимальная длина email 128 символа" }
                        })}
                        type="email"
                        placeholder="Email"
                    />
                    <img className={classNames(styles.icon, styles.emailIcon)} src="/icons/email-icon.png" alt="user" />
                    {!errors.email ? null :
                        <div className={styles.error}>
                            {errors.email.message}
                        </div>
                    }
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        {...register("password", {
                            required: { value: true, message: "обязательное поле" },
                            // minLength: { value: 8, message: "Минимальная длина 8 символов" },
                            maxLength: { value: 255, message: "максимальная длина пароля 255 символа" }
                        })}
                        type="password"
                        placeholder="Пароль"
                    />
                    <img className={classNames(styles.icon, styles.passwordIcon)} src="/icons/password-icon.png" alt="password icon" />
                    {!errors.password ? null :
                        <div className={styles.error}>
                            {errors.password.message}
                        </div>
                    }
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        {...register("repeatPassword", {
                            required: { value: true, message: "обязательное поле" },
                            pattern: { value: new RegExp(`^${watch("password")}$`), message: "Пароли не совпадают" },
                        })}
                        type="password"
                        placeholder="Повторить пароль"
                    />
                    <img className={classNames(styles.icon, styles.passwordIcon)} src="/icons/password-icon.png" alt="password icon" />
                    {!errors.repeatPassword ? null :
                        <div className={styles.error}>
                            {errors.repeatPassword.message}
                        </div>
                    }
                </div>
                <button className={styles.submitButton}>Зарегистрироваться</button>
            </form>
        </>
    )
}