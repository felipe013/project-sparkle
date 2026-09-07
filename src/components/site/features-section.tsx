import { CalendarRange, GitBranch, Gauge, MessagesSquare, ShieldCheck, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
}

const FEATURES: readonly Feature[] = [
  {
    icon: Layers,
    title: "Quadros que respiram",
    description:
      "Kanban, lista e linha do tempo compartilham os mesmos dados. Troque de visão sem reconfigurar nada.",
  },
  {
    icon: CalendarRange,
    title: "Prazos realistas",
    description:
      "O planejamento considera capacidade real do time e avisa antes de a data virar problema.",
  },
  {
    icon: MessagesSquare,
    title: "Decisões registradas",
    description:
      "Cada discussão fica anexada à tarefa. O contexto não some quando alguém sai de férias.",
  },
  {
    icon: Gauge,
    title: "Progresso honesto",
    description:
      "Indicadores calculados a partir de entregas concluídas, não de porcentagens digitadas à mão.",
  },
  {
    icon: GitBranch,
    title: "Integra com o seu código",
    description:
      "Commits e pull requests atualizam o status automaticamente. Menos trabalho administrativo.",
  },
  {
    icon: ShieldCheck,
    title: "Permissões precisas",
    description:
      "Convide clientes e parceiros com acesso exatamente ao que precisam ver — nada além.",
  },
];

export function FeaturesSection() {
  return (
    <section id="recursos" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-eyebrow">Recursos</p>
          <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
            Tudo que uma equipe precisa —{" "}
            <span className="italic text-accent">e nada que ela não use.</span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="group bg-card p-8 transition-colors hover:bg-secondary">
              <feature.icon className="size-6 text-accent" aria-hidden="true" />
              <h3 className="mt-6 text-xl text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
