import { Elysia } from "elysia";

// Mengubah 'const' ke 'let' agar data dalam array bisa diubah/dihapus
let mahasiswa = [
  {
    id: 1,
    nama: "Ahmad",
    email: "ahmad@example.com",
    jurusan: "Teknik Informatika"
  },
  {
    id: 2,
    nama: "Anisa",
    email: "anisa@example.com",
    jurusan: "Manajemen Informatika"
  },
  {
    id: 3,
    nama: "Andika",
    email: "andika@example.com",
    jurusan: "Teknik Informatika"
  }
];

export const mahasiswaRoute = new Elysia({
  prefix: "/mahasiswa"
})
  // GET: Ambil semua data mahasiswa
  .get("/", () => {
    return mahasiswa;
  })

  // GET: Ambil 1 mahasiswa berdasarkan ID
  .get("/:id", ({ params }) => {
    const mahasiswaId = parseInt(params.id);
    const data = mahasiswa.find(m => m.id === mahasiswaId);
    if (data) {
      return data;
    } else {
      return { error: "Mahasiswa tidak ditemukan" };
    }
  })

  // POST: Menambah data mahasiswa baru
  .post("/", ({ body }: any) => {
    if (body && body.nama) {
      const newId = mahasiswa.length > 0 ? Math.max(...mahasiswa.map(m => m.id)) + 1 : 1;
      const newMahasiswa = { id: newId, ...body };
      mahasiswa.push(newMahasiswa);
      return { message: "Data berhasil ditambahkan", data: newMahasiswa };
    } else {
      return { error: "Data tidak valid atau kosong" };
    }
  })

  // PUT: Mengubah seluruh data mahasiswa berdasarkan ID
  .put("/:id", ({ params, body }: any) => {
    const id = parseInt(params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
      return { error: "Mahasiswa tidak ditemukan" };
    }

    // Mengganti seluruh objek data lama dengan data baru
    mahasiswa[index] = { id, ...body };
    return { message: "Data berhasil diperbarui (PUT)", data: mahasiswa[index] };
  })

  // PATCH: Mengubah sebagian data mahasiswa berdasarkan ID
  .patch("/:id", ({ params, body }: any) => {
    const id = parseInt(params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
      return { error: "Mahasiswa tidak ditemukan" };
    }

    // Menggabungkan data lama dengan perubahan baru saja
    mahasiswa[index] = { ...mahasiswa[index], ...body };
    return { message: "Data berhasil diperbarui sebagian (PATCH)", data: mahasiswa[index] };
  })

  // DELETE: Menghapus data mahasiswa berdasarkan ID
  .delete("/:id", ({ params }) => {
    const id = parseInt(params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
      return { error: "Mahasiswa tidak ditemukan" };
    }

    const deletedData = mahasiswa.splice(index, 1);
    return { message: "Data berhasil dihapus", data: deletedData[0] };
  })

  // CONNECT: Mengakses endpoint dengan method CONNECT
  .connect("/", () => {
    return { message: "Koneksi berhasil (CONNECT)" };
  });