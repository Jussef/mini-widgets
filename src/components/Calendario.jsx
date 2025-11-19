import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarioSimple() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const mesActual = currentDate.getMonth();
  const añoActual = currentDate.getFullYear();

  const primerDiaMes = new Date(añoActual, mesActual, 1).getDay();
  const ultimoDiaMes = new Date(añoActual, mesActual + 1, 0).getDate();

  const cambiarMes = (direccion) => {
    const nuevaFecha = new Date(currentDate);
    nuevaFecha.setMonth(mesActual + direccion);
    setCurrentDate(nuevaFecha);
  };

  const generarDias = () => {
    const dias = [];

    for (let i = 0; i < primerDiaMes; i++) {
      dias.push(<div key={`vacio-${i}`} className="aspect-square"></div>);
    }

    for (let dia = 1; dia <= ultimoDiaMes; dia++) {
      const esHoy = dia === new Date().getDate() && mesActual === new Date().getMonth() && añoActual === new Date().getFullYear();

      dias.push(
        <div
          key={dia}
          className={`aspect-square flex items-center justify-center text-lg rounded-lg
            ${esHoy ? "bg-blue-600 text-white font-bold" : "bg-white text-gray-800 hover:bg-gray-300 cursor-pointer"}
            transition-colors duration-200`}
        >
          {dia}
        </div>,
      );
    }

    return dias;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => cambiarMes(-1)} className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <ChevronLeft size={32} className="text-gray-700" />
        </button>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          {meses[mesActual]} {añoActual}
        </h1>

        <button onClick={() => cambiarMes(1)} className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <ChevronRight size={32} className="text-gray-700" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
        {diasSemana.map((dia) => (
          <div key={dia} className="text-center font-semibold text-gray-600 text-sm md:text-lg py-2">
            {dia}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4 flex-1">{generarDias()}</div>
    </>
  );
}
