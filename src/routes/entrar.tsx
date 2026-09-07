import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — Mestre dos Ajustes" },
      {
        name: "description",
        content:
          "Acesse sua conta para salvar o progresso das aulas de ajustes e reformas de roupas na nuvem.",
      },
      { property: "og:title", content: "Entrar — Mestre dos Ajustes" },
      {
        property: "og:description",
        content: "Entre para continuar assistindo de onde parou, em qualquer aparelho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

type Mode = "entrar" | "criar";

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("entrar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/meu-progresso" });
  }, [loading, user, navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "criar") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { display_name: name || email.split("@")[0] },
        },
      });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setMessage("Conta criada! Confirme o e-mail se pedirmos e já pode entrar.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError("E-mail ou senha incorretos.");
      return;
    }
    void navigate({ to: "/meu-progresso" });
  }

  async function handleGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Não foi possível entrar com o Google agora.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/meu-progresso" });
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
        <div className="flex items-center gap-2">
          <Scissors className="size-6 text-primary" aria-hidden="true" />
          <span className="font-display text-2xl leading-none tracking-wide">
            Mestre dos Ajustes
          </span>
        </div>

        <h1 className="mt-6 font-display text-3xl tracking-wide">
          {mode === "entrar" ? "Entrar na sua conta" : "Criar sua conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Seu progresso fica salvo na nuvem e acompanha você no celular e no computador.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          className="mt-6 w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-elevated"
        >
          Continuar com o Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          ou com e-mail
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "criar" ? (
            <Field label="Seu nome" id="nome">
              <input
                id="nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className={inputClass}
              />
            </Field>
          ) : null}

          <Field label="E-mail" id="email">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className={inputClass}
            />
          </Field>

          <Field label="Senha" id="senha">
            <input
              id="senha"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === "criar" ? "new-password" : "current-password"}
              className={inputClass}
            />
          </Field>

          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          {message ? <p className="text-sm text-success">{message}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Aguarde..." : mode === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "entrar" ? "criar" : "entrar")}
          className="mt-5 w-full text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {mode === "entrar" ? "Ainda não tenho conta" : "Já tenho conta"}
        </button>

        <Link
          to="/"
          className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground"
        >
          Voltar para as aulas
        </Link>
      </div>
    </main>
  );
}

const inputClass = cn(
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground",
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none",
);

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
