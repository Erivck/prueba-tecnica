"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserByUsername = exports.updateUserById = exports.getUserByUsername = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const argon = __importStar(require("argon2"));
const createUser = async (payload) => {
    const hash = await argon.hash(payload.password);
    return prisma_1.default.user.create({
        data: {
            ...payload,
            password: hash,
        },
    });
};
exports.createUser = createUser;
const getUsers = async (where) => {
    return prisma_1.default.user.findMany({ where });
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    return prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
};
exports.getUserById = getUserById;
const getUserByUsername = async (username) => {
    return prisma_1.default.user.findUnique({
        where: {
            username,
        },
    });
};
exports.getUserByUsername = getUserByUsername;
const updateUserById = async (id, payload) => {
    const data = payload;
    if (payload.password) {
        data.password = await argon.hash(payload.password);
    }
    return prisma_1.default.user.update({
        data,
        where: {
            id,
        },
    });
};
exports.updateUserById = updateUserById;
const updateUserByUsername = async (username, payload) => {
    const data = payload;
    if (payload.password) {
        data.password = await argon.hash(payload.password);
    }
    return prisma_1.default.user.update({
        data,
        where: {
            username,
        },
    });
};
exports.updateUserByUsername = updateUserByUsername;
const deleteUserById = async (id) => {
    return prisma_1.default.user.delete({
        where: {
            id,
        },
    });
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=index.js.map