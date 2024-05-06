import { Request, Response } from "express";
import { DBIUser } from "../databaseRequests/User/UserTypes";

interface IRegistrationRequest extends Request {
    body: {
        login: string,
        email: string,
        password: string
    }
}

interface IAuthenticationRequest extends Request {
    body: {
        login: string,
        password: string
    }
}

interface ICheckAndRefreshToken extends Request {
    body: {
        accessToken: string,
    }
}

export type RigistrationFN = (req: IRegistrationRequest, res: Response)=> void;
export type AuthenticationFN = (req: IAuthenticationRequest, res: Response)=> void;
export type CreateNewSession = (req: Request, res: Response, user: DBIUser) => void;
export type CheckAndRefreshToken = (req: ICheckAndRefreshToken, res: Response) => void;