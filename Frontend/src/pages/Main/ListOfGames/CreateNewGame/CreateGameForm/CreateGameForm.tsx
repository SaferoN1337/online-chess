import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './CreateGameForm.module.css';
import { useEffect } from 'react';
import PrivateGameCheckbox from './PrivateGameCheckbox/PrivateGameCheckbox';

type FormData = {
  private: boolean,
  color: "white" | "black" | "random",
  opponentName: string,
  hours: number;
  minutes: number,
  seconds: number
};

export default function CreateGameForm() {
  const { register, handleSubmit, setValue, watch, setError, clearErrors, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {

    if(data.private && data.opponentName.trim() === "") {
      setError("private", { message: "Укажите никнейм соперника" });
    } else {
      clearErrors("private");
      console.log(data);
    }
  };

  useEffect(() => {
    setValue("hours", 0);
    setValue("minutes", 5);
    setValue("seconds", 0);
  }, []);

  return (
    <div className={styles.createGameForm}>
      <h2 className={styles.title}>Создать партию</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.inputWrapper} >
          <PrivateGameCheckbox register={register} watch={watch} errors={errors} />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="color">Цвет игрока</label>
          <select id="color" {...register('color')}>
            <option value="white">Белый</option>
            <option value="black">Чёрный</option>
            <option value="random">Случайный</option>
          </select>
        </div>

        <div className={styles.timeLabeles}>
          <span>часы</span>
          <span>минуты</span>
          <span>секунды</span>
        </div>

        <div className={styles.timeInputGroup}>
          <input
            type="number"
            {...register('hours', { required: true, min: 0 })}
            className={styles.timeInput}
            min={0}
          />
          <span className={styles.timeSeparator}>:</span>
          <input
            type="number"
            {...register('minutes', { required: true, min: 0, max: 59 })}
            className={styles.timeInput}
            max={59}
            min={0}
          />
          <span className={styles.timeSeparator}>:</span>
          <input
            type="number"
            {...register('seconds', { required: true })}
            className={styles.timeInput}
            max={59}
            min={0}
          />
        </div>

        <button className={styles.submitButton} type="submit">Создать партию</button>
      </form>
    </div>
  );
}