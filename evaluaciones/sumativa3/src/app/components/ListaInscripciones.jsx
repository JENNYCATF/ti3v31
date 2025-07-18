import React from 'react';
import InscripcionCard from './InscripcionCard';

const ListaInscripciones = ({ inscripciones, cargando }) => {
  if (cargando) return <p className="text-center mt-4">Cargando datos...</p>;
  if (inscripciones.length === 0)
    return <p className="text-center mt-4 text-gray-500">No hay inscripciones disponibles.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {inscripciones.map((insc, index) => (
        <InscripcionCard key={index} inscripcion={insc} />
      ))}
    </div>
  );
};

export default ListaInscripciones;