import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, Scissors, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/modulos", label: "Módulos" },
  { to: "/meu-progresso", label: "Meu progresso" },
  { to: "/admin", label: "Admin" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const q = term.trim();
    if (!q) return;
    setOpen(false);
    void navigate({ to: "/buscar", search: { q } });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:flex lg:gap-8">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <Scissors className="size-6 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate font-display text-2xl leading-none tracking-wide">
            Mestre dos Ajustes
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} role="search" className="ml-auto hidden lg:block">
          <label htmlFor="busca-desktop" className="sr-only">
            Buscar aulas
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="busca-desktop"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar aula, módulo ou técnica"
              className="w-72 rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none"
            />
          </div>
        </form>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="justify-self-end rounded-md p-2 text-foreground transition-colors hover:bg-surface lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className={cn("border-t border-border px-4 py-4 lg:hidden", open ? "block" : "hidden")}>
        <form onSubmit={handleSearch} role="search">
          <label htmlFor="busca-mobile" className="sr-only">
            Buscar aulas
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="busca-mobile"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar aula, módulo ou técnica"
              className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none"
            />
          </div>
        </form>
        <nav aria-label="Navegação móvel" className="mt-4 flex flex-col gap-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
