import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Panel } from "@/components/AppLayout";
import { inventario } from "@/data/mock";

export const Route = createFileRoute("/inventarios")({
  head: () => ({
    meta: [
      { title: "Gestión de inventarios · Núcleo" },
      {
        name: "description",
        content:
          "Saldos por producto y centro, entradas, salidas, ajustes con motivo y conteo físico.",
      },
      { property: "og:title", content: "Gestión de inventarios · Núcleo" },
      {
        property: "og:description",
        content: "Saldos en tiempo real, movimientos y conteo físico por centro de servicio.",
      },
    ],
  }),
  component: Inventarios,
});

function Inventarios() {
  return (
    <AppLayout titulo="Gestión de inventarios" subtitulo="Saldos y movimientos del centro de servicio">
      <Panel titulo="Saldos por producto" descripcion="El saldo se deriva de los movimientos registrados">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Código</th>
                <th className="pb-2 pr-3 font-medium">Descripción</th>
                <th className="pb-2 pr-3 text-right font-medium">Disponible</th>
                <th className="pb-2 pr-3 text-right font-medium">Mínimo</th>
                <th className="pb-2 pr-3 text-right font-medium">Seguridad</th>
                <th className="pb-2 pr-3 font-medium">Último conteo</th>
                <th className="pb-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventario.map((i) => {
                const bajo = i.disponible < i.minimo;
                return (
                  <tr key={i.codigo}>
                    <td className="num py-2.5 pr-3 font-medium">{i.codigo}</td>
                    <td className="py-2.5 pr-3">{i.descripcion}</td>
                    <td className="num py-2.5 pr-3 text-right">{i.disponible}</td>
                    <td className="num py-2.5 pr-3 text-right">{i.minimo}</td>
                    <td className="num py-2.5 pr-3 text-right">{i.seguridad}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{i.conteo}</td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium ${
                          bajo ? "text-risk" : "text-ok"
                        }`}
                      >
                        <span aria-hidden>{bajo ? "▲" : "✓"}</span>
                        {bajo ? "Bajo mínimo" : "Normal"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel titulo="Movimientos" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-[13px] text-muted-foreground">
            Entradas, salidas y ajustes con motivo y soporte adjunto.
          </div>
        </Panel>
        <Panel titulo="Conteo físico" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-[13px] text-muted-foreground">
            Registro de diferencias entre saldo teórico y contado.
          </div>
        </Panel>
        <Panel titulo="Kardex" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-[13px] text-muted-foreground">
            Kardex por producto y centro, exportable.
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
