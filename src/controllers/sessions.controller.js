import { HttpError } from '../utils/errors.util.js';

// Controlador de sesiones. Define la interfaz de autenticación (registro,
// login, usuario actual, logout) que se implementará con bcrypt, Passport y
// JWT en las próximas entregas. Por ahora responde 501 Not Implemented.
export default class SessionsController {
  register = (req, res, next) => {
    return next(new HttpError(501, 'El registro de usuarios se implementará en la próxima entrega'));
  };

  login = (req, res, next) => {
    return next(new HttpError(501, 'El inicio de sesión se implementará en la próxima entrega'));
  };

  current = (req, res, next) => {
    return next(new HttpError(501, 'La consulta del usuario actual se implementará en la próxima entrega'));
  };

  logout = (req, res, next) => {
    return next(new HttpError(501, 'El cierre de sesión se implementará en la próxima entrega'));
  };
}
