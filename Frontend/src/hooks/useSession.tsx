import { Session } from "../../../types";
import { useAppSelector } from "../redux/hooks/hooks";
import { jwtDecode } from "jwt-decode";

export default function useSession(): Session | undefined {
    const accessToken = useAppSelector(state=> state.users.accessToken);
    if(!accessToken) {
        return undefined;
    } else {
        return jwtDecode(accessToken);
    }
}