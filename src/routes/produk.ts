import { Elysia } from "elysia";
import {db} from "../db/index";
import { produkTable } from "../db/schema";

export const produkRoute = new Elysia({
    prefix: "/produk"
});

produkRoute.get("/", async () => {
    const data = await db.select().from(produkTable);
    return data;
})

produkRoute.get("/:id", async ({ params }) => {
    const Id = params.id;
    const data = await db.select()
        .from(produkTable)
        .where(produkTable.id.eq(parseInt(Id)));
    return data;
    
