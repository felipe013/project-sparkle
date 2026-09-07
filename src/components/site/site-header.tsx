import { useState, type ComponentProps } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#recursos", label: "Recursos" },
  { href: "#fluxo", label: "Como funciona" },
  { href: "#depoimentos", label: "Clientes" },
  { href: "#planos", label: "Planos" },
] as const;

export type SiteHeaderProps = ComponentProps<"header">;

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#topo" className="flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none text-foreground">Projeto</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#planos"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Entrar
          </a>
          <a
            href="#planos"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Começar grátis
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Navegação móvel"
          className="border-t border-border bg-background px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#planos"
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
              >
                Começar grátis
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
