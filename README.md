# Oliva & Canela - Proyecto Final Fullstack Microservicios

Aplicación full-stack de repostería gourmet dividida en microservicios, comunicados con RabbitMQ, bases de datos independientes (SQL Server + MongoDB), API Gateway, containerización completa con Docker Compose y suite de pruebas automatizadas.

## 🏛️ Arquitectura del Sistema

```text
                  +-----------------------+
                  |  Frontend (React/Vite)|
                  +-----------+-----------+
                              |
                              v
                  +-----------------------+
                  |   API Gateway (:8000) |
                  +---+---------------+---+
                      |               |
         /api/auth    |               |  /api/productos
                      v               v
    +-------------------+           +-----------------------+
    | Servicio Auth     |           | Servicio Productos    |
    | (:4001)           |           | (:4002)               |
    +---------+---------+           +-----------+-----------+
              |                                 |
              v                                 v
      +---------------+              +--------------------+
      |  SQL Server   |              | SQL Server + Mongo |
      |  (AuthDB)     |              | (ProductosDB)      |
      +---------------+              +--------------------+
              |                                 ^
              |   Evento: usuario.creado        |
              +-----------> RabbitMQ ----------+
```

## 📋 Requisitos Previos
- Docker Desktop instalado y corriendo.
- Node.js v18+ (opcional para ejecución local sin Docker).

## 🚀 Despliegue Rápido con Docker
```bash
docker compose up --build -d
```
Servicios disponibles:
- **Frontend App:** http://localhost:3000
- **API Gateway:** http://localhost:8000
- **Servicio Auth:** http://localhost:4001
- **Servicio Productos:** http://localhost:4002
- **Panel RabbitMQ:** http://localhost:15672 (credenciales: `guest`/`guest`)

## 🧪 Pruebas Automatizadas
```bash
# Servicio Auth
cd servicios/auth && npm test

# Servicio Productos
cd servicios/productos && npm test

# Frontend
cd frontend && npm test
```

## 🔑 Endpoints Principales
- `POST /api/auth/register` - Registro de nuevos usuarios (Publica evento `usuario.creado`).
- `POST /api/auth/login` - Generación de JWT token.
- `GET /api/productos` - Catálogo público de repostería gourmet.
- `POST /api/productos` - Crear producto (Requiere `Authorization: Bearer <token>`).
- `POST /api/productos/:id/resenas` - Agregar reseña en MongoDB (Requiere `Authorization: Bearer <token>`).
