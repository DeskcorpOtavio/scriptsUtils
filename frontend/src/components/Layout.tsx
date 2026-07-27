import { NavLink, Outlet } from "react-router-dom";
import { ImageIcon, FileUp, FileDown } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: ImageIcon, label: "Imagem → Base64" },
  { to: "/file-to-base64", icon: FileUp, label: "Arquivo → Base64" },
  { to: "/base64-to-file", icon: FileDown, label: "Base64 → Arquivo" },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Scripts Utils
            </span>
          </h1>

          <nav className="flex gap-1">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-transparent"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
