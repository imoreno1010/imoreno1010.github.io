---
title: "Taller de Dependencias Funcionales y Formas Normales"
date: "2026-09-29T00:00:00-05:00"
description: "Tres casos de análisis de dependencias funcionales y normalización: una clínica, una tienda con ventas, y un sistema de asistencia de empleados."
draft: false
categories:
  - "Evidencias"
tags:
  - "Normalización"
---
Este taller consistía en tres casos distintos para analizar dependencias funcionales y aplicar normalización, cada uno con un enfoque diferente.

<!-- more -->

## Caso 1 — Clínica (citas, pacientes, doctores y especialidades)

La tabla de partida era: `ID_Cita, Fecha_Cita, Hora_Cita, ID_Paciente, Nombre_Paciente, Teléfono_Paciente, ID_Doctor, Nombre_Doctor, Especialidad_Doctor, Consultorio_Asignado, Piso_Consultorio, Diagnóstico, Tratamiento_Recomendado`.

### Dependencias funcionales

1. `ID_Cita → Fecha_Cita`, porque una cita tiene solo una fecha.
2. `ID_Cita → Hora_Cita`, porque una cita tiene una hora única.
3. `ID_Paciente → Nombre_Paciente`, porque un ID_Paciente se le asigna siempre a un único paciente reconocido por su nombre.
4. `ID_Paciente → Teléfono_Paciente`, porque en el sistema a un paciente se le registra con un número de teléfono.
5. `ID_Doctor → Nombre_Doctor`, porque un ID_Doctor corresponde a un doctor en específico reconocido por su nombre.
6. `ID_Doctor → Especialidad_Doctor`, porque el doctor tiene una especialidad con la que trabajará.
7. `ID_Cita → Diagnóstico`, porque una cita se agenda con el propósito de un diagnóstico a evaluar.
8. `Diagnóstico → Tratamiento_Recomendado`, porque para un diagnóstico en especial, aunque exista más de un tratamiento, se recomienda inicialmente uno.
9. `ID_Cita → ID_Paciente`, porque una cita corresponde a un paciente.
10. `ID_Cita → ID_Doctor`, porque para que una cita se pueda cumplir debe haber un doctor que la atienda.
11. `ID_Cita → Consultorio_Asignado`, porque para que una cita se pueda llevar a cabo debe tener un espacio asignado.
12. `Consultorio_Asignado → Piso_Consultorio`, porque un consultorio se encuentra únicamente en un piso, no puede haber un consultorio en dos pisos al mismo tiempo.

### Análisis por forma normal

- **1FN:** se organizaron los valores y se analizó si había grupos repetidos. No los hay — cada fila corresponde a un único `ID_Cita`, así que la tabla cumple 1FN.
- **2FN:** se analizó si había dependencia parcial, pero al existir una sola clave primaria (`ID_Cita`, sin ser compuesta), no aplica la dependencia parcial. La tabla ya cumple 2FN.
- **3FN:** sí existen atributos dependientes de otros atributos que no son la clave primaria (dependencias transitivas), por lo que hay que transformar la tabla.

### Esquema resultante en 3FN

Separando por dependencia transitiva, quedan 4 tablas nuevas más la tabla principal:

- **PACIENTE** (`ID_Paciente` PK, `Nombre_Paciente`, `Teléfono_Paciente`)
- **DOCTOR** (`ID_Doctor` PK, `Nombre_Doctor`, `Especialidad_Doctor`)
- **CONSULTORIO** (`Consultorio_Asignado` PK, `Piso_Consultorio`)
- **DIAGNOSTICO** (`Diagnostico` PK, `Tratamiento_Recomendado`)
- **CITA_CLINICA** (`ID_Cita` PK, `Fecha_Cita`, `Hora_Cita`, `ID_Paciente` FK, `ID_Doctor` FK, `Consultorio_Asignado` FK, `Diagnostico` FK)

### Por qué cada tabla necesitaba separarse (anomalías)

