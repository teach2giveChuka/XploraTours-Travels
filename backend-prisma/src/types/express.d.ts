import { tokenInfo } from "../interfaces/user";

declare global {
    namespace Express {
        interface Request {
            info?: tokenInfo;
        }
    }
}
