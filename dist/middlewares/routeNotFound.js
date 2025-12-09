import HTTPSTATUSCODE from "../utils/statusCodes.js";
export const routeNotFound = (req, res) => res
    .status(HTTPSTATUSCODE.NOT_FOUND)
    .json({ message: `Route does'nt exist check the ${req.url} properly` });
//# sourceMappingURL=routeNotFound.js.map