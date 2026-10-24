import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { produkTable } from './schema';
import { eq } from 'drizzle-orm'; // Wajib ditambahkan untuk kondisi 'where'

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });

async function main() {
  // 1. UPDATE (Ubah harga & stok barang id 9)
  await db.update(produkTable)
    .set({ harga: 12000000, stok: 5 })
    .where(eq(produkTable.id, 9));

  // 2. DELETE (Hapus barang id 7)
  await db.delete(produkTable)
    .where(eq(produkTable.id, 7));

  // 3. READ (Tampilkan hasil akhir)
  const data = await db.select().from(produkTable);
  console.log(data);
}

main();