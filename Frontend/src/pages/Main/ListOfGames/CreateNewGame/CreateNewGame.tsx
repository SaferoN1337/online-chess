import Overlay from "../../../../components/Overlay/Overlay";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { setShowCreateNewGame } from "../../../../redux/slices/componentSlice";
import CreateGameForm from "./CreateGameForm/CreateGameForm";
import styles from "./CreateNewGame.module.css";

export default function CreateNewGame() {
  const showOverlay = useAppSelector(state => state.components.showCreateNewGame);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.wrapper}>
        <button
          className={styles.button}
          onClick={() => dispatch(setShowCreateNewGame(true))}
        >Играть</button>
      </div>
      <Overlay showOverlay={showOverlay} setShowOverlay={setShowCreateNewGame} >
        <CreateGameForm />
      </Overlay>
    </>
  )
}