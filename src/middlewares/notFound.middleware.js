// Se ejecuta cuando ninguna ruta coincidió con la petición
export function notFound(req, res) {
  return res.status(404).json({
    status: 'error',
    error: `Ruta ${req.method} ${req.originalUrl} no encontrada`,
  });
}
