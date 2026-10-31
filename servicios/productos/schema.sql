CREATE DATABASE ProductosDB;
GO
USE ProductosDB;
GO
CREATE TABLE Productos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Categoria VARCHAR(50) NOT NULL,
    Imagen VARCHAR(500),
    Descripcion TEXT,
    Activo BIT DEFAULT 1
);
