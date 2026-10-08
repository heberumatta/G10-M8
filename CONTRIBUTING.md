# Guía de Contribución y Onboarding - Grupo 10 (Módulo 8)

¡Bienvenidos al equipo! Esta guía está preparada para que los **9 integrantes** puedan configurar su entorno de desarrollo rápidamente, conectarse a la base de datos cloud en **Supabase** y colaborar de manera fluida con Git y GitHub.

---

## 1. Requisitos Previos

- **Node.js**: Versión 20 LTS o superior ([Descargar Node.js](https://nodejs.org/)).
- **Git**: Configurado en tu equipo con tu nombre y correo de GitHub.
- **Cuenta de GitHub**: Con acceso de colaborador al repositorio `heberumatta/G10-M8`.

> [!NOTE]
> **¿Hace falta tener Docker instalado?**  
> **No es obligatorio para la base de datos.** Usamos **Supabase Cloud**, por lo que todos nos conectamos a la misma base de datos en la nube sin necesidad de levantar contenedores locales de PostgreSQL. Docker solo es opcional si deseas levantar localmente RabbitMQ, Redis o Mailpit.

---

## 2. Puesta en Marcha Inicial (Paso a Paso)

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/heberumatta/G10-M8.git
cd G10-M8
```

### Paso 2: Cambiar a la rama de integración `develop`
```bash
git checkout develop
git pull origin develop
```

### Paso 3: Instalar dependencias del Monorepo
El proyecto utiliza `npm workspaces`. **Solo necesitas ejecutar `npm install` una vez en la carpeta raíz**:
```bash
npm install
```

### Paso 4: Configurar Variables de Entorno con Supabase
Copia el archivo de ejemplo para crear tu `.env`:
```bash
cp .env.example .env
```
Abre tu archivo `.env` y pega la cadena de conexión de **Supabase** compartida por el Tech Lead en el grupo:
```env
# Conexión a la base de datos cloud de Supabase
DATABASE_URL="postgresql://postgres.[TU_PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Parámetros del servidor NestJS
PORT=3000
API_PREFIX=api/v1
CORS_ORIGIN=http://localhost:5173
```

### Paso 5: Sincronizar Prisma con Supabase
Genera el cliente de Prisma y sincroniza el esquema con Supabase ejecutando:
```bash
npx prisma generate --schema=apps/backend/prisma/schema.prisma
```
*(Opcional) Para abrir el visor visual de tablas de Prisma en tu navegador:*
```bash
npm run prisma:studio
```

---

## 3. Ejecución de los Servicios en Desarrollo

### Para iniciar la API Backend (NestJS):
```bash
npm run dev:backend
```
- API REST: `http://localhost:3000/api/v1`
- **Swagger UI interactivo con todos los endpoints**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Para iniciar el Dashboard Frontend (React / Vite):
```bash
npm run dev:frontend
```
- Panel web: `http://localhost:5173`

---

## 4. Flujo Obligatorio de Git y GitHub

Para que los 9 integrantes trabajemos sin colisiones ni ramas desactualizadas, seguimos este flujo estricto:

### 1. Salir siempre desde `develop`
Antes de iniciar cualquier tarea:
```bash
git checkout develop
git pull origin develop
```

### 2. Crear una rama de funcionalidad
Crea tu rama siguiendo la convención acordada:
```bash
git checkout -b feat/m8-<modulo>-<descripcion-corta>
```
*Ejemplos:*
- `feat/m8-tickets-persistence`
- `feat/m8-qr-generation`
- `feat/m8-pdf-receipt-download`
- `feat/m8-frontend-ticket-filter`
- `fix/m8-notification-retry-bug`

### 3. Commits Convencionales (Conventional Commits)
Escribe mensajes de commit descriptivos:
- `feat(support): add endpoint to close ticket with resolution note`
- `fix(qr): prevent token reuse after first verification`
- `test(notifications): add unit test for retry policy`
- `docs(openapi): update receipt schemas`

### 4. Abrir un Pull Request (PR) hacia `develop`
1. Sube tu rama a GitHub:
   ```bash
   git push origin feat/m8-<tu-rama>
   ```
2. En GitHub, abre un Pull Request teniendo como base **`develop`** (NUNCA `main`).
3. Completa la plantilla del PR:
   - Indica el requerimiento funcional (ej. RF-8.3, RF-8.7).
   - Asigna como **Revisor (Reviewer)** a tu compañero de célula.
4. Tu compañero de célula revisa el código y aprueba el PR.
5. Una vez que el pipeline de GitHub Actions (CI) esté en verde y tengas la aprobación, realiza **Squash and Merge**.

---

## 5. Herramientas y Consolas Clave

- **Documentación Swagger OpenAPI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Supabase Dashboard**: Panel web para ver y administrar las tablas de PostgreSQL y buckets de archivos en la nube.
- **Frontend Dashboard de M8**: [http://localhost:5173](http://localhost:5173)
- **Verificación rápida antes de abrir un PR**:
  ```bash
  npm run build
  npm run test --workspaces --if-present
  ```
