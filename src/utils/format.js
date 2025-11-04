export const formatFecha = (fecha, delimitador='-') => {
    return fecha.slice(0, 10).split("-")/* .reverse() */.join(delimitador);
}

export const formatId = (id, numPad=3) => {
    return `#${id.toString().padStart(numPad, '0') }`;
}

export const formatNombreTecnico = (nombre, paterno, materno) => {
    return `${nombre} ${paterno[0]}. ${materno[0]}.`
}

export const formatNombre = (nombre, paterno, materno) => {
  return `${nombre} ${paterno[0]}. ${materno[0]}.`;
};
