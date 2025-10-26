# Funcionalidad de Listas de Tareas por ID

## Configuración de la Base de Datos

Para que funcione correctamente la funcionalidad de listas independientes por ID, necesitas actualizar tu tabla en Supabase:

### 1. Ejecutar el script SQL

Ve al **SQL Editor** en tu panel de Supabase y ejecuta el siguiente código:

```sql
-- Agregar la columna list_id a la tabla existente
ALTER TABLE tasks ADD COLUMN list_id VARCHAR(255) DEFAULT 'default';

-- Actualizar las tareas existentes para que tengan list_id 'default'
UPDATE tasks SET list_id = 'default' WHERE list_id IS NULL;

-- Hacer que list_id sea NOT NULL
ALTER TABLE tasks ALTER COLUMN list_id SET NOT NULL;

-- Crear un índice en list_id para mejorar el rendimiento
CREATE INDEX idx_tasks_list_id ON tasks(list_id);
```

### 2. Verificar la estructura

Después de ejecutar el script, tu tabla `tasks` debe tener la siguiente estructura:

- `id` (bigint, primary key)
- `created_at` (timestamp)
- `name` (text)
- `status` (text)
- `list_id` (varchar) **← Nueva columna**

## Cómo usar

### URLs disponibles:

1. **Lista por defecto**: `http://localhost:4321/tareas/default`
2. **Lista personalizada**: `http://localhost:4321/tareas/[cualquier-id]`

### Ejemplos:

- `http://localhost:4321/tareas/personal` - Lista personal
- `http://localhost:4321/tareas/trabajo` - Lista de trabajo
- `http://localhost:4321/tareas/54764` - Lista con ID 54764
- `http://localhost:4321/tareas/proyecto-alpha` - Lista del proyecto alpha

### Página de navegación:

- `http://localhost:4321/listas` - Página para navegar entre listas

## Características:

- ✅ Cada ID genera una lista completamente independiente
- ✅ Las tareas se filtran automáticamente por `list_id`
- ✅ Puedes crear tantas listas como quieras
- ✅ URLs amigables y personalizables
- ✅ Compatibilidad con la funcionalidad existente

## Funcionamiento:

1. Cuando accedes a `/tareas/[id]`, el sistema:
   - Captura el ID de la URL
   - Filtra las tareas por ese `list_id`
   - Crea nuevas tareas con ese `list_id`

2. Si una lista no existe, se crea automáticamente cuando agregas la primera tarea.

3. Las listas son completamente independientes entre sí.