import { GameHistoryMove, MoveData } from "../../../../types";

export interface MoveHandlerParameters { moveData: MoveData, gameHistoryMove: GameHistoryMove }
export type SocketIoCallback = ({ result }: { result: boolean }) => void;

export type MoveHandler = ({ moveData, gameHistoryMove } : MoveHandlerParameters) => Promise<boolean>