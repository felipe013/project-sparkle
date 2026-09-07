import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-workspace.jpg";

const STATS = [
  { value: "12k+", label: "equipes ativas" },
  { value: "38%", label: "menos reuniões" },
  { value: "4.9/5", label: "satisfação média" },
] as const;

export function HeroSection() {
  return (
    <section id="topo" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
        <div className="animate-rise">
          <p className="text-eyebrow">Gestão de projetos sem ruído</p>

          <h1 className="mt-6 text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            O trabalho da sua equipe,
            <span className="block italic text-accent">finalmente em ordem.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Projeto reúne tarefas, prazos e decisões em um único lugar calmo. Sem abas infinitas,
            sem status perdido no chat — só o que importa para entregar.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#planos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Começar grátis
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#fluxo"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Ver como funciona
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl text-foreground">{stat.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-surface/60" aria-hidden="true" />
          <img
            src={heroImage}
            alt="Painel do Projeto com linha do tempo, tarefas e indicadores de progresso"
            width={1408}
            height={1008}
            className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </div>
    </section>
  );
}
