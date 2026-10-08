import { Elysia } from "elysia";
import { mahasiswaRoute } from "./routes/mahasiswa";

const app = new Elysia()
  .use(mahasiswaRoute)
  .listen(3001);

console.log(`Server berjalan di http://localhost:${app.server?.port}`);