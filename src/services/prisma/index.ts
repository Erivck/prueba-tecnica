import { PrismaClient } from "@prisma/client";
import { DB_URL } from "../../config";


class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: DB_URL
        }
      }
    })
  }

  async cleanDB() {
    await this.user.deleteMany();
  }
}
const prisma = new PrismaService();

export default prisma;