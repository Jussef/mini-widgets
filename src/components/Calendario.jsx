import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../lib/supabase";

export default function CalendarioSimple() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notas, setNotas] = useState({});

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const mesActual = currentDate.getMonth();
  const añoActual = currentDate.getFullYear();

  const primerDiaMes = new Date(añoActual, mesActual, 1).getDay();
  const ultimoDiaMes = new Date(añoActual, mesActual + 1, 0).getDate();

  useEffect(() => {
    cargarNotas();
  }, [mesActual, añoActual]);

  const cargarNotas = async () => {
    try {
      const primerDia = new Date(añoActual, mesActual, 1);
      const ultimoDia = new Date(añoActual, mesActual + 1, 0);

      const { data, error } = await supabase
        .from('calendar_notes')
        .select('*')
        .gte('fecha', primerDia.toISOString().split('T')[0])
        .lte('fecha', ultimoDia.toISOString().split('T')[0]);

      if (error) throw error;

      const notasMap = {};
      data?.forEach(nota => {
        const dia = new Date(nota.fecha).getDate();
        notasMap[dia] = {
          nota: nota.nota,
          updated_at: nota.updated_at
        };
      });
      setNotas(notasMap);
    } catch (error) {
      console.error('Error cargando notas:', error);
    }
  };

  const cambiarMes = (direccion) => {
    const nuevaFecha = new Date(currentDate);
    nuevaFecha.setMonth(mesActual + direccion);
    setCurrentDate(nuevaFecha);
  };

  const manejarClickDia = async (dia) => {
    const fechaSeleccionada = `${añoActual}-${String(mesActual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const notaExistente = notas[dia]?.nota || '';

    const { value: nuevaNota } = await Swal.fire({
      title: `${dia} de ${meses[mesActual]} ${añoActual}`,
      input: 'textarea',
      inputLabel: 'Nota del día',
      inputValue: notaExistente,
      inputPlaceholder: 'Escribe tu nota aquí...',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      inputAttributes: {
        'aria-label': 'Nota del día'
      }
    });

    if (nuevaNota !== undefined) {
      await guardarNota(fechaSeleccionada, dia, nuevaNota);
    }
  };

  const guardarNota = async (fecha, dia, nota) => {
    try {
      if (!nota.trim()) {
        // Si la nota está vacía, eliminarla
        const { error } = await supabase
          .from('calendar_notes')
          .delete()
          .eq('fecha', fecha);

        if (error) throw error;

        const nuevasNotas = { ...notas };
        delete nuevasNotas[dia];
        setNotas(nuevasNotas);
      } else {
        // Guardar o actualizar la nota
        const updatedAt = new Date().toISOString();
        const { error } = await supabase
          .from('calendar_notes')
          .upsert({
            fecha: fecha,
            nota: nota,
            updated_at: updatedAt
          }, {
            onConflict: 'fecha'
          });

        if (error) throw error;

        setNotas({
          ...notas,
          [dia]: {
            nota: nota,
            updated_at: updatedAt
          }
        });
      }
    } catch (error) {
      console.error('Error guardando nota:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la nota. Intenta de nuevo.',
        heightAuto: false
      });
    }
  };

  const generarDias = () => {
    const dias = [];

    for (let i = 0; i < primerDiaMes; i++) {
      dias.push(<div key={`vacio-${i}`}></div>);
    }

    for (let dia = 1; dia <= ultimoDiaMes; dia++) {
      const esHoy = dia === new Date().getDate() && mesActual === new Date().getMonth() && añoActual === new Date().getFullYear();
      const notaInfo = notas[dia];
      const tieneNota = notaInfo?.nota;

      // Verificar si la nota es nueva (creada o actualizada en las últimas 24 horas)
      const esNotaNueva = notaInfo?.updated_at &&
        (new Date() - new Date(notaInfo.updated_at)) < 24 * 60 * 60 * 1000;

      let bgColor = "bg-white";
      let hoverColor = "hover:bg-gray-300";
      let textColor = "text-gray-800";

      if (esHoy) {
        bgColor = "bg-blue-600";
        textColor = "text-white font-bold";
        hoverColor = "hover:bg-blue-300";
      } else if (tieneNota) {
        bgColor = "bg-blue-50";
        hoverColor = "hover:bg-blue-100";
      }

      dias.push(
        <div
          key={dia}
          className={`w-full h-full min-h-[2rem] flex items-center justify-center text-sm md:text-base rounded-lg relative
            ${bgColor} ${textColor} ${hoverColor} cursor-pointer
            transition-colors duration-200`}
          onClick={() => manejarClickDia(dia)}
        >
          <span>{dia}</span>
          {tieneNota && (
            <div className={`absolute top-0.5 right-0.5 w-4 h-2 rounded-full
              ${esHoy ? "bg-yellow-400" : esNotaNueva ? "bg-orange-500" : "bg-blue-500"}`}
            ></div>
          )}
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
