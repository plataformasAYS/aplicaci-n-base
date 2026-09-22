import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Panel } from "@/components/AppLayout";
import { kpis, alertas, topes } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard de abastecimiento · Núcleo" },
      {
        name: "description",
        content:
          "Indicadores de abastecimiento, inventarios, topes y precisión de proyección por cliente y centro de servicio.",
      },
      { property: "og:title", content: "Dashboard de abastecimiento · Núcleo" },
      {
        property: "og:description",
        content:
          "Indicadores de abastecimiento, inventarios, topes y precisión de proyección por cliente y centro de servicio.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppLayout
      titulo="Dashboard de abastecimiento"
      subtitulo="Vista ejecutiva · datos de demostración"
      acciones={
        <Link
          to="/pedidos"
          className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground ring-1 ring-primary/30"
        >
          Nuevo pedido
        </Link>
      }
    >
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.titulo} className="glass diag rounded-xl p-4 ring-1 ring-border">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {k.titulo}
            </p>
            <p className="num mt-2 font-display text-3xl font-semibold">{k.valor}</p>
            <p className={`mt-1 text-[12px] ${k.tono}`}>{k.detalle}</p>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel titulo="Uso de topes por categoría" descripcion="Período vigente">
          <ul className="space-y-3">
            {topes.map((t) => (
              <li key={t.categoria}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="font-medium">{t.categoria}</span>
                  <span className="num text-muted-foreground">{t.uso} % del tope</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      t.uso <= 85 ? "bg-ok" : t.uso <= 100 ? "bg-warn" : t.uso <= 110 ? "bg-risk" : "bg-over"
                    }`}
                    style={{ width: `${Math.min(t.uso, 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel titulo="Alertas recientes" descripcion="Bandeja resumida">
          <ul className="divide-y divide-border text-[13px]">
            {alertas.map((a) => (
              <li key={a.tipo} className="flex items-start justify-between gap-3 py-2.5">
                <div>
                  <p className="font-medium">{a.tipo}</p>
                  <p className="text-[12px] text-muted-foreground">{a.entidad}</p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {a.estado}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel titulo="Consolidado del período" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-[13px] text-muted-foreground">
            El consolidado se habilita al cierre de la captura de pedidos.
          </div>
        </Panel>
        <Panel titulo="Precisión por centro" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-[13px] text-muted-foreground">
            El índice se publica con la revalidación mensual.
          </div>
        </Panel>
        <Panel titulo="Inventario en tránsito" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-[13px] text-muted-foreground">
            Seguimiento detallado disponible en el módulo de Tránsito.
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
