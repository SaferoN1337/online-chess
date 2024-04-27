import { Request, Response, Router } from "express";
import path from "path";
import Auth from "../services/AuthorizationAndSession/Auth";
import Token from "../services/AuthorizationAndSession/Token/Token";
export const router = Router();
const _dirname = path.resolve();

router.post("/registration", Auth.registration);

router.post("/authentication", Auth.authentication);

// router.post("/refresh", Auth.authentication);
router.post("/check-access-token", (req, res)=> { 
    // console.log(req.fingerprint?.components)
    console.log(Token.checkAccessToken(req.body.accessToken));
    res.json({ result: "success"});
});

router.post("/refresh-session", Auth.checkAndRefreshToken)
router.get("*", (req, res) => {
    res.sendFile(_dirname + "/Frontend/dist/index.html");
});


