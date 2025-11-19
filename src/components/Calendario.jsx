import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

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
      dias.push(<div key={`vacio-${i}`}></div>);
    }

    for (let dia = 1; dia <= ultimoDiaMes; dia++) {
      const esHoy = dia === new Date().getDate() && mesActual === new Date().getMonth() && añoActual === new Date().getFullYear();

      dias.push(
        <div
          key={dia}
          className={`w-full h-full min-h-[2rem] flex items-center justify-center text-sm md:text-base rounded-lg
            ${esHoy ? "bg-blue-600 text-white font-bold hover:bg-blue-300 cursor-pointer" : "bg-white text-gray-800 hover:bg-gray-300 cursor-pointer"}
            transition-colors duration-200`}
            onClick={() => Swal.fire({
              title: `Día ${dia} de ${meses[mesActual]} ${añoActual}`,
              text: 'Aquí puedes agregar eventos o notas para este día.',
              icon: 'info',
              confirmButtonText: 'Cerrar',
            })}
        >
          {dia}
        </div>,
      );
    }

    return dias;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => cambiarMes(-1)} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {meses[mesActual]} {añoActual}
        </h1>

        <button onClick={() => cambiarMes(1)} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <ChevronRight size={24} className="text-gray-700" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
        {diasSemana.map((dia) => (
          <div key={dia} className="text-center font-semibold text-gray-600 text-xs md:text-sm py-1">
            {dia}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 flex-1 auto-rows-fr max-h-full overflow-hidden">{generarDias()}</div>
    </div>
  );
}