- **PACIENTE:** si un paciente actualiza o cancela una cita, se pueden llegar a perder los datos de la persona (anomalía de inserción).
- **DOCTOR:** si un doctor que ingresa por primera vez al sistema solo tiene asociada la cita de un paciente, y este decide cancelarla, se borrarían también los datos del doctor (anomalía de eliminación).
- **CONSULTORIO:** si un hospital expande su infraestructura y el piso de los consultorios cambia, al estar duplicada esta información en varias filas, hay que actualizarla en todas; si hay un error o se omite algún cambio, un mismo consultorio quedaría registrado en dos pisos diferentes (anomalía de actualización).
- **DIAGNOSTICO:** si el tratamiento recomendado para cierto diagnóstico cambia por decisión del hospital, habría que actualizar todos los registros de pacientes que hayan tenido ese diagnóstico anteriormente (anomalía de actualización).

Si no se hace la corrección y creación de estas nuevas tablas, la tabla original puede presentar anomalías de inserción, eliminación y actualización.

![Esquema Caso 1.](image/theme-showcase/esquema1.png)

## Caso 2 — Tienda (sucursales, productos y ventas)

La tabla de partida era: `ID_Venta, Fecha_Venta, ID_Sucursal, Nombre_Sucursal, Ciudad_Sucursal, ID_Producto, Nombre_Producto, Categoría_Producto, Precio_Unitario, Cantidad_Vendida, ID_Vendedor, Nombre_Vendedor, Comisión_Vendedor`.

### Dependencias funcionales

1. `ID_Venta → Fecha_Venta`, porque una venta ocurre en un solo momento, entonces tiene una única fecha.
2. `ID_Venta → ID_Sucursal`, porque una venta se realiza en una sola sucursal.
3. `ID_Venta → ID_Vendedor`, porque una venta la atiende un único vendedor.
4. `ID_Sucursal → Nombre_Sucursal`, porque cada sucursal tiene un nombre único.
5. `ID_Sucursal → Ciudad_Sucursal`, porque cada sucursal está físicamente ubicada en una sola ciudad.
6. `ID_Producto → Nombre_Producto`, porque cada producto tiene un nombre único.
7. `ID_Producto → Categoría_Producto`, porque cada producto pertenece a una única categoría (no puede estar en "Electrodomésticos" y "Ropa" al tiempo).
8. `ID_Producto → Precio_Unitario`, porque cada producto tiene un precio fijo de catálogo.
9. `{ID_Venta, ID_Producto} → Cantidad_Vendida`, porque la cantidad vendida depende de la combinación de cuántas unidades de ESE producto se vendieron en ESA venta específicamente.
10. `ID_Vendedor → Nombre_Vendedor`, porque cada vendedor tiene un nombre único.
11. `ID_Vendedor → Comisión_Vendedor`, porque cada vendedor tiene un porcentaje de comisión fijo asignado.

### Análisis por forma normal

- **1FN:** una relación está en 1FN si todos sus atributos son atómicos (un solo valor por celda) y no existen grupos repetidos. La tabla original cumple esto.

- **2FN:** la clave de la tabla original es compuesta — `{ID_Venta, ID_Producto}` — porque es la única combinación que identifica de forma única cada fila (una venta puede incluir varios productos). Para cumplir 2FN, todo atributo no-clave debe depender de las dos partes de la clave combinada, no de una sola por separado. En este caso eso no se cumple: atributos como `Nombre_Sucursal` o `Nombre_Producto` dependen solo de una parte de la clave. Separando por esa dependencia parcial quedan 3 tablas:
  - **Venta** (`ID_Venta` PK, `Fecha_Venta`, `ID_Sucursal`, `Nombre_Sucursal`, `Ciudad_Sucursal`, `ID_Vendedor`, `Nombre_Vendedor`, `Comisión_Vendedor`) — todos estos atributos ya dependen de la clave completa de esta tabla (`ID_Venta`, que ahora es clave simple aquí), así que no hay dependencia parcial.
  - **Producto** (`ID_Producto` PK, `Nombre_Producto`, `Categoría_Producto`, `Precio_Unitario`) — `ID_Producto` queda como clave simple, todos los atributos dependen directamente de ella, sin dependencias parciales ni transitivas.
  - **Detalle_Venta** (`ID_Venta` PK+FK, `ID_Producto` PK+FK, `Cantidad_Vendida`) — `Cantidad_Vendida` es el único atributo que de verdad necesitaba la clave compuesta completa (depende de qué venta Y qué producto a la vez). Al quedar solo con la clave compuesta, ya no hay dependencia parcial en esta tabla.

