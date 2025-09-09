import { NavLink, Outlet } from "react-router-dom";

export default function AdminPage() {
  const linkBase =
    "px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition";
  const linkActive = "bg-gray-200";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar simples */}
      <header className="bg-white border-b">
        <div className="container-page py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin</h1>
          <nav className="flex gap-2">
            <NavLink
              to="/admin/tipos"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Tipos
            </NavLink>
            <NavLink
              to="/admin/subtipos"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Subtipos
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Conteúdo das rotas filhas */}
      <main className="container-page py-8">
        <Outlet />
      </main>
    </div>
  );
}
