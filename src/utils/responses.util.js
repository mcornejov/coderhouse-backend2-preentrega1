// Helpers de respuesta para mantener un formato uniforme en toda la API.
export function responderExito(res, payload, status = 200) {
  return res.status(status).json({ status: 'success', payload });
}

export function responderCreado(res, payload) {
  return responderExito(res, payload, 201);
}
