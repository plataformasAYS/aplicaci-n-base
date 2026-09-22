// Datos de demostración para la primera iteración (sin backend).

export type Semaforo = "verde" | "amarillo" | "naranja" | "rojo";

export const UMBRAL_VARIACION = 20; // % configurable de "variación significativa"

export const semaforoInfo: Record<
  Semaforo,
  { etiqueta: string; icono: string; clase: string }
> = {
  verde: { etiqueta: "Dentro del tope", icono: "✓", clase: "text-ok" },
  amarillo: { etiqueta: "Cercano al límite", icono: "◐", clase: "text-warn" },
  naranja: { etiqueta: "Riesgo de exceso", icono: "▲", clase: "text-risk" },
  rojo: { etiqueta: "Excede el tope", icono: "■", clase: "text-over" },
};

export function evaluarTope(usoPorcentaje: number): Semaforo {
  if (usoPorcentaje <= 85) return "verde";
  if (usoPorcentaje <= 100) return "amarillo";
  if (usoPorcentaje <= 110) return "naranja";
  return "rojo";
}

export const cabeceraPedido = {
  consecutivo: "PED-2026-00841",
  cliente: "Servicios Integrales del Norte S.A.S.",
  nit: "900.145.882-1",
  centroServicio: "CS Bogotá Norte",
  codigoSucursal: "SUC-041",
  centroCostos: "CC-1180",
  centroOperacion: "OP-22",
  puntoEnvio: "Calle 100 # 19-54, Bogotá",
  tipoInsumo: "Aseo",
  tipoFacturacion: "Consumo",
  fechaPedido: "22 sep 2026",
  periodo: "Septiembre 2026",
};

export type LineaCatalogo = {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: "Aseo" | "EPP" | "Papelería";
  unidad: string;
  sugerida: number;
  existencias: number;
  consumoPromedio: number;
  transito: number;
  topeAutorizado: number;
  consumoPeriodo: number;
};

export const lineasPedido: LineaCatalogo[] = [
  {
    id: "l1",
    codigo: "ASE-4471",
    descripcion: "Detergente multiusos · garrafa 4 L",
    categoria: "Aseo",
    unidad: "Garrafa",
    sugerida: 120,
    existencias: 340,
    consumoPromedio: 118,
    transito: 60,
    topeAutorizado: 400,
    consumoPeriodo: 180,
  },
  {
    id: "l2",
    codigo: "EPP-2290",
    descripcion: "Guantes de nitrilo talla M · caja x 100",
    categoria: "EPP",
    unidad: "Caja",
    sugerida: 40,
    existencias: 25,
    consumoPromedio: 38,
    transito: 12,
    topeAutorizado: 90,
    consumoPeriodo: 45,
  },
  {
    id: "l3",
    codigo: "ASE-8812",
    descripcion: "Hipoclorito de sodio 5 % · 1 L",
    categoria: "Aseo",
    unidad: "Frasco",
    sugerida: 80,
    existencias: 12,
    consumoPromedio: 76,
    transito: 30,
    topeAutorizado: 150,
    consumoPeriodo: 70,
  },
  {
    id: "l4",
    codigo: "PAP-1055",
    descripcion: "Resma papel carta 75 g · 500 hojas",
    categoria: "Papelería",
    unidad: "Resma",
    sugerida: 15,
    existencias: 4,
    consumoPromedio: 16,
    transito: 0,
    topeAutorizado: 25,
    consumoPeriodo: 18,
  },
];

export const kpis = [
  {
    titulo: "Abastecimiento",
    valor: "94,2 %",
    detalle: "▲ 1,8 pts frente al período anterior",
    tono: "text-ok",
  },
  {
    titulo: "Inventarios",
    valor: "12.480",
    detalle: "◐ 3 productos por debajo del mínimo",
    tono: "text-warn",
  },
  {
    titulo: "Topes",
    valor: "7",
    detalle: "▲ 2 centros superaron el tope",
    tono: "text-risk",
  },
  {
    titulo: "Precisión",
    valor: "86,4 %",
    detalle: "▲ Dentro del objetivo (≥ 85 %)",
    tono: "text-ok",
  },
];

export const inventario = [
  { codigo: "ASE-4471", descripcion: "Detergente multiusos 4 L", disponible: 340, minimo: 120, seguridad: 60, conteo: "31 ago 2026" },
  { codigo: "EPP-2290", descripcion: "Guantes de nitrilo talla M", disponible: 25, minimo: 40, seguridad: 15, conteo: "31 ago 2026" },
  { codigo: "ASE-8812", descripcion: "Hipoclorito de sodio 1 L", disponible: 12, minimo: 60, seguridad: 25, conteo: "31 ago 2026" },
  { codigo: "PAP-1055", descripcion: "Resma papel carta 75 g", disponible: 4, minimo: 20, seguridad: 8, conteo: "31 ago 2026" },
];

export const transito = [
  { despacho: "DSP-3391", producto: "Detergente multiusos 4 L", cantidad: 60, estado: "En tránsito", entrega: "26 sep 2026" },
  { despacho: "DSP-3402", producto: "Guantes de nitrilo talla M", cantidad: 12, estado: "Despachado", entrega: "28 sep 2026" },
  { despacho: "DSP-3410", producto: "Hipoclorito de sodio 1 L", cantidad: 30, estado: "Pendiente", entrega: "02 oct 2026" },
];

export const topes = [
  { cliente: "Servicios Integrales del Norte", categoria: "Aseo", tope: 400, uso: 78, vigencia: "01 ene 2026 – 31 dic 2026", version: "v3" },
  { cliente: "Servicios Integrales del Norte", categoria: "EPP", tope: 90, uso: 94, vigencia: "01 ene 2026 – 31 dic 2026", version: "v2" },
  { cliente: "Servicios Integrales del Norte", categoria: "Papelería", tope: 25, uso: 118, vigencia: "01 jul 2026 – 31 dic 2026", version: "v1" },
];

export const alertas = [
  { tipo: "Riesgo de agotado", severidad: "Crítica", entidad: "Resma papel carta 75 g · CS Bogotá Norte", estado: "Nueva" },
  { tipo: "Consumo atípico", severidad: "Media", entidad: "Hipoclorito de sodio 1 L · CS Bogotá Norte", estado: "En gestión" },
  { tipo: "Inventario estancado", severidad: "Media", entidad: "Detergente multiusos 4 L · CS Medellín", estado: "Atendida" },
];

export const reportes = [
  "Consumo mensual",
  "Consumo histórico",
  "Análisis de inventarios",
  "Centros fuera de tope",
  "Sobrepedidos y subpedidos",
  "Inventario en tránsito",
  "Precisión de proyección",
];
