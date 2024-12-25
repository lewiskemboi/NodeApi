import JsonWebToken from "jsonwebtoken";
import { unAuthorized } from "../helpers/response.helper.js";

export const verifyUserTokenMiddleware = (req, res, next) => {
    
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        JsonWebToken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
            
            if (err) {
                return unAuthorized(res, 'Resource Access Has Been denied');
            } else {
                req.user = decode
                next();
            };
        });
    } else {
        return unAuthorized(res, 'No access token provided!');
    };
};
