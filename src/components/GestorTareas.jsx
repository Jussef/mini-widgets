import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Diseño de interfaz', status: 'activo' },
    { id: 2, name: 'Desarrollo backend', status: 'pendiente' },
    { id: 3, name: 'Revisión de código', status: 'cambios' },
    { id: 4, name: 'Documentación API', status: 'entregado' }
  ]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const statusConfig = {
    activo: { label: 'Activo', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    pendiente: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    cambios: { label: 'Cambios', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    entregado: { label: 'Entregado', color: 'bg-green-100 text-green-700 border-green-300' }
  };

  const addTask = () => {
    if (newTaskName.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        name: newTaskName,
        status: 'pendiente'
      }]);
      setNewTaskName('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingName(task.name);
  };

  const saveEdit = (id) => {
    if (editingName.trim()) {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, name: editingName } : task
      ));
    }
    setEditingId(null);
    setEditingName('');
  };

  return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white">Gestor de Tareas</h1>
            <p className="text-indigo-100 mt-1">Organiza y monitorea el estado de tus tareas</p>
          </div>

          {/* Add Task Form */}
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Nombre de la nueva tarea..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={addTask}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="text-left p-4 font-semibold text-slate-700">Tarea</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Estado</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center p-8 text-slate-400">
                      No hay tareas. ¡Agrega una para comenzar!
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="p-4">
                        {editingId === task.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onBlur={() => saveEdit(task.id)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                            className="w-full px-3 py-1 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            autoFocus
                          />
                        ) : (
                          <span className="text-slate-700 font-medium">{task.name}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <select
                          value={task.status}
                          onChange={(e) => updateStatus(task.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border cursor-pointer transition ${statusConfig[task.status].color}`}
                        >
                          {Object.entries(statusConfig).map(([key, config]) => (
                            <option key={key} value={key}>{config.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => startEditing(task)}
                            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex gap-4 justify-center flex-wrap">
              {Object.entries(statusConfig).map(([status, config]) => {
                const count = tasks.filter(t => t.status === status).length;
                return (
                  <div key={status} className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-slate-600 font-semibold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  );
};

export default TaskManager;