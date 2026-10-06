---
title: "Taller de Normalización — Punto 4"
date: "2026-09-23T00:00:00-05:00"
description: "Ejercicio práctico de normalización: llevando una tabla de consultas médicas desde su forma inicial hasta 3FN, con una nota sobre BCNF."
draft: false
categories:
  - "Evidencias"
tags:
  - "Normalización"
---
Hice el punto 4 de un taller de normalización de bases de datos, donde se debía partir de una tabla con información de consultas médicas y llevarla paso a paso hasta una forma normal más alta.

<!-- more -->

## El enunciado

La tabla de partida (Tabla No. 2) contenía una muestra de visitas médicas, con las columnas `VisitaNo`, `DiaVisita`, `PacNo`, `PacEdad`, `PacCiudad`, `ProvNo`, `ProvEspecialidad` y `Diagnostico`. El problema era que una misma visita (`VisitaNo`) podía tener más de un proveedor/diagnóstico asociado, lo que generaba grupos repetidos para una misma visita.

![Tabla de partida con los datos de las visitas médicas.](image/theme-showcase/actnor.png)

## Primera Forma Normal (1FN)

El problema inicial es que, para una misma visita, había varias filas con información repetida de proveedor y diagnóstico — una violación directa de la atomicidad. Para resolverlo, separé la tabla en dos: `Consulta`, con los datos propios de cada visita (`VisitaNo`, `DiaVisita`, `PacNo`, `PacEdad`, `PacCiudad`), y `Consulta-Especialidad`, con el detalle de cada atención (`ProvNo`, `ProvEspecialidad`, `Diagnostico`, `VisitaNo`), usando `VisitaNo` como llave que las conecta. Así cada fila queda con un solo valor por columna, sin grupos repetidos.

![Separación en 1FN: tabla Consulta y tabla Consulta-Especialidad.](image/theme-showcase/normalizacion-1fn.png)

## Segunda Forma Normal (2FN)

En la tabla `Consulta-Especialidad`, la clave es la combinación de `ProvNo` y `VisitaNo`. Pero noté que `ProvEspecialidad` no depende de esa combinación completa — depende únicamente de `ProvNo` (la especialidad del proveedor es la misma sin importar a qué visita corresponda). Esto es una dependencia parcial, así que extraje esa información a una tabla nueva, `Especialidad` (`ProvNo`, `ProvEspecialidad`), dejando `Consulta-Especialidad` solo con lo que sí depende de la clave completa (`ProvNo`, `Diagnostico`, `VisitaNo`).

![Separación en 2FN: se extrae la tabla Especialidad.](image/theme-showcase/normalizacion-2fn.png)

## Tercera Forma Normal (3FN)

Revisando la tabla `Consulta`, cuya clave es `VisitaNo`, noté que `PacEdad` y `PacCiudad` no dependen directamente de la visita, sino del paciente (`PacNo`) — es decir, dependen de un atributo que no es la clave primaria, lo que es una dependencia transitiva. Para resolverlo, creé una tabla `Paciente` (`PacNo`, `PacEdad`, `PacCiudad`), dejando `Consulta` solo con `VisitaNo`, `DiaVisita` y `PacNo`.

![Separación en 3FN: se extrae la tabla Paciente.](image/theme-showcase/normalizacion-3fn.png)

## Nota sobre la Forma Normal de Boyce-Codd (BCNF)

BCNF se encarga del caso cuando existen varias claves candidatas que se solapan entre sí, es decir, cuando un atributo que no es la clave completa (o clave primaria) determina a otro atributo, aunque ese atributo sí sea parte de una clave. Se debe tener en cuenta que todo atributo debe depender únicamente del determinante que sea superclave.

![Las cuatro tablas finales, con la nota sobre BCNF.](image/theme-showcase/normalizacion-bcnf.png)