import type { TipoDeficiencia } from "../types";
type Props = {
  tipos: TipoDeficiencia[];
};
export default function TipoList({ tipos }: Props) {
  if (!tipos.length) {
    return <div className="card text-gray-500">Nenhum tipo cadastrado ainda.</div>;
  }
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-3">Tipos cadastrados</h3>
      <ul className="divide-y">
        {tipos.map((t) => (
          <li key={t.id} className="py-2 flex items-center justify-between">
            <div>
              <span className="font-medium">{t.nome}</span>
            </div>
            <span className="text-xs text-gray-400">#{t.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
