interface Step {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Traga o que já existe",
    description:
      "Importe planilhas, quadros e tarefas de outras ferramentas em poucos minutos. Nada de recomeçar do zero.",
  },
  {
    number: "02",
    title: "Defina o ritmo",
    description:
      "Escolha ciclos semanais ou quinzenais. O Projeto distribui a carga e mostra onde o time está apertado.",
  },
  {
    number: "03",
    title: "Acompanhe sem cobrar",
    description:
      "Relatórios automáticos chegam prontos. As reuniões de status viram conversas sobre o que realmente trava.",
  },
];

export function WorkflowSection() {
  return (
    <section id="fluxo" className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-eyebrow">Como funciona</p>
            <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
              Três passos até o primeiro ciclo entregue.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A maioria das equipes coloca o Projeto para rodar em uma tarde e vê o primeiro
              relatório útil na semana seguinte.
            </p>
          </div>

          <ol className="space-y-px overflow-hidden rounded-2xl border border-border bg-border">
            {STEPS.map((step) => (
              <li key={step.number} className="bg-card p-8 sm:flex sm:gap-8">
                <span className="font-mono text-sm text-accent sm:pt-1">{step.number}</span>
                <div className="mt-3 sm:mt-0">
                  <h3 className="text-xl text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
