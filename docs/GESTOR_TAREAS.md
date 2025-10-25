# 📋 Gestor de Tareas - Widget

Un widget de gestión de tareas con persistencia en Firebase Realtime Database y sincronización en tiempo real.

## 🚀 Características

- ✅ **CRUD completo**: Crear, leer, actualizar y eliminar tareas
- 🔄 **Tiempo real**: Sincronización automática entre todas las sesiones
- 🎨 **Estados visuales**: 4 estados con códigos de color (Activo, Pendiente, Cambios, Entregado)
- ✏️ **Edición inline**: Haz click en el ícono de editar para cambiar nombres
- 📊 **Estadísticas**: Contador automático de tareas por estado
- 🔥 **Firebase**: Persistencia con Firebase Realtime Database
- 📱 **Responsive**: Funciona perfecto en desktop, tablet y móvil
- ⚡ **Performance**: Carga rápida con indicador de loading

## 🎯 Casos de uso

### Para equipos de desarrollo
- Trackear el estado de features en desarrollo
- Seguimiento de bugs y su resolución
- Gestión de tareas de sprint

### Para equipos de marketing
- Estado de campañas publicitarias
- Seguimiento de contenido en creación
- Gestión de proyectos de branding

### Para uso personal
- Lista de tareas diarias
- Proyectos personales
- Seguimiento de metas

## 🔗 Integración como iframe

### Notion
```markdown
/embed
https://tu-dominio.com/tareas
```

### Monday.com
1. Agregar widget "Embed"
2. URL: `https://tu-dominio.com/tareas`
3. Tamaño recomendado: 800x600px

### HTML General
```html
<iframe 
  src="https://tu-dominio.com/tareas" 
  width="100%" 
  height="600" 
  frameborder="0"
  title="Gestor de Tareas">
</iframe>
```

### Confluence
```html
<ac:structured-macro ac:name="iframe">
  <ac:parameter ac:name="src">https://tu-dominio.com/tareas</ac:parameter>
  <ac:parameter ac:name="width">100%</ac:parameter>
  <ac:parameter ac:name="height">600</ac:parameter>
</ac:structured-macro>
```

## ⚙️ Estados de tareas

| Estado | Color | Descripción |
|--------|--------|-------------|
| **Activo** | 🔵 Azul | Tareas en progreso activo |
| **Pendiente** | 🟡 Amarillo | Tareas por iniciar |
| **Cambios** | 🟠 Naranja | Tareas que requieren modificaciones |
| **Entregado** | 🟢 Verde | Tareas completadas |

## 🛠️ Stack técnico

- **Frontend**: React 19 + Astro 5
- **Estilos**: Tailwind CSS 4
- **Base de datos**: Firebase Realtime Database
- **Iconos**: Lucide React
- **Deploy**: Compatible con Vercel, Netlify, etc.

## 💾 Estructura de datos

```json
{
  "tasks": {
    "-firebase-generated-id": {
      "name": "Nombre de la tarea",
      "status": "activo|pendiente|cambios|entregado",
      "createdAt": 1698181234567
    }
  }
}
```

## 🔒 Seguridad

- Variables de entorno para credenciales de Firebase
- Archivo `.env` incluido en `.gitignore`
- Reglas de Firebase configurables por proyecto

## 📈 Próximas mejoras

- [ ] Asignación de usuarios a tareas
- [ ] Fechas de vencimiento
- [ ] Prioridades de tareas
- [ ] Filtros y búsqueda
- [ ] Exportar a CSV/Excel
- [ ] Notificaciones push
- [ ] Tema oscuro
- [ ] Drag & drop para reordenar

---

**Versión**: 1.0.0 con Firebase  
**Última actualización**: Octubre 2025