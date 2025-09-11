// src/server.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

// importa suas rotas
import tiposRoutes from "./routes/tipos.routes";
import subtiposRoutes from "./routes/subtipos.routes";
import barreirasRoutes from "./routes/barreiras.routes";
import acessibilidadesRoutes from "./routes/acessibilidades.routes";
import vinculosRoutes from "./routes/vinculos.routes"

const app = express();
const prisma = new PrismaClient();
app.use(cors({ origin: true })); // antes das rotas
app.use(express.json());

// usa os módulos de rotas
app.use("/tipos", tiposRoutes);
app.use("/subtipos", subtiposRoutes);
app.use("/vinculos", vinculosRoutes)
app.use("/barreiras", barreirasRoutes);
app.use("/acessibilidades", acessibilidadesRoutes);

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