import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Panel } from "@/components/AppLayout";
import { alertas } from "@/data/mock";

export const Route = createFileRoute("/alertas")({
  head: () => ({
    meta: [
      { title: "Bandeja de alertas · Núcleo" },
      {
        name: "description",
        content:
          "Alertas de faltante, exceso, consumo atípico e inventario estancado con estado y responsable.",
      },
      { property: "og:title", content: "Bandeja de alertas · Núcleo" },
      {
        property: "og:description",
        content: "Alertas operativas con severidad, estado de atención y responsable.",
      },
    ],
  }),
  component: Alertas,
});

function Alertas() {
  return (
    <AppLayout titulo="Bandeja de alertas" subtitulo="Eventos generados por el motor de reglas">
      <Panel titulo="Alertas activas" descripcion="Estado: nueva, en gestión, atendida o descartada">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Tipo</th>
                <th className="pb-2 pr-3 font-medium">Severidad</th>
                <th className="pb-2 pr-3 font-medium">Entidad afectada</th>
                <th className="pb-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alertas.map((a) => (
                <tr key={a.tipo}>
                  <td className="py-2.5 pr-3 font-medium">{a.tipo}</td>
                  <td className="py-2.5 pr-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${
                        a.severidad === "Crítica" ? "text-over" : "text-warn"
                      }`}
                    >
                      <span aria-hidden>{a.severidad === "Crítica" ? "■" : "◐"}</span>
                      {a.severidad}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{a.entidad}</td>
                  <td className="py-2.5">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {a.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppLayout>
  );
}
