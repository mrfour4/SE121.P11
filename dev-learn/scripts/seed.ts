import { courseNames } from "@/constants";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: courseNames,
        });

        console.log("seed categories success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await db.$disconnect();
    }
}

main();
