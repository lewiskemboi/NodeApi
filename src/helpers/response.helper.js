export const successMessage = (res, message) => {
    return res.status(200).json({ Message: message });
};

export const dataFound = (res, data, message) => {
    return res.status(200).json({ Message: message, data });
};

export const sendJsonSuccess = (res, object) => {
    return res.status(200).json({ Response: object });
};

export const sendDeleteSuccess = (res, message) => {
    return res.status(200).json({ Message: message });
};

export const sendCreated = (res, message) => {
    return res.status(201).json({ Message: message });
};

export const validationError = (res, message) => {
    return res.status(400).json({ Message: message });
};

export const sendBadRequest = (res, message) => {
    return res.status(400).json({ Message: message });
};

export const unAuthorized = (res, message) => {
    return res.status(401).json({ Message: message });
};

export const forbidden = (res, message) => {
    return res.status(403).json({ Message: message });
};

export const sendNotFound = (res, message) => {
    return res.status(404).json({ Message: message });
};

export const methodNotAllowed = (res, message) => {
    return res.status(405).json({ Message: message });
};

export const timeOut = (res, message) => {
    return res.status(408).json({ Message: message });
};

export const conflict = (res, message) => {
    return res.status(409).json({ Message: message });
};

export const unprocessableEntity = (res, message) => {
    return res.status(422).json({ Message: message });
};

export const sendServerError = (res, message) => {
    return res.status(500).json({ Message: message });
};

export const serverJsonError = (res, object) => {
    return res.status(500).json({Response: object});
};

export const notImplemented = (res, message) => {
    return res.status(501).json({ Message: message });
};

export const badGateway = (res, message) => {
    return res.status(502).json({ Message: message });
};

export const serviceUnavailable = (res, message) => {
    return res.status(503).json({ Message: message });
};

export const gatewayTimeout = (res, message) => {
    return res.status(504).json({ Message: message });
};
