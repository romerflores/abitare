export const determinarColorEstado = (estado) => {
  if (estado.toLowerCase() == "pendiente") return "pendiente";
  if (estado.toLowerCase() == "en proceso") return "asignado";
  if (estado.toLowerCase() == "resuelto") return "bajo";
};

export const determinarColorPrioridad = (estado) => {
  if (estado.toLowerCase() == "urgente") return "urgente";
  if (estado.toLowerCase() == "normal") return "medio";
  if (estado.toLowerCase() == "baja") return "bajo";
};
