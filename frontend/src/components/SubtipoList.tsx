import type { TipoComSubtipos } from "../types";

type Props = { tipos: TipoComSubtipos[] };

export default function SubtipoList({ tipos }: Props) {
  const temSubtipo = tipos.some((t) => t.subtipos.length > 0);

  if (!temSubtipo) {
    return <div className="card text-gray-500">Nenhum subtipo cadastrado ainda.</div>;
  }

  return (
    <div className="card space-y-4">
      <h3 className="text-lg font-semibold">Subtipos por Tipo</h3>

      <div className="space-y-6">
        {tipos.map((t) => (
          <div key={t.id}>
            <div className="font-semibold mb-2">{t.nome}</div>
            {t.subtipos.length ? (
              <ul className="divide-y">
                {t.subtipos.map((s) => (
                  <li key={s.id} className="py-2 flex items-center justify-between">
                    <span>{s.nome}</span>
                    <span className="text-xs text-gray-400">#{s.id}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">Nenhum subtipo para este tipo.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
