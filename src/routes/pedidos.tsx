import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import {
  cabeceraPedido,
  evaluarTope,
  lineasPedido,
  semaforoInfo,
  UMBRAL_VARIACION,
} from "@/data/mock";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Generación de pedidos · Núcleo" },
      {
        name: "description",
        content:
          "Captura del pedido con cabecera autocompletada, cantidad sugerida, validación de topes y justificación obligatoria.",
      },
      { property: "og:title", content: "Generación de pedidos · Núcleo" },
      {
        property: "og:description",
        content:
          "Captura del pedido con cabecera autocompletada, cantidad sugerida y validación de topes en tiempo real.",
      },
    ],
  }),
  component: Pedidos,
});

type EstadoLinea = { solicitada: string; justificacion: string };

function Pedidos() {
  const [estado, setEstado] = useState<Record<string, EstadoLinea>>(() =>
    Object.fromEntries(
      lineasPedido.map((l) => [l.id, { solicitada: String(l.sugerida), justificacion: "" }]),
    ),
  );
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const filas = useMemo(
    () =>
      lineasPedido.map((l) => {
        const bruto = estado[l.id]!.solicitada.trim();
        const valor = Number(bruto);
        const errorCantidad =
          bruto === ""
            ? "Ingrese la cantidad solicitada."
            : !Number.isFinite(valor) || !Number.isInteger(valor)
              ? "La cantidad debe ser un número entero."
              : valor < 0
                ? "La cantidad no puede ser negativa."
                : valor > 99999
                  ? "La cantidad excede el máximo permitido (99.999)."
                  : null;

        const solicitada = errorCantidad ? 0 : valor;
        const variacion =
          l.sugerida === 0 ? (solicitada > 0 ? 100 : 0) : ((solicitada - l.sugerida) / l.sugerida) * 100;
        const uso = ((l.consumoPeriodo + solicitada) / l.topeAutorizado) * 100;
        const semaforo = evaluarTope(uso);

        const justificacion = estado[l.id]!.justificacion.trim();
        const exigeJustificacion =
          Math.abs(variacion) > UMBRAL_VARIACION || semaforo === "naranja" || semaforo === "rojo";
        const errorJustificacion =
          exigeJustificacion && justificacion.length < 10
            ? "Justificación obligatoria (mínimo 10 caracteres)."
            : null;

        return { l, solicitada, variacion, uso, semaforo, errorCantidad, errorJustificacion, exigeJustificacion };
      }),
    [estado],
  );

  const conErrores = filas.filter((f) => f.errorCantidad || f.errorJustificacion).length;
  const totalUnidades = filas.reduce((s, f) => s + f.solicitada, 0);

  const actualizar = (id: string, campo: keyof EstadoLinea, valor: string) => {
    setMensaje(null);
    setEstado((prev) => ({ ...prev, [id]: { ...prev[id]!, [campo]: valor } }));
  };

  const enviar = () => {
    setIntentoEnvio(true);
    setMensaje(
      conErrores > 0
        ? "No se puede enviar: hay líneas con datos inválidos o sin justificación registrada."
        : "Pedido validado. En esta primera iteración el envío no persiste información.",
    );
  };

  return (
    <AppLayout titulo="Generación de pedidos" subtitulo="Captura con validación de topes en tiempo real">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Nuevo pedido</h2>
          <p className="text-[12px] text-muted-foreground">
            Cabecera autocompletada · líneas editables · umbral de variación {UMBRAL_VARIACION} %
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border bg-card/70 px-3 py-2 text-[13px] font-medium text-muted-foreground">
            Guardar borrador
          </button>
          <button
            onClick={enviar}
            className="rounded-lg bg-accent px-4 py-2 text-[13px] font-medium text-accent-foreground ring-1 ring-accent/30"
          >
            Enviar pedido
          </button>
        </div>
      </div>

      <div className="glass rounded-xl p-4 ring-1 ring-border sm:p-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-b border-border pb-4 sm:grid-cols-4">
          {[
            ["Consecutivo", cabeceraPedido.consecutivo],
            ["Cliente", cabeceraPedido.cliente],
            ["NIT", cabeceraPedido.nit],
            ["Centro de servicio", cabeceraPedido.centroServicio],
            ["Código sucursal", cabeceraPedido.codigoSucursal],
            ["Centro de costos", cabeceraPedido.centroCostos],
            ["Centro de operación", cabeceraPedido.centroOperacion],
            ["Punto de envío", cabeceraPedido.puntoEnvio],
            ["Tipo de insumo", cabeceraPedido.tipoInsumo],
            ["Tipo de facturación", cabeceraPedido.tipoFacturacion],
            ["Fecha de pedido", cabeceraPedido.fechaPedido],
            ["Período", cabeceraPedido.periodo],
          ].map(([etiqueta, valor]) => (
            <div key={etiqueta}>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {etiqueta}
              </p>
              <p className="mt-0.5 text-[13px] font-medium">{valor}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Código</th>
                <th className="pb-2 pr-3 font-medium">Descripción</th>
                <th className="pb-2 pr-3 text-right font-medium">Sugerida</th>
                <th className="pb-2 pr-3 text-right font-medium">Solicitada</th>
                <th className="pb-2 pr-3 text-right font-medium">Existencias</th>
                <th className="pb-2 pr-3 text-right font-medium">Consumo prom.</th>
                <th className="pb-2 pr-3 text-right font-medium">Tránsito</th>
                <th className="pb-2 font-medium">Tope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filas.map((f) => {
                const info = semaforoInfo[f.semaforo];
                return (
                  <tr key={f.l.id} className="align-top">
                    <td className="num py-2.5 pr-3 font-medium">{f.l.codigo}</td>
                    <td className="py-2.5 pr-3">
                      <p>{f.l.descripcion}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {f.l.categoria} · {f.l.unidad}
                      </p>
                      {(f.exigeJustificacion || estado[f.l.id]!.justificacion) && (
                        <div className="mt-2 max-w-sm">
                          <label
                            htmlFor={`just-${f.l.id}`}
                            className="text-[11px] font-medium text-muted-foreground"
                          >
                            Justificación del ajuste
                          </label>
                          <textarea
                            id={`just-${f.l.id}`}
                            rows={2}
                            maxLength={300}
                            value={estado[f.l.id]!.justificacion}
                            onChange={(e) => actualizar(f.l.id, "justificacion", e.target.value)}
                            className="mt-1 w-full rounded-md border border-input bg-card/80 px-2 py-1 text-[12px]"
                            placeholder="Motivo del ajuste frente a la cantidad sugerida"
                          />
                          {intentoEnvio && f.errorJustificacion && (
                            <p className="mt-1 text-[11px] text-over">{f.errorJustificacion}</p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="num py-2.5 pr-3 text-right text-muted-foreground">{f.l.sugerida}</td>
                    <td className="py-2.5 pr-3 text-right">
                      <label className="sr-only" htmlFor={`cant-${f.l.id}`}>
                        Cantidad solicitada de {f.l.descripcion}
                      </label>
                      <input
                        id={`cant-${f.l.id}`}
                        inputMode="numeric"
                        value={estado[f.l.id]!.solicitada}
                        onChange={(e) => actualizar(f.l.id, "solicitada", e.target.value)}
                        className="num w-20 rounded-md border border-input bg-card/80 px-2 py-1 text-right text-[13px]"
                      />
                      {intentoEnvio && f.errorCantidad ? (
                        <p className="mt-1 text-right text-[11px] text-over">{f.errorCantidad}</p>
                      ) : (
                        <p className="num mt-1 text-right text-[11px] text-muted-foreground">
                          {f.variacion > 0 ? "+" : ""}
                          {f.variacion.toFixed(0)} % vs sugerida
                        </p>
                      )}
                    </td>
                    <td className="num py-2.5 pr-3 text-right">{f.l.existencias}</td>
                    <td className="num py-2.5 pr-3 text-right">{f.l.consumoPromedio}</td>
                    <td className="num py-2.5 pr-3 text-right">{f.l.transito}</td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium ${info.clase}`}
                      >
                        <span aria-hidden>{info.icono}</span>
                        {info.etiqueta}
                      </span>
                      <p className="num mt-1 text-[11px] text-muted-foreground">
                        Uso {f.uso.toFixed(0)} %
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-[12px] text-muted-foreground">
            {filas.length} líneas · {totalUnidades} unidades ·{" "}
            {conErrores > 0 ? `${conErrores} requieren revisión` : "sin pendientes"}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            {(["verde", "amarillo", "naranja", "rojo"] as const).map((s) => (
              <span key={s} className={`inline-flex items-center gap-1.5 ${semaforoInfo[s].clase}`}>
                <span aria-hidden>{semaforoInfo[s].icono}</span>
                {semaforoInfo[s].etiqueta}
              </span>
            ))}
          </div>
        </div>

        {mensaje && (
          <p
            role="status"
            className={`mt-3 rounded-lg px-3 py-2 text-[12px] ${
              conErrores > 0 ? "bg-over/10 text-over" : "bg-ok/10 text-ok"
            }`}
          >
            {mensaje}
          </p>
        )}
      </div>
    </AppLayout>
  );
}
