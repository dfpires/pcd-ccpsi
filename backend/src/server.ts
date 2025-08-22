import express from "express";
import { PrismaClient } from "@prisma/client";
// importa suas rotas
import tiposRoutes from "./routes/tipos.routes";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
// usa os módulos de rotas
app.use("/tipos", tiposRoutes);

// middleware de erro genérico
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Erro interno" });
});

// sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
