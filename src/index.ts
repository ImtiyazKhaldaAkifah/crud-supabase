import { Elysia } from "elysia";
import { mahasiswaRoute } from "./routes/mahasiswa";
import { produkRoute } from "./routes/produk";

const app = new Elysia();

app.use(mahasiswaRoute);
app.use(produkRoute);

app.listen(process.env.PORT!);

console.log(`Server berjalan di http://localhost:${process.env.PORT || 3001}`);