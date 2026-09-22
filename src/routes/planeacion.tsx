import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Panel } from "@/components/AppLayout";
import { lineasPedido } from "@/data/mock";

export const Route = createFileRoute("/planeacion")({
  head: () => ({
    meta: [
      { title: "Planeación de necesidades · Núcleo" },
      {
        name: "description",
        content:
          "Inventario disponible, inventario en tránsito, histórico de consumo y cobertura en días antes de crear el pedido.",
      },
      { property: "og:title", content: "Planeación de necesidades · Núcleo" },
      {
        property: "og:description",
        content: "Disponible, tránsito, consumo histórico y cobertura en días por producto.",
      },
    ],
  }),
  component: Planeacion,
});

function Planeacion() {
  return (
    <AppLayout
      titulo="Planeación de necesidades"
      subtitulo="Disponible, tránsito y consumo en una sola pantalla"
    >
      <Panel titulo="Panorama por producto" descripcion="Base del cálculo de la necesidad sugerida">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Código</th>
                <th className="pb-2 pr-3 font-medium">Descripción</th>
                <th className="pb-2 pr-3 text-right font-medium">Disponible</th>
                <th className="pb-2 pr-3 text-right font-medium">Tránsito</th>
                <th className="pb-2 pr-3 text-right font-medium">Consumo prom. mes</th>
                <th className="pb-2 pr-3 text-right font-medium">Cobertura (días)</th>
                <th className="pb-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lineasPedido.map((l) => {
                const diario = l.consumoPromedio / 30;
                const cobertura = diario > 0 ? (l.existencias + l.transito) / diario : 0;
                const riesgo = cobertura < 15;
                return (
                  <tr key={l.id}>
                    <td className="num py-2.5 pr-3 font-medium">{l.codigo}</td>
                    <td className="py-2.5 pr-3">{l.descripcion}</td>
                    <td className="num py-2.5 pr-3 text-right">{l.existencias}</td>
                    <td className="num py-2.5 pr-3 text-right">{l.transito}</td>
                    <td className="num py-2.5 pr-3 text-right">{l.consumoPromedio}</td>
                    <td className="num py-2.5 pr-3 text-right">{cobertura.toFixed(0)}</td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium ${
                          riesgo ? "text-over" : "text-ok"
                        }`}
                      >
                        <span aria-hidden>{riesgo ? "■" : "✓"}</span>
                        {riesgo ? "Riesgo de agotado" : "Cobertura suficiente"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel titulo="Tendencia de consumo" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
            La representación gráfica de tendencia y estacionalidad se incorpora con el histórico cargado.
          </div>
        </Panel>
        <Panel titulo="Histórico 3 / 6 / 12 meses" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
            Disponible al conectar el consumo histórico por centro de servicio.
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