- **3FN:** para estar en 3FN, ningún atributo no-clave puede depender de otro atributo no-clave — todos deben depender directamente de la clave primaria, sin necesitar de un atributo intermedio. En este caso, la tabla `Venta` (resultado del paso anterior) sí tiene dependencias transitivas: `Nombre_Sucursal` y `Ciudad_Sucursal` dependen de `ID_Sucursal`, no directamente de `ID_Venta`; y `Nombre_Vendedor` y `Comisión_Vendedor` dependen de `ID_Vendedor`, no de `ID_Venta`. Separando por esto:
  - **Sucursal** (`ID_Sucursal` PK, `Nombre_Sucursal`, `Ciudad_Sucursal`) — clave simple, ambos atributos dependen directamente de ella, sin dependencias transitivas.
  - **Vendedor** (`ID_Vendedor` PK, `Nombre_Vendedor`, `Comisión_Vendedor`) — mismo caso, clave simple sin dependencias transitivas.
  - **Venta** (`ID_Venta` PK, `Fecha_Venta`, `ID_Sucursal` FK, `ID_Vendedor` FK) — ya no existen dependencias transitivas en esta tabla; los atributos que antes dependían indirectamente de `ID_Venta` a través de `ID_Sucursal` e `ID_Vendedor` se movieron a sus propias tablas. Solo quedan las llaves foráneas y `Fecha_Venta`.
  - **Producto** y **Detalle_Venta** quedan igual que en 2FN, porque ya no tenían ninguna dependencia transitiva.

![Esquema Caso 2.](image/theme-showcase/esquema2.png)

## Caso 3 — Sistema de asistencia de empleados (análisis de 1FN)

La relación de partida era `REGISTRO_ASISTENCIA (ID_Empleado, Nombre_Empleado, Fechas_Asistencia, Proyectos_Asignados)`, donde un empleado tiene varias fechas de asistencia y varios proyectos asignados independientes entre sí.

### a - ¿Viola 1FN?

Sí. La regla de 1FN exige que los atributos de una relación sean atómicos. Revisando los atributos de `REGISTRO_ASISTENCIA`, hay dos que no cumplen esto: `Fechas_Asistencia` y `Proyectos_Asignados`, porque un mismo empleado puede tener más de un valor en cada uno. Por ejemplo:

- `ID_Empleado`: 100
- `Nombre_Empleado`: Juan
- `Fechas_Asistencia`: 21/02/2025, 21/08/2025
- `Proyectos_Asignados`: Marketing, Infraestructura

Al tener varios valores dentro de una misma celda, se viola la atomicidad exigida por 1FN.

### b - Normalización a 1FN

Se necesitan 3 tablas:

- **Empleado** (`ID_Empleado` PK, `Nombre_Empleado`)
- **Empleado-Fecha_Asistencia** (`ID_Empleado` + `Fecha_Asistencia` PK, `ID_Empleado` FK)
- **Empleado-Proyecto_Asignado** (`Proyecto_Asignado` + `ID_Empleado` PK, `ID_Empleado` FK)

Cada tabla de relación usa una clave compuesta por `ID_Empleado` junto con el valor que antes estaba repetido (fecha o proyecto), de modo que cada combinación queda en su propia fila, sin violar la atomicidad.