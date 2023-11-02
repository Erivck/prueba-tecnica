"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: config_1.DB_URL
                }
            }
        });
    }
    cleanDB() {
        this.user.deleteMany();
    }
}
const prisma = new PrismaService();
exports.default = prisma;
//# sourceMappingURL=index.js.map