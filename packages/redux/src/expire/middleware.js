import { authExpireHandler } from '../slices/users/auth';
import { signupExpireHandler } from '../slices/users/signup';

const expireHandlers = [authExpireHandler, signupExpireHandler];

export const expireMiddleware = ({ dispatch }) => {
    return (next) => {
        return (action) => {
            next(action);
            expireHandlers.forEach((expireHandler) => expireHandler(action, dispatch));
        };
    };
};
