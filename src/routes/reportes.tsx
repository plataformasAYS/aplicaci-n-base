import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Panel } from "@/components/AppLayout";
import { reportes } from "@/data/mock";

export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes · Núcleo" },
      {
        name: "description",
        content:
          "Reportes de consumo, inventarios, centros fuera de tope, sobrepedidos y precisión de proyección.",
      },
      { property: "og:title", content: "Reportes · Núcleo" },
      {
        property: "og:description",
        content: "Catálogo de reportes operativos y de control del proceso de abastecimiento.",
      },
    ],
  }),
  component: Reportes,
});

function Reportes() {
  return (
    <AppLayout titulo="Reportes" subtitulo="Catálogo de reportes del período">
      <Panel titulo="Reportes disponibles" descripcion="La exportación se habilita en la siguiente iteración">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {reportes.map((r) => (
            <li
              key={r}
              className="flex items-center justify-between rounded-lg border border-border bg-card/70 px-3 py-3 text-[13px]"
            >
              <span className="font-medium">{r}</span>
              <span className="text-[11px] text-muted-foreground">Pendiente</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="mt-4">
        <Panel titulo="Checklist de cierre del período" descripcion="Espacio reservado">
          <ul className="space-y-2 text-[13px]">
            {[
              "Captura de pedidos cerrada en todos los centros",
              "Conteo físico registrado",
              "Recepciones confirmadas",
              "Excepciones de tope resueltas",
              "Revalidación mensual ejecutada",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-muted-foreground">
                <span className="grid size-4 place-items-center rounded border border-border text-[10px]" aria-hidden>
                  ·
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppLayout>
  );
}
