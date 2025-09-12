export type Barreira = {
  id: number;
  descricao: string;
  createdAt?: string;
  updatedAt?: string;
};


export type TipoDeficiencia = {
  id: number;
  nome: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SubtipoDeficiencia = {
  id: number;
  nome: string;
  tipoId: number;
  createdAt?: string;
  updatedAt?: string;
};

// útil para listar: cada tipo com seus subtipos
export type TipoComSubtipos = TipoDeficiencia & {
  subtipos: SubtipoDeficiencia[];
};
