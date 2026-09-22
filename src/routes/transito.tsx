import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Panel } from "@/components/AppLayout";
import { transito } from "@/data/mock";

export const Route = createFileRoute("/transito")({
  head: () => ({
    meta: [
      { title: "Inventario en tránsito · Núcleo" },
      {
        name: "description",
        content:
          "Despachos aprobados, despachados y pendientes con fecha estimada de entrega y registro de diferencias.",
      },
      { property: "og:title", content: "Inventario en tránsito · Núcleo" },
      {
        property: "og:description",
        content: "Estados de despacho y fechas estimadas de entrega por centro de servicio.",
      },
    ],
  }),
  component: Transito,
});

function Transito() {
  return (
    <AppLayout titulo="Inventario en tránsito" subtitulo="Mercancía aprobada y pendiente por recibir">
      <Panel titulo="Despachos" descripcion="Estado y fecha estimada de entrega">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Despacho</th>
                <th className="pb-2 pr-3 font-medium">Producto</th>
                <th className="pb-2 pr-3 text-right font-medium">Cantidad</th>
                <th className="pb-2 pr-3 font-medium">Estado</th>
                <th className="pb-2 font-medium">Entrega estimada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transito.map((t) => (
                <tr key={t.despacho}>
                  <td className="num py-2.5 pr-3 font-medium">{t.despacho}</td>
                  <td className="py-2.5 pr-3">{t.producto}</td>
                  <td className="num py-2.5 pr-3 text-right">{t.cantidad}</td>
                  <td className="py-2.5 pr-3">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {t.estado}
                    </span>
                  </td>
                  <td className="py-2.5 text-muted-foreground">{t.entrega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-4">
        <Panel titulo="Recepciones" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
            Registro de cantidad recibida, diferencias y evidencia; genera el movimiento de entrada.
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
