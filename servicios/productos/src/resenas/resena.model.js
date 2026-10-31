import mongoose from 'mongoose';

const resenaSchema = new mongoose.Schema({
  productoId: { type: Number, required: true },
  autor: { type: String, required: true },
  condicion: { 
    type: String, 
    enum: ['Diabético', 'Celiaco', 'Intolerante a Lactosa', 'General'],
    default: 'General'
  },
  comentario: { type: String, required: true },
  estrellas: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true });

export const Resena = mongoose.model('Resena', resenaSchema);
