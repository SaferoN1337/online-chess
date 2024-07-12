import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import styles from "./PrivateGameCheckbox.module.css";
import classNames from "classnames";
import { useEffect } from "react";

type FormData = {
  private: boolean,
  color: "white" | "black" | "random",
  opponentName: string,
  hours: number;
  minutes: number,
  seconds: number
};

interface IProps {
  register: UseFormRegister<FormData>
  watch: UseFormWatch<FormData>,
  errors: FieldErrors<FormData>
}

export default function PrivateGameCheckbox({ register, watch, errors }: IProps) {
  const privateGame: boolean = watch("private");
  const opponentName: string | undefined = watch("opponentName");

  useEffect(() => {
    const timer = setTimeout(request, 500);
    if (opponentName && opponentName.trim() !== "") {
      timer;
    } else {
      clearTimeout(timer);
    }

    function request() {
      console.log(`request list of users with name ${opponentName}`);
    };

    return () => {
      clearTimeout(timer);
    }
  }, [opponentName]);

  return (
    <>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id="private"
          {...register("private")}
        />
        <label className={styles.checkboxLabel} htmlFor="private">
          <div className={classNames([styles.customCheckbox, privateGame ? styles.checked : styles.notChecked])} />
          <p>Приватная игра</p>
        </label>
      </div>
      {privateGame ?
        <>
          <label htmlFor="opponentName">Никнейм соперника</label>
          <input
            type="text"
            {...register("opponentName")}
            placeholder="Имя пользователя"
          />
          {errors.private ? <span className={styles.error}>{errors.private.message}</span> : null}
        </>
        : null}
    </>
  )
}