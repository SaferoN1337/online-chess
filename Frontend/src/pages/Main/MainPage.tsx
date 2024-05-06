import ListOfGames from "./ListOfGames/ListOfGames";
import styles from "./MainPage.module.css";

export default function MainPage() {

    return (
        <div className={styles.content}>
            <ListOfGames />
        </div>
    )
}