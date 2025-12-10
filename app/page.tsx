"use client";
import "@/styles/globals.css";


import { useState } from "react";
import {
  Input,
  Button,
  Card,
  Select,
  SelectItem,
  Textarea
} from "@heroui/react";

// TIPOS PARA EVITAR ERRORES

type DatosUsuario = {
  cuenta: string;
  nombre: string;
  telefono: string;
  historial: string[];
};


const categorias = [
  { key: "pánico", label: "Pánico" },
  { key: "acompañamiento virtual", label: "Acompañamiento Virtual" },
  { key: "jurídico", label: "Jurídico" },
  { key: "atención médica", label: "Atención Médica" },
  { key: "atención sexual", label: "Atención Sexual" },
  { key: "psicológica", label: "Psicológica" },
  { key: "violencia doméstica", label: "Violencia Doméstica" },
  { key: "llamadas de prueba", label: "Llamadas de Prueba" },
  { key: "estoy aquí", label: "Estoy Aquí" },
  { key: "usuario no responde", label: "Usuario no responde" },
  { key: "fuera de cobertura", label: "Fuera de cobertura" },
  { key: "seguimiento", label: "Seguimiento" },
];


const colonias = [
  { key: "jatdines de morelos", label: "Jardines de Morelos" },
  { key: "las américas", label: "Las Américas" },
  { key: "san cristobal", label: "San Cristobal" },
  { key: "la loma", label: "La Loma" },
];

export default function HomePage() {
  const [datos, setDatos] = useState<DatosUsuario | null>(null);
  const [categoria, setCategoria] = useState<string>("");
  const [colonia, setColonia] = useState<string>("");
  const [seguimiento, setSeguimiento] = useState("");

  // Datos de prueba
  const datosPrueba: DatosUsuario = {
    cuenta: "XZ8G",
    nombre: "Lorena",
    telefono: "561317748",
    historial: [
      "2025-06-16 10:55:10: USUARIA REALIZANDO PRUEBA",
      "2025-06-16 09:19:34: usuario activa alerta, protocolo correspondiente.",
    ],
  };

  const buscar = () => {
    setDatos(datosPrueba);
  };

 
  // AGREGAR SEGUIMIENTO AL HISTORIAL EN TIEMPO REAL
  
  const guardarSeguimiento = () => {
    if (!seguimiento.trim()) return;

    const nuevoRegistro =
      `${new Date().toISOString().slice(0, 19).replace("T", " ")}: ${seguimiento}`;

    setDatos((prev) =>
      prev
        ? {
            ...prev,
            historial: [...prev.historial, nuevoRegistro],
          }
        : prev
    );

    setSeguimiento("");
  };

  return (
    <div className="flex flex-col items-center pt-28 min-h-screen bg-purple-100/50">

      

     
      <Card className="w-full max-w-4xl p-8 shadow-lg bg-white/70">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          Registro llamadas
        </h1>

        <div className="flex gap-3">
          <Input
            type="text"
            label="Buscar número, nombre o cuenta"
            placeholder="5512345678 / XZ8G"
            className="flex-1"
          />
          <Button color="secondary" onPress={buscar}>
            Buscar
          </Button>
        </div>
      </Card>

    
      {datos && (
        <Card className="w-full max-w-4xl mt-10 p-6 bg-white/80 shadow-lg">

          <h2 className="text-2xl font-bold text-purple-700 mb-4">Datos del usuario</h2>

          <p><strong>Cuenta:</strong> {datos.cuenta}</p>
          <p><strong>Nombre:</strong> {datos.nombre}</p>
          <p><strong>Teléfono:</strong> {datos.telefono}</p>

          <h3 className="text-xl font-semibold mt-4">Historial:</h3>
          <div className="bg-gray-100 p-3 rounded mt-2">
            {datos.historial.map((h, i) => (
              <p key={i} className="text-sm">{h}</p>
            ))}
          </div>

          {/* SELECTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            
            <Select
              label="Categoría"
              placeholder="Selecciona una categoría"
              selectedKeys={categoria ? [categoria] : []}
              onSelectionChange={(keys) => setCategoria(Array.from(keys)[0] as string)}
            >
              {categorias.map((item) => (
                <SelectItem key={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>

           
            <Select
              label="Colonia"
              placeholder="Selecciona una colonia"
              selectedKeys={colonia ? [colonia] : []}
              onSelectionChange={(keys) => setColonia(Array.from(keys)[0] as string)}
            >
              {colonias.map((item) => (
                <SelectItem key={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>

        
          <div className="mt-6">
            <Textarea
              label="Observaciones / seguimiento"
              placeholder="Escribe aquí el seguimiento..."
              minRows={4}
              value={seguimiento}
              onChange={(e) => setSeguimiento(e.target.value)}
            />
          </div>

          
          <Button
            className="mt-6 w-40 mx-auto"
            color="secondary"
            onPress={guardarSeguimiento}
          >
            Guardar
          </Button>
        </Card>
      )}
    </div>
  );
}
