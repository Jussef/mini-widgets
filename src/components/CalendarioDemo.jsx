import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

export default function CalendarioDemo() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Datos hardcodeados de ejemplo - notas para el mes actual
  const getNotasDemo = () => {
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const añoActual = hoy.getFullYear();

    // Solo mostrar notas si estamos en el mes actual
    if (currentDate.getMonth() === mesActual && currentDate.getFullYear() === añoActual) {
      const notasDemo = {};
      const diaHoy = hoy.getDate();

      // Agregar algunas notas de ejemplo
      if (diaHoy >= 5) {
        notasDemo[5] = {
          nota: "Reunión de equipo a las 10:00 AM\n\n• Revisar progreso del proyecto\n• Discutir próximas entregas\n• Asignar nuevas tareas",
          updated_at: new Date(añoActual, mesActual, 5, 9, 0).toISOString()
        };
      }

      if (diaHoy >= 12) {
        notasDemo[12] = {
          nota: "Presentación de resultados del Q4\n\nPreparar slides con:\n- Métricas clave\n- Logros principales\n- Objetivos para el siguiente trimestre",
          updated_at: new Date(añoActual, mesActual, 12, 14, 30).toISOString()
        };
      }

      if (diaHoy >= 15) {
        notasDemo[15] = {
          nota: "📝 Deadline del proyecto Alpha\n\nPendientes:\n✓ Tests unitarios\n✓ Documentación\n✗ Code review final",
          updated_at: new Date(añoActual, mesActual, 15, 11, 15).toISOString()
        };
      }

      // Nota para hoy
      notasDemo[diaHoy] = {
        nota: "Esta es una nota de ejemplo para hoy.\n\n¡Prueba a editarla! Los cambios solo estarán disponibles durante esta sesión de demo.",
        updated_at: new Date().toISOString()
      };

      // Nota futura (mañana si no es fin de mes)
      if (diaHoy < 28) {
        const mañana = diaHoy + 1;
        notasDemo[mañana] = {
          nota: "Recordatorio para mañana:\n• Revisar emails pendientes\n• Llamada con cliente a las 3 PM",
          updated_at: new Date(añoActual, mesActual, mañana - 2).toISOString()
        };
      }

      return notasDemo;
    }

    return {};
  };

  const [notas, setNotas] = useState(getNotasDemo());

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
    // Actualizar notas cuando cambiamos de mes
    setNotas(getNotasDemo());
  };

  const manejarClickDia = async (dia) => {
    const notaExistente = notas[dia]?.nota || '';

    if (notaExistente) {
      // Si ya existe una nota, mostrar primero el texto
      const resultado = await Swal.fire({
        title: `${dia} de ${meses[mesActual]} ${añoActual}`,
        html: `<div style="text-align: left; white-space: pre-wrap; max-height: 400px; overflow-y: auto; padding: 10px; background: #f9fafb; border-radius: 8px;">${notaExistente}</div>`,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cerrar',
        heightAuto: false,
        width: '90%',
        customClass: {
          popup: 'swal-wide'
        }
      });

      if (resultado.isConfirmed) {
        // Si presiona "Editar", abrir el textarea
        await abrirEditorNota(dia, notaExistente);
      }
    } else {
      // Si no hay nota, abrir directamente el editor
      await abrirEditorNota(dia, '');
    }
  };

  const abrirEditorNota = async (dia, notaExistente) => {
    const { value: nuevaNota } = await Swal.fire({
      title: `${dia} de ${meses[mesActual]} ${añoActual}`,
      input: 'textarea',
      inputLabel: 'Nota del día (Demo)',
      inputValue: notaExistente,
      inputPlaceholder: 'Escribe tu nota aquí... (solo se guardará en esta sesión)',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      width: '90%',
      inputAttributes: {
        'aria-label': 'Nota del día',
        style: 'min-height: 150px;'
      },
      customClass: {
        popup: 'swal-wide'
      }
    });

    if (nuevaNota !== undefined) {
      guardarNota(dia, nuevaNota);
    }
  };

  const guardarNota = (dia, nota) => {
    if (!nota.trim()) {
      // Si la nota está vacía, eliminarla
      const nuevasNotas = { ...notas };
      delete nuevasNotas[dia];
      setNotas(nuevasNotas);
    } else {
      // Guardar o actualizar la nota (solo en memoria)
      const updatedAt = new Date().toISOString();
      setNotas({
        ...notas,
        [dia]: {
          nota: nota,
          updated_at: updatedAt
        }
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
        bgColor = "bg-orange-50";
        hoverColor = "hover:bg-blue-100";
      }

      dias.push(
        <div
          key={dia}
          className={`w-full h-full min-h-[2rem] flex flex-col items-center justify-center text-sm md:text-base rounded-lg relative
            ${bgColor} ${textColor} ${hoverColor} cursor-pointer
            transition-colors duration-200`}
          onClick={() => manejarClickDia(dia)}
        >
          <span>{dia}</span>
          {tieneNota && (
            <div className={`w-4 h-2 rounded-full mt-1
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
          {meses[mesActual]} {añoActual} <span className="text-sm text-gray-500">(Demo)</span>
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
