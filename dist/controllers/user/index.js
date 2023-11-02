"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const user_1 = require("../../services/user");
const utils_1 = require("../../utils");
const getUser = (req, res, next) => {
    try {
        return res.status(200).send({ user: req.user });
    }
    catch (error) {
        return next(error);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    try {
        const user = req.user;
        const dto = req.body;
        const userUpdated = await (0, user_1.updateUserById)(user.id, dto);
        return res.status(200).send({
            message: "User updated",
            user: (0, utils_1.omitPropertyFromObject)(userUpdated, "password"),
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const user = req.user;
        const userDeleted = await (0, user_1.deleteUserById)(user.id);
        return res.status(200).send({
            message: "User deleted",
            user: (0, utils_1.omitPropertyFromObject)(userDeleted, "password"),
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteUser = deleteUser;
exports.default = {
    getUser: exports.getUser,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
};
//# sourceMappingURL=index.js.map