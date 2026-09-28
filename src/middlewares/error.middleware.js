import { HttpError } from '../utils/errors.util.js';

// Manejador global de errores. Traduce los errores de la aplicación a códigos
// HTTP y evita filtrar detalles internos del servidor al cliente.
export function errorHandler(error, req, res, next) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ status: 'error', error: error.message });
  }

  // express.json() lanza este error cuando el body no es JSON válido
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'error', error: 'El cuerpo de la petición no es un JSON válido' });
  }

  // Express lanza URIError al decodificar una URL con caracteres mal codificados
  if (error instanceof URIError) {
    return res.status(400).json({ status: 'error', error: 'La URL contiene caracteres mal codificados' });
  }

  console.error(error);
  return res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
}
