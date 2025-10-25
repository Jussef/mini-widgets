# Configuración de Firebase para Mini Widgets

## Pasos para configurar Firebase Realtime Database

### 1. Crear proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz click en "Crear un proyecto"
3. Ingresa el nombre de tu proyecto (ej: mini-widgets)
4. Configura Google Analytics (opcional)
5. Espera a que se cree el proyecto

### 2. Configurar Realtime Database
1. En la consola de Firebase, ve a "Realtime Database"
2. Haz click en "Crear base de datos"
3. Selecciona la ubicación (preferiblemente cerca de tus usuarios)
4. Comienza en modo de prueba (las reglas se pueden cambiar después)

### 3. Obtener configuración del proyecto
1. Ve a Configuración del proyecto (ícono de engranaje)
2. En la pestaña "General", baja hasta "Tus aplicaciones"
3. Haz click en "Agregar aplicación" y selecciona "Web" (ícono </>)
4. Registra tu aplicación con un nombre
5. Copia la configuración que aparece

### 4. Configurar variables de entorno
1. Renombra el archivo `.env.example` a `.env` (si existe) o edita el `.env` existente
2. Reemplaza los valores con tu configuración de Firebase:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu-api-key-aqui
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://tu-proyecto-default-rtdb.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456789
```

### 5. Instalar dependencias
```bash
npm install firebase
```

### 6. Configurar reglas de seguridad (Opcional)
En la consola de Firebase > Realtime Database > Reglas, puedes configurar:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Nota**: Las reglas anteriores son para desarrollo. En producción, implementa reglas más estrictas.

### 7. Probar la conexión
1. Ejecuta `npm run dev`
2. Ve a `/tareas`
3. Las tareas deberían cargarse y sincronizarse en tiempo real

## Características implementadas

✅ **Sincronización en tiempo real**: Los cambios se reflejan automáticamente en todas las pestañas/dispositivos  
✅ **Persistencia**: Las tareas se guardan en Firebase Realtime Database  
✅ **Estado de carga**: Indicador visual mientras cargan los datos  
✅ **Manejo de errores**: Console.log para debugging  
✅ **Datos iniciales**: Si no hay tareas, se crean algunas de ejemplo  

## Estructura de datos en Firebase

```json
{
  "tasks": {
    "-NabcDefGhiJklMnop": {
      "name": "Diseño de interfaz",
      "status": "activo",
      "createdAt": 1698181234567
    },
    "-NabcDefGhiJklMnpq": {
      "name": "Desarrollo backend", 
      "status": "pendiente",
      "createdAt": 1698181234568
    }
  }
}
```

## Notas importantes

- El archivo `.env` ya está incluido en `.gitignore` para mantener las credenciales seguras
- Las variables deben empezar con `VITE_` para que Astro las reconozca en el cliente
- Firebase se inicializa automáticamente al importar el componente
- Los IDs de las tareas son generados automáticamente por Firebase