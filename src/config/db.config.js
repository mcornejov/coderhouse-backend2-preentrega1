import mongoose from 'mongoose';
import config from './env.config.js';

// Conexión a MongoDB. En esta etapa la base es opcional: si MONGO_URL no está
// definida o la conexión falla, el servidor arranca igual con la persistencia
// en memoria del DAO. Cuando se integre la persistencia real, un fallo de
// conexión deberá detener el arranque (Fail-Fast).
export async function conectarDB() {
  if (!config.mongoUrl) {
    console.warn('MONGO_URL no definida: se omite la conexión a MongoDB en esta etapa.');
    return false;
  }

  try {
    await mongoose.connect(config.mongoUrl, { serverSelectionTimeoutMS: 5000 });
    console.log('Conexión a MongoDB establecida.');
    return true;
  } catch (error) {
    console.warn(`No fue posible conectar a MongoDB (${error.message}). El servidor continúa sin base de datos.`);
    return false;
  }
}
