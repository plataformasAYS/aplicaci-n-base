import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const modulos = [
  { to: "/", icono: "▣", etiqueta: "Dashboard" },
  { to: "/planeacion", icono: "◔", etiqueta: "Planeación" },
  { to: "/pedidos", icono: "▤", etiqueta: "Pedidos" },
  { to: "/inventarios", icono: "▦", etiqueta: "Inventarios" },
  { to: "/transito", icono: "⇄", etiqueta: "Tránsito" },
  { to: "/topes", icono: "◍", etiqueta: "Topes" },
  { to: "/alertas", icono: "▲", etiqueta: "Alertas" },
  { to: "/reportes", icono: "▧", etiqueta: "Reportes" },
] as const;

export function AppLayout({
  titulo,
  subtitulo,
  acciones,
  children,
}: {
  titulo: string;
  subtitulo: string;
  acciones?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute top-1/3 right-[-120px] h-[460px] w-[460px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/3 h-[420px] w-[420px] rounded-full bg-branddeep/15 blur-3xl" />
      </div>

      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-ink/95 md:flex">
          <div className="flex items-center gap-2.5 px-5 py-5">
            <div className="grid size-8 place-items-center rounded-md bg-accent font-display text-sm font-bold text-accent-foreground">
              NV
            </div>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-card">Núcleo</p>
              <p className="text-[11px] text-card/45">ERP de abastecimiento</p>
            </div>
          </div>

          <nav className="mt-2 flex-1 space-y-0.5 px-3">
            <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-card/35">
              Módulos
            </p>
            {modulos.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                activeOptions={{ exact: m.to === "/" }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-card/60 transition-colors hover:bg-card/5"
                activeProps={{ className: "bg-card/10 font-medium text-card" }}
              >
                <span className="grid size-4 place-items-center">{m.icono}</span>
                {m.etiqueta}
              </Link>
            ))}
          </nav>

          <div className="border-t border-card/10 px-4 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid size-8 place-items-center rounded-full bg-branddeep text-[11px] font-semibold text-card">
                ML
              </div>
              <div className="leading-tight">
                <p className="text-[12px] font-medium text-card">M. Loaiza</p>
                <p className="text-[11px] text-card/45">Coordinadora de centro</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
              <div className="mr-auto">
                <h1 className="font-display text-xl font-semibold leading-none">{titulo}</h1>
                <p className="mt-1 text-[12px] text-muted-foreground">{subtitulo}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-[12px]">
                  <span className="text-muted-foreground">Período</span>
                  <span className="font-medium">Sep 2026</span>
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-[12px]">
                  <span className="text-muted-foreground">Cliente</span>
                  <span className="font-medium">Servicios Integrales del Norte</span>
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-[12px]">
                  <span className="text-muted-foreground">Centro</span>
                  <span className="font-medium">CS Bogotá Norte</span>
                </span>
                {acciones}
              </div>
            </div>
            <nav className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
              {modulos.map((m) => (
                <Link
                  key={m.to}
                  to={m.to}
                  activeOptions={{ exact: m.to === "/" }}
                  className="whitespace-nowrap rounded-lg px-3 py-1.5 text-[12px] text-muted-foreground"
                  activeProps={{ className: "bg-ink/90 font-medium text-card" }}
                >
                  {m.etiqueta}
                </Link>
              ))}
            </nav>
          </header>

          <main className="px-4 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function Panel({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion?: string;
  children: ReactNode;
}) {
  return (
    <section className="glass rounded-xl p-4 ring-1 ring-border sm:p-5">
      <div className="mb-3">
        <h2 className="font-display text-lg font-semibold">{titulo}</h2>
        {descripcion ? (
          <p className="text-[12px] text-muted-foreground">{descripcion}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Vacio({ mensaje }: { mensaje: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
      {mensaje}
    </div>
  );
}
