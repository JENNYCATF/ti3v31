'use client';

import { useEffect, useState } from 'react';
import ListaInscripciones from './components/ListaInscripciones';

export default function Home() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resInsc, resTall] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
        ]);

        const dataInsc = await resInsc.json();
        const dataTall = await resTall.json();

        dataInsc.shift()
        dataTall.shift()
        console.log(dataInsc)
        console.log(dataTall)

        const inscripcionesFormateadas = Object.entries(dataInsc || {}).map(([id, insc]) => {
          const taller = dataTall?.[insc.taller] || {};
          return {
            id,
            nombre: insc.nombre,
            email: insc.correo,
            taller: {
              nombre: taller.nombre || "No disponible",
              descripcion: taller.descripcion || "Sin descripción",
              profesor: taller.profesor || "Sin profesor",
            },
          };
        });

        setInscripciones(inscripcionesFormateadas);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-green-800">
        Inscripciones a Talleres - Raíces Digitales
      </h1>
      <ListaInscripciones inscripciones={inscripciones} cargando={cargando} />
    </main>
  );
}

