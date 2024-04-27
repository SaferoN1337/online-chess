import bcrypt from "bcryptjs";

import Users from "../databaseRequests/Users";
import Token from "./Token/Token";
import RefreshSession from "../databaseRequests/RefreshSession";

import { FingerprintResult } from "express-fingerprint";
import { AuthenticationFN, CheckAndRefreshToken, CreateNewSession, RigistrationFN } from "./AuthTypes";
import { Request, Response } from "express";

class Auth {
    static registration: RigistrationFN = async (req, res) => {
        if (!req.body) return res.status(404);
        const { login, email, password } = req.body;
        const user = await Users.getUserByLoginOrId(login);
        const hashedPassword = bcrypt.hashSync(password, 10);

        if (user) {
            res.json(JSON.stringify({ result: "error", messsage: "Пользователь с таким логином уже существует" }));
        } else {
            const user = await Users.createNewUser(login, email, hashedPassword);

            if (user) {
                this.createNewSession(req, res, user);
            }
        }
    }

    static authentication: AuthenticationFN = async (req, res) => {
        const { login, password } = req.body;
        const user = await Users.getUserByLoginOrId(login);
        if (!user) {
            return res.json({ result: "error", messsage: "Неверный логин или пароль" });
        }

        if (bcrypt.compareSync(password, user.password)) {
            this.createNewSession(req, res, user);
        } else {
            res.json({ result: "error", messsage: "Неверный логин или пароль" });
        }
    }

    static createNewSession: CreateNewSession = async (req, res, user)=> {
        const payload = { id: user.id, login: user.login, email: user.email };
        const accessToken = Token.generateAccessToken(payload);
        const refreshToken = Token.generateRefreshToken(payload);
        const fingerprint = req.fingerprint as FingerprintResult;
        
        await RefreshSession.createRefreshSession(user.id, refreshToken, accessToken, fingerprint);

        res.cookie("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 15 * 24 * 3600 * 1000 });
        res.status(200).json({
            result: "success",
            data: {
                accessToken,
                accessTokenExpiration: 1800 * 1000
            }
        });
    }

    static logOut = async (req: Request, res: Response)=> {
        const refreshToken = req.cookies.refreshToken;
        await RefreshSession.deleteRefreshSession(refreshToken);
        res.clearCookie("refreshToken").json({ result: "success" });
    }

    static checkAndRefreshToken: CheckAndRefreshToken = async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        const checkRefreshToken = Token.checkRefreshToken(refreshToken);
        const fingerprint = req.fingerprint;
        if(!refreshToken || !fingerprint) {
            return res.status(400).json({ result: "error", message: "произошла ошибка. Отсутствует refreshToken" });
        }

        if(!checkRefreshToken.result) {
            return res.status(401).json({ result: "error", message: "токен неверен / истекла сессия" });
        }
        const sessions = await RefreshSession.getRefreshSession(refreshToken);
        await RefreshSession.deleteRefreshSession(refreshToken);

        if(!sessions[0] || sessions.length > 1 || sessions[0].fingerprint !== fingerprint.hash) {
            res.clearCookie("refreshToken").status(403).json({ result: "error" });
        } else {
            const user = await Users.getUserByLoginOrId(sessions[0].user_id);
            if(user) {
                this.createNewSession(req, res, user);
            } else {
                res.clearCookie("refreshToken").status(401).json({ result: "error" });
            }
        }
    }
}

export default Auth;