import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Panel } from "@/components/AppLayout";
import { evaluarTope, semaforoInfo, topes } from "@/data/mock";

export const Route = createFileRoute("/topes")({
  head: () => ({
    meta: [
      { title: "Topes y negociaciones · Núcleo" },
      {
        name: "description",
        content:
          "Condiciones comerciales vigentes por cliente y categoría, con versión, vigencia y porcentaje de uso.",
      },
      { property: "og:title", content: "Topes y negociaciones · Núcleo" },
      {
        property: "og:description",
        content: "Topes vigentes por cliente y categoría con semaforización de uso.",
      },
    ],
  }),
  component: Topes,
});

function Topes() {
  return (
    <AppLayout titulo="Topes y negociaciones" subtitulo="Condiciones comerciales vigentes por cliente">
      <Panel titulo="Topes vigentes" descripcion="Cada evaluación conserva la versión del tope aplicada">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Cliente</th>
                <th className="pb-2 pr-3 font-medium">Categoría</th>
                <th className="pb-2 pr-3 text-right font-medium">Tope autorizado</th>
                <th className="pb-2 pr-3 text-right font-medium">Uso</th>
                <th className="pb-2 pr-3 font-medium">Vigencia</th>
                <th className="pb-2 pr-3 font-medium">Versión</th>
                <th className="pb-2 font-medium">Semáforo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topes.map((t) => {
                const info = semaforoInfo[evaluarTope(t.uso)];
                return (
                  <tr key={t.categoria}>
                    <td className="py-2.5 pr-3">{t.cliente}</td>
                    <td className="py-2.5 pr-3 font-medium">{t.categoria}</td>
                    <td className="num py-2.5 pr-3 text-right">{t.tope}</td>
                    <td className="num py-2.5 pr-3 text-right">{t.uso} %</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{t.vigencia}</td>
                    <td className="num py-2.5 pr-3 text-muted-foreground">{t.version}</td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium ${info.clase}`}
                      >
                        <span aria-hidden>{info.icono}</span>
                        {info.etiqueta}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-4">
        <Panel titulo="Excepciones de tope" descripcion="Espacio reservado">
          <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
            Solicitudes de excepción con aprobación de Logística y Comercial.
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
