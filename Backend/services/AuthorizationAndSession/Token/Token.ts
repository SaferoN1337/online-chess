import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

interface ITokenDecodedData {
    id: number,
    login: string,
    email: string,
    iat: number,
    exp: number
}

class Token {
    static generateAccessToken(payload: JwtPayload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: "30m"
        });
    }

    static generateRefreshToken(payload: JwtPayload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
            expiresIn: "15d"
        });
    }

    static checkAccessToken(accessToken: string): { result: boolean, data?: ITokenDecodedData } {
        if (!accessToken) return { result: false };
        try {
            const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as ITokenDecodedData;
            return { result: true, data };
        } catch (error) {
            console.log(error)
            return { result: false };
        }
    }

    static checkRefreshToken(refreshToken: string): { result: boolean, data?: ITokenDecodedData } {
        if (!refreshToken) return { result: false };
        try {
            const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as ITokenDecodedData;
            return { result: true, data};
        } catch (error) {
            console.log(error)
            return { result: false };
        }
    }
}

export default Token;