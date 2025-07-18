import React from 'react';

const InscripcionCard = ({ inscripcion }) => {
  if (!inscripcion.taller) return null;

  return (
    <div className="mb-4 shadow-md p-4 bg-white rounded-2xl">
      <h2 className="text-xl font-semibold text-green-800">{inscripcion.nombre}</h2>
      <p className="text-gray-600">{inscripcion.email}</p>
      <hr className="my-2" />
      <h3 className="text-lg font-bold text-green-700">Taller: {inscripcion.taller.nombre}</h3>
      <p className="text-gray-700">{inscripcion.taller.descripcion}</p>
      <p className="mt-1 text-sm text-gray-500">Profesor: {inscripcion.taller.profesor}</p>
    </div>
  );
};

export default InscripcionCard;



