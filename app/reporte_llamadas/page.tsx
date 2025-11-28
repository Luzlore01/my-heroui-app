"use client";

import { Input, Button, Card } from "@heroui/react";
import Image from "next/image";
import React from "react";
import {DateRangePicker} from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@heroui/react";


export default function HomePage() {

  
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  // DATOS DE PRUEBA 
  const data = [
    {
      key: "1",
      fecha: "2025-11-04 10:04:43",
      folio: "Y5K1",
      nombre: "VERÓNICA SÁNCHEZ",
      numero: "558523229",
      colonia: "Jardines de Morelos",
      categoria: "Llamada de prueba",
      observaciones: "QUE NOS ENTRO EN UNA LLAMADA DONDE LA USUARIA SE ENCUENTRA CON SU AGRESOR Y ESTA SIENDO GOLPEADA CALLE GARDENIAS M113 LOTE 20 COLONIA AMPLIACION TULPETLAC REFERENCIA CERCA DEL CENTRO DE SALUD Y LA CALLE RIO BRAVO",
      operador: "	RV0012",
    },
    {
      key: "2",
      fecha: "2025-11-04 12:08:05",
      folio: "Y52W",
      nombre: "LORENA SEGURA",
      numero: "5624935535",
      colonia: "Jardines de Morelos",
      categoria: "Llamada de prueba",
      observaciones: "QUE NOS ENTRO EN UNA LLAMADA DONDE LA USUARIA SE ENCUENTRA CON SU AGRESOR Y ESTA SIENDO GOLPEADA CALLE GARDENIAS M113 LOTE 20 COLONIA AMPLIACION TULPETLAC REFERENCIA CERCA DEL CENTRO DE SALUD Y LA CALLE RIO BRAVO",
      operador: "	RV0012",
    }
    // LOS DEMÁS AQUÍ
  ];

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);


  return (
  <div className="flex flex-col items-center pt-28 min-h-screen bg-gradient-to-b from-purple-100/95 to-white/95">

      
      <DateRangePicker
  className="max-w-lg"
  color="secondary"
  description="Por favor introduce la fecha inicial y final de tu busqueda"
  label="Fecha a buscar"
/>


<div className="relative w-full max-w-6xl mt-10">

 
  <Image
    src="/mnt/data/Captura de pantalla 2025-11-24 134936.png"
    alt="Logo transparente"
    width={1200}
    height={1200}
    className="absolute inset-0 w-full opacity-10 pointer-events-none select-none"
  />


  <div className="relative bg-white/70 backdrop-blur-lg shadow-xl p-6 rounded-xl">
   <h2 className="text-3xl font-bold text-purple-700 mb-6">Detalle</h2>
    <Table
      aria-label="Tabla de llamadas"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="fecha">Fecha</TableColumn>
        <TableColumn key="folio">Folio</TableColumn>
        <TableColumn key="nombre">Nombre</TableColumn>
        <TableColumn key="numero">Número</TableColumn>
        <TableColumn key="colonia">Colonia</TableColumn>
        <TableColumn key="categoria">Categoría</TableColumn>
        <TableColumn key="observaciones">Observaciones</TableColumn>
        <TableColumn key="operador">Operador</TableColumn>
        <TableColumn key="acciones">Acciones</TableColumn>
      </TableHeader>

      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "acciones" ? (
                <Button color="secondary" variant="ghost" className="px-4 py-1 bg-pink-300 hover:bg-pink-400 text-white rounded-md"> Agregar seguimiento</Button>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
</div>

{/* RESUMEN */}
<div className="w-full max-w-6xl mt-20 bg-white/70 shadow-lg backdrop-blur-md p-8 rounded-lg">
  <h2 className="text-3xl font-bold text-purple-700 mb-6">Resumen</h2>

  <Table aria-label="Resumen de categorías">
    <TableHeader>
      <TableColumn>Categoría</TableColumn>
      <TableColumn>Cantidad</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell>Acompañamientos virtuales</TableCell><TableCell>134</TableCell></TableRow>
      <TableRow><TableCell>Llamada de prueba</TableCell><TableCell>7</TableCell></TableRow>
      <TableRow><TableCell>Pánico</TableCell><TableCell>1</TableCell></TableRow>
      <TableRow><TableCell>Transferido a jurídico</TableCell><TableCell>1</TableCell></TableRow>
      <TableRow><TableCell>Transferido a Psicológica</TableCell><TableCell>1</TableCell></TableRow>
      <TableRow><TableCell>Violencia doméstica</TableCell><TableCell>1</TableCell></TableRow>
    </TableBody>
  </Table>
</div>


     
    </div>

    
  );
}
