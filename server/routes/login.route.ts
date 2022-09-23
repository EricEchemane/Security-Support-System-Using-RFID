import { RequestError } from "@utils/request";
import normalize from "@utils/response-normalizer";
import { Router, Request, Response } from "express";

const loginRoute = Router();

loginRoute.post("/", normalize(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) throw new RequestError(400, "Invalid username or password");
    if (username === "admin" && password === "admin") return true;
    else throw new RequestError(401, "Invalid username or password");
}));

export default loginRoute;