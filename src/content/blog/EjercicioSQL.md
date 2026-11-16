---
title: "Taller Práctica de SQL"
date: "2026-11-16T00:00:00-05:00"
description: "Ejercicio de práctica en clase: consultar empleados de dos departamentos junto con la región a la que pertenecen, uniendo cinco tablas"
draft: false
categories:
  - "Evidencias"
tags:
  - "SQL"
---
Ejercicio de práctica hecho en clase sobre sentencias SQL: una consulta que necesita datos de cinco tablas distintas, resuelta con joins encadenados.

<!-- more -->

## El enunciado

Buscar los nombres, apellidos, salarios y el nombre del continente al que pertenecen los empleados de los departamentos 90 y 80.

## Análisis: de dónde sale cada dato

Lo primero es ubicar en qué tabla está cada dato que se pide, y cómo se llega de una tabla a la otra. 

- El nombre, el apellido, el salario y el departamento del empleado están en `EMPLOYEES`.
- El departamento está en `DEPARTMENTS`, y esa tabla guarda en qué ubicación queda (`LOCATION_ID`).
- La ubicación está en `LOCATIONS`, y esa tabla guarda el país (`COUNTRY_ID`).
- El país está en `COUNTRIES`, y esa tabla guarda la región (`REGION_ID`).
- El nombre de la región (el "continente") está en `REGIONS`.

No hay una relación directa entre el empleado y la región, así que hay que seguir toda la cadena: empleado → departamento → ubicación → país → región. Cada paso es un join que une una llave foránea con la llave primaria de la siguiente tabla.

## La solución

```sql
SELECT E.FIRST_NAME AS NOMBRE,
       E.LAST_NAME AS APELLIDO,
       E.SALARY AS SALARIO,
       R.REGION_NAME AS REGION
FROM HR.EMPLOYEES E
     LEFT JOIN HR.DEPARTMENTS D
     ON E.DEPARTMENT_ID = D.DEPARTMENT_ID
     LEFT JOIN HR.LOCATIONS L
     ON D.LOCATION_ID = L.LOCATION_ID
     LEFT JOIN HR.COUNTRIES C
     ON L.COUNTRY_ID = C.COUNTRY_ID
     LEFT JOIN HR.REGIONS R
     ON C.REGION_ID = R.REGION_ID
WHERE E.DEPARTMENT_ID = 80
      OR E.DEPARTMENT_ID = 90;
```

## Explicación por partes

**El SELECT con alias.** Se piden las cuatro columnas del enunciado y a cada una se le pone un alias con `AS` para que el resultado salga con nombres en español (`NOMBRE`, `APELLIDO`, `SALARIO` y `REGION`). Como hay varias tablas, cada columna lleva el alias de su tabla delante (`E.`, `R.`), para que quede claro de dónde sale.

**El FROM con los alias de tabla.** `HR.EMPLOYEES E` significa "la tabla `EMPLOYEES` del esquema `HR`, que de aquí en adelante se llama `E`". Lo mismo se hace con las otras cuatro tablas (`D`, `L`, `C` y `R`), lo que acorta la consulta.

**Los joins encadenados.** Se parte de `EMPLOYEES` y se le va uniendo una tabla tras otra. Cada `ON` indica por cuál columna se unen: `E.DEPARTMENT_ID = D.DEPARTMENT_ID`, luego `D.LOCATION_ID = L.LOCATION_ID`, y así hasta llegar a `REGIONS`. El resultado de cada join es la entrada del siguiente, que es la propiedad de cierre del álgebra relacional.

**El LEFT JOIN.** Un join normal descarta las filas que no tienen pareja, y un `LEFT JOIN` conserva todas las filas de la tabla de la izquierda y rellena con `NULL` lo que no encuentre. Aquí se usa para que ningún empleado desaparezca del resultado, aunque le falte un dato en la cadena.

**El WHERE.** Filtra solo los empleados del departamento 80 o del 90. Se usa `OR` porque basta con que se cumpla una de las dos condiciones; con `AND` no saldría nada, porque un empleado no puede estar en dos departamentos a la vez.

## Resultado esperado

Cada fila trae el nombre, el apellido y el salario de un empleado, junto con la región de su departamento. En el esquema HR estándar el departamento 90 (Executive) está en Seattle, así que sus empleados salen con la región **Americas**, y el departamento 80 (Sales) está en Oxford, así que los suyos salen con **Europe**.

## Notas

- **Una forma más corta del filtro.** Las dos condiciones del `WHERE` se pueden escribir como `WHERE E.DEPARTMENT_ID IN (80, 90)`, que hace lo mismo y se lee mejor cuando hay más valores.
- **LEFT JOIN o JOIN normal.** En este caso el resultado sería el mismo con un `JOIN` normal, porque todos los empleados de esos departamentos tienen un departamento, una ubicación y un país. El `LEFT JOIN` es más seguro porque no pierde empleados si algún dato faltara.
- **El orden de los joins importa para entender la consulta.** Cada tabla se une con la anterior, por eso hay que seguir el camino de las llaves foráneas y no unir las tablas en cualquier orden.