import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
// adiciona aqui, um por um para testar
/** 1) Listar tipos */
app.get("/tipos", async (_req, res) => {
  const tipos = await prisma.tipoDeficiencia.findMany({
    orderBy: { id: "asc" }
  });
  res.json(tipos);
});

/** 2) Listar tipos com seus subtipos */
app.get("/subtipos", async (_req, res) => {
  const tipos = await prisma.tipoDeficiencia.findMany({
    orderBy: { id: "asc" },
    include: { subtipos: { orderBy: { id: "asc" } } },
  });
  res.json(tipos);
});



/** 3) Listar barreiras */
app.get("/barreiras", async (_req, res) => {
  const barreiras = await prisma.barreira.findMany({ orderBy: { id: "asc" } });
  res.json(barreiras);
});



/** 4) Listar acessibilidades */
app.get("/acessibilidades", async (_req, res) => {
  const acess = await prisma.acessibilidade.findMany({ orderBy: { id: "asc" } });
  res.json(acess);
});

/** 5) Obter um subtipo com suas barreiras e as acessibilidades de cada barreira */
app.get("/subtipos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const subtipo = await prisma.subtipoDeficiencia.findUnique({
    where: { id },
    include: {
      tipo: true,
      barreiras: {
        include: {
          barreira: {
            include: {
              acessibilidades: {
                include: { acessibilidade: true },
                orderBy: { acessibilidadeId: "asc" },
              },
            },
          },
        },
        orderBy: { barreiraId: "asc" },
      },
    },
  });

  if (!subtipo) return res.status(404).json({ error: "Subtipo não encontrado" });

  // opcional: “achatar” a resposta para facilitar a leitura no front
  const barreiras = subtipo.barreiras.map((sb) => ({
    id: sb.barreira.id,
    descricao: sb.barreira.descricao,
    acessibilidades: sb.barreira.acessibilidades.map((ba) => ({
      id: ba.acessibilidade.id,
      descricao: ba.acessibilidade.descricao,
    })),
  }));

  res.json({
    id: subtipo.id,
    nome: subtipo.nome,
    tipo: { id: subtipo.tipo.id, nome: subtipo.tipo.nome },
    barreiras,
  });
});


/** middleware básico de erro */
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`API Etapa 1 rodando em http://localhost:${PORT}`));
