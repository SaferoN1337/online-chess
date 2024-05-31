import dotenv from "dotenv";
dotenv.config();

interface IConfig {
    host: string,
    user: string,
    database: string
}

// export const config = process.env.MYSQL_CONFIG as unknown as IConfig;
export const config: IConfig = {
    host: '127.0.0.1',
    user: 'root',
    database: 'chess'
}

