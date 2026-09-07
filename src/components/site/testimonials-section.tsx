interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Cortamos a reunião semanal de status. O relatório do Projeto já responde tudo que a gente perguntava.",
    name: "Marina Alves",
    role: "Head de Produto, Cauê Tech",
    initials: "MA",
  },
  {
    quote:
      "Foi a primeira ferramenta que o time de design e o de engenharia aceitaram usar junto sem reclamar.",
    name: "Rafael Nunes",
    role: "Diretor de Operações, Estúdio Norte",
    initials: "RN",
  },
  {
    quote:
      "Dou acesso aos clientes direto no quadro do projeto. Acabou a troca de e-mails pedindo atualização.",
    name: "Juliana Prado",
    role: "Sócia, Prado Consultoria",
    initials: "JP",
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <p className="text-eyebrow">Clientes</p>
        <h2 className="mt-5 max-w-2xl text-4xl leading-tight text-foreground sm:text-5xl">
          Times que trocaram o caos por um ritmo previsível.
        </h2>

        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li key={item.name} className="flex flex-col rounded-2xl border border-border bg-card p-8">
              <p className="font-display text-xl leading-snug text-foreground">“{item.quote}”</p>
              <div className="mt-auto flex items-center gap-3 pt-8">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-xs text-surface-foreground"
                >
                  {item.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
