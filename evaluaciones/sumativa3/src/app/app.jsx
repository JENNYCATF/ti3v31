import React, { useEffect, useState } from 'react';
import ListaInscripciones from './components/ListaInscripciones';

function App() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resInscripciones = await fetch('https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json');
        const resTalleres = await fetch('https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json');

        const dataInscripciones = await resInscripciones.json();
        const dataTalleres = await resTalleres.json();

        // Combinar inscripciones con datos de taller
        const inscripcionesCombinadas = Object.values(dataInscripciones).map((inscripcion) => {
          const taller = dataTalleres[inscripcion.tallerId];
          return {
            ...inscripcion,
            taller: taller || null,
          };
        });

        setInscripciones(inscripcionesCombinadas);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-900">Listado de Inscripciones</h1>
      <ListaInscripciones inscripciones={inscripciones} cargando={cargando} />
    </div>
  );
}

export default App;