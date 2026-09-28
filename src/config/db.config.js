import mongoose from 'mongoose';
import config from './env.config.js';

// Conexión a MongoDB. En esta etapa es opcional: si no hay MONGO_URL definida,
// el servidor arranca igual con la persistencia en memoria del DAO.
export async function conectarDB() {
  if (!config.mongoUrl) {
    console.warn('MONGO_URL no definida: se omite la conexión a MongoDB en esta etapa.');
    return false;
  }

  await mongoose.connect(config.mongoUrl);
  console.log('Conexión a MongoDB establecida.');
  return true;
}
