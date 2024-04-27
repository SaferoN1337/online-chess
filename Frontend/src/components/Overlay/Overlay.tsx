import { ReactNode } from "react";
import styles from "./Overlay.module.css";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../redux/hooks/hooks";
import classNames from "classnames";

interface IProps {
    children: ReactNode,
    showOverlay: boolean,
    setShowOverlay: ActionCreatorWithPayload<boolean>,
}

export default function Overlay({ children, showOverlay, setShowOverlay }: IProps) {
    const dispatch = useAppDispatch();

    return (
        <div
            className={classNames(
                styles.overlayWrapper,
                showOverlay ? styles.showOverlay : styles.hideOverlay
            )}
            onMouseDown={() => dispatch(setShowOverlay(false))}
        >
            <div className={styles.contentWrapper} onMouseDown={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}