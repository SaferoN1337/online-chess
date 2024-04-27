import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./AuthPopUp.module.css";
import { POSTApiRequest } from "../../apiRequest";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setAccessToken } from "../../redux/slices/usersSlice";
import { IAccessTokenData } from "../../../../types";

interface IFormInputs {
    "login": string,
    "password": string
}

interface IProps {
    loading: boolean,
    setLoading: React.Dispatch<boolean>
}

export default function AuthForm({ loading, setLoading } : IProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
    const accessToken = useAppSelector(state=> state.users.accessToken);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IFormInputs> = async (inputsValue) => {
        if(loading) return;

        setLoading(true);
        const response = await POSTApiRequest<IFormInputs, IAccessTokenData>("/authentication", inputsValue);
        setLoading(false);
        if(response.result === "success") {
            console.log(response.data);
            dispatch(setAccessToken(response.data));       
        } else {
            console.log(response.message);
        }
    }

    async function checkAccessToken() {
        const response = await POSTApiRequest("/check-access-token", { accessToken });
        console.log(response);
    }

    async function refreshSession() {
        const response = await POSTApiRequest<{ accessToken: null | string }, IAccessTokenData>("/refresh-session", { accessToken });
        if(response.result === "success") {
            console.log(response.data);
            dispatch(setAccessToken(response.data));       
        } else {
            console.log(response.message);
        }
        console.log(response);
    }

    return (
        <>
            <h2 className={styles.title}>Вход</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <input
                        {...register("login", {
                            required: { value: true, message: "обязательное поле" },
                            pattern: { value: /^[a-zа-яё0-9_-]*$/i, message: "логин может состоять только из букв, цифр и символов _-" },
                            minLength: { value: 3, message: "логин не может быть короче 3 символов" }
                        })}
                        placeholder="Логин"
                        type="login"
                    />
                    {!errors.login ? null :
                        <div className={styles.error}>
                            {errors.login.message}
                        </div>
                    }
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        {...register("password", {
                            required: { value: true, message: "обязательное поле" }
                        })}
                        placeholder="Пароль"
                        type="password"
                    />
                    {!errors.password ? null :
                        <div className={styles.error}>
                            {errors.password.message}
                        </div>
                    }
                </div>
                <button className={styles.submitButton}>Войти</button>
            </form>
            <button className={styles.submitButton} onClick={checkAccessToken}>Check access token</button>
            <button className={styles.submitButton} onClick={refreshSession}>Refresh session</button>
        </>
    )
}