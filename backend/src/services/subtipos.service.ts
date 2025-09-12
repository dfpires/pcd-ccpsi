import { SubtiposRepo } from "../repositories/subtipos.repo";
import { TiposRepo } from "../repositories/tipos.repo";

export const SubtiposService = {
   list() {
    return SubtiposRepo.list();
  }, 
  
  async findDeep(id: number) {
    const subtipo = await SubtiposRepo.findDeepById(id);
    if (!subtipo) throw Object.assign(new Error("Subtipo não encontrado"), { status: 404 });

    // “achata” a resposta como no server.ts
    const barreiras = subtipo.barreiras.map((sb) => ({
      id: sb.barreira.id,
      descricao: sb.barreira.descricao,
      acessibilidades: sb.barreira.acessibilidades.map((ba) => ({
        id: ba.acessibilidade.id,
        descricao: ba.acessibilidade.descricao,
      })),
    }));

    return {
      id: subtipo.id,
      nome: subtipo.nome,
      tipo: { id: subtipo.tipo.id, nome: subtipo.tipo.nome },
      barreiras,
    };
  },

  async create(nome: string, tipoId: number) {
    const final = (nome ?? "").trim();
    if (!final) throw Object.assign(new Error("Campos 'nome' e 'tipoId' são obrigatórios"), { status: 400 });
    if (!Number.isInteger(tipoId)) throw Object.assign(new Error("tipoId inválido"), { status: 400 });

    const tipo = await TiposRepo.findById(tipoId);
    if (!tipo) throw Object.assign(new Error("Tipo não encontrado"), { status: 404 });

    return SubtiposRepo.create(final, tipoId);
  },
};