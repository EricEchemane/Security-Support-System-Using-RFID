import { Response, Request } from "express";
import { RequestError, SuccessfulRequest } from "./request";

export default function normalize(
    handler: Function,
    options: { protect: boolean; } = { protect: false }
) {
    return async function (
        req: Request,
        res: Response) {

        if (options.protect === true) {
            return res.status(401).json(
                new RequestError(401, 'You are not authorized to access this resource')
            );
        }

        try {
            const data = await handler(req);
            return res.status(200).json(new SuccessfulRequest(data));

        } catch (error: any) {
            console.error('\n\n==> Error from:', req.url);
            console.error(error.message);

            if (error.message.includes('E11000')) {
                error.message = 'This email or mobile number is already in used';
            }
            if (error.message.includes(':')) {
                const idx1 = (error.message as string).indexOf(':');
                const idx2 = (error.message as string).indexOf(':', idx1 + 1);
                const idx3 = (error.message as string).indexOf(',');
                if (idx3 !== -1) error.message = (error.message as string).substring(idx2 + 2, idx3);
                else error.message = (error.message as string).substring(idx2 + 2);
            }
            if (error instanceof RequestError) {
                return res.status(error.code).json(error);
            }

            return res.status(500).json(new RequestError(500, error.message));
        }
    };
}