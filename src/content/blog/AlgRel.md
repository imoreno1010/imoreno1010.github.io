---
title: "Algebra Relacional"
date: "2026-10-21T00:00:00-05:00"
description: "Este post resume qué es el álgebra relacional, el lenguaje formal que está detrás de las consultas a una base de datos, y explica cada operador con un ejemplo."
draft: false
categories:
  - "Evidencias"
tags:
  - "SQL"
---

<!-- more -->

## ¿Qué es el álgebra relacional?

Una base de datos relacional guarda la información en relaciones, que son lo que normalmente llamamos tablas. Cada fila se llama tupla y cada columna se llama atributo. El álgebra relacional es un lenguaje formal para consultar esas relaciones, es decir, para pedirle a la base de datos solo los datos que necesitamos.

Funciona con un conjunto de operadores. Cada operador recibe una o dos relaciones y devuelve como resultado otra relación. A esto se le llama **propiedad de cierre**, y permite que el resultado de un operador sea la entrada de otro, así que se pueden armar consultas complejas combinando operaciones sencillas, como en una expresión matemática.

Es un lenguaje procedimental: se indica qué se quiere obtener y también cómo obtenerlo, paso a paso. Los desarrolladores no lo usan directamente. SQL está basado en él, y el motor de la base de datos lo usa por dentro para traducir y optimizar las consultas SQL.

## Clasificación de los operadores

Una clasificación habitual los divide en tres grupos:

- **Tradicionales de la teoría de conjuntos:** unión, intersección, diferencia y producto cartesiano.
- **Especializados:** selección (o restricción), proyección, reunión (join) y división.
- **Adicionales:** renombrado, agrupamiento y derivación (o extensión).

Ojo con la traducción: *join* es **reunión**, no unión, porque la unión es otro operador.

Otra forma de verlos separa los **básicos** (selección, proyección, unión, diferencia y producto cartesiano) de los **derivados** (los joins, la intersección y la división). Los básicos bastan para expresar cualquier consulta, y los derivados no añaden nada nuevo: se definieron para simplificar la escritura porque se pueden construir combinando los básicos.

## Resumen de los operadores

Estas dos tablas resumen el nombre, la notación y la descripción de cada operador.

![Resumen de los operadores: selección, proyección, unión, intersección y diferencia.](image/theme-showcase/alg1.png)

![Resumen de los operadores: producto cartesiano, renombrar, join natural y join equi.](image/theme-showcase/alg2.png)
En las siguientes secciones se explica cada uno con un ejemplo.

## Relaciones de ejemplo

Para casi todos los ejemplos se usan dos relaciones con los mismos atributos: `código`, `nombre` y `edad`.

`ADMINISTRADOR` tiene tres tuplas: (1, Jorge Campos, 33), (2, Enrique Muñoz, 25) y (3, Esteban Paz, 21).

`PRODUCTOR` también tiene tres: (2, Enrique Muñoz, 25), (8, Jorge Arias, 30) y (10, Juan Martínez, 19).

Fíjate en que Enrique Muñoz aparece en las dos relaciones, porque eso importa en la unión, la intersección y la diferencia.

## Selección (σ)

La selección filtra **filas**. Conserva todas las columnas y solo se queda con las tuplas que cumplen la condición. Por ejemplo:

`σ edad ≥ 25 (ADMINISTRADOR)`

devuelve a Jorge Campos (33) y a Enrique Muñoz (25), porque Esteban Paz tiene 21 y se descarta.

La condición se arma con comparadores (`=`, `<`, `>`, `≤`, `≥`, `≠`) y se pueden combinar varias con AND (`∧`) y OR (`∨`). Con AND deben cumplirse todas a la vez, y con OR basta con una. Por ejemplo, `nombre = "Jorge Campos" ∧ edad = 25` no devuelve nada, porque nadie cumple las dos, pero con `∨` devolvería a Jorge Campos y a Enrique Muñoz.

## Proyección (π)

La proyección filtra **columnas**: devuelve solo los atributos que se piden. Su regla más importante es que **se eliminan las tuplas repetidas**, porque una relación es un conjunto y no puede tener filas idénticas.

Sea la relación `JUGADOR` con las tuplas (3, Xiu, China), (8, Juan, Perú) y (2, Juan, Perú). Entonces:

`π país (JUGADOR)`

devuelve solo China y Perú. Perú aparecía dos veces, pero al quedar una sola columna las filas son idénticas y se deja una. En cambio `π nom, país (JUGADOR)` devuelve (Xiu, China) y (Juan, Perú).

## Composición de operaciones

Gracias a la propiedad de cierre se pueden anidar operadores. Para "encontrar los nombres de los clientes que viven en la ciudad Peguerinos" se filtran primero las filas y luego se elige la columna:

`π nombre-cliente ( σ ciudad-cliente = "Peguerinos" ( cliente ) )`

Se lee de adentro hacia afuera: primero la selección deja a los clientes de Peguerinos y después la proyección deja solo sus nombres.

## Unión (∪), intersección (∩) y diferencia (−)

Estos tres vienen de la teoría de conjuntos y exigen que las dos relaciones sean **compatibles**: misma cantidad de atributos y, para cada par de atributos correspondientes, el mismo dominio.

**Unión.** `ADMINISTRADOR ∪ PRODUCTOR` devuelve 5 tuplas, con los códigos 1, 2, 3, 8 y 10. Enrique Muñoz aparece una sola vez, aunque estaba en las dos relaciones. Es conmutativa y asociativa.

**Intersección.** `ADMINISTRADOR ∩ PRODUCTOR` devuelve solo a Enrique Muñoz, el único que está en ambas. Es conmutativa y asociativa, y se puede construir con la diferencia: `A ∩ B ≡ A − (A − B)`.

**Diferencia.** `ADMINISTRADOR − PRODUCTOR` devuelve a Jorge Campos y a Esteban Paz, mientras que `PRODUCTOR − ADMINISTRADOR` devuelve a Jorge Arias y a Juan Martínez. Los resultados son distintos, así que **la diferencia no es conmutativa**: el orden importa.

## Renombrado (ρ) y producto cartesiano (×)

El producto cartesiano combina cada tupla de la primera relación con cada tupla de la segunda, así que el resultado tiene (filas de R1) × (filas de R2) tuplas. Su cabecera es la de R1 seguida de la de R2, y por eso **no puede haber atributos con el mismo nombre**. Como `ADMINISTRADOR` y `PRODUCTOR` tienen las mismas columnas, hay que renombrar una de las dos, y para eso sirve el renombrado:

`ADMINISTRADOR × ρ PRO(cod, nom) ( π código, nombre (PRODUCTOR) )`

Aquí `PRO` es el nuevo nombre de la relación, y `cod` y `nom` los nuevos nombres de sus atributos. El resultado tiene 9 tuplas (3 × 3), y cada fila trae `código`, `nombre`, `edad`, `cod` y `nom`.

El renombrado **es temporal**: solo vale dentro de esa expresión y la relación original no cambia. También se puede renombrar solo la relación o solo los atributos.

## Join natural (⨝)

El join natural une dos relaciones usando automáticamente los atributos que tienen el mismo nombre, y combina solo las tuplas que tienen el mismo valor en ellos. Debe haber al menos un atributo en común.

Sea `EMPLEADO` con (1, Jorge Campos, 33, depto 1), (2, Enrique Muñoz, 25, depto 1), (3, Esteban Paz, 21, depto 1), (8, Jorge Arias, 30, depto 2), (10, Juan Martínez, 19, depto 2) y (12, Anselmo Rodas, 28, depto 6). Sea `DEPARTAMENTO` con (1, Administración), (2, Producción), (3, Ventas) y (4, Finanzas).

`EMPLEADO ⨝ DEPARTAMENTO` devuelve 5 tuplas, cada empleado con la descripción de su departamento. **Anselmo Rodas no aparece**, porque el departamento 6 no existe en `DEPARTAMENTO` y no tiene con quién combinarse.

## Join condicional o equi join (⨝ condición)

Une dos relaciones con una condición escrita explícitamente, en vez de igualar los nombres de atributos. Equivale a un producto cartesiano seguido de una selección:

`R ⨝ condición S ≡ σ condición (R × S)`

Si la condición es una igualdad se le llama equi join. Si usa `<`, `>`, `≤`, `≥` o `≠` se le llama theta join. Aquí **no debe haber atributos con el mismo nombre**, así que a veces hay que renombrar. Por ejemplo, con `EMPLEADO` y los departamentos renombrados como `DEPT(dep, desc)`:

`EMPLEADO ⨝ depto > dep DEPT`

devuelve cada empleado junto con todos los departamentos cuyo número es menor que el suyo. Jorge Arias y Juan Martínez (depto 2) quedan con el departamento 1, y Anselmo Rodas (depto 6) con los departamentos 1, 2, 3 y 4, para un total de 6 tuplas.

## Joins externos (outer join)

Un join normal descarta las tuplas que no encuentran pareja. Un join externo las conserva y rellena con `NULL` lo que no tiene correspondencia. Hay tres tipos:

- **Left join:** conserva además las tuplas sin pareja de la relación de la izquierda.
- **Right join:** conserva además las de la derecha.
- **Full join:** conserva las de ambas.

Por ejemplo, sea `Departamento` con Dirección (1), Desarrollo (2), Ventas (3) y Compras (4), y sea `Localización_Departamento` con (1, Quilmes), (2, Buenos Aires), (2, Córdoba), (2, Rosario), (0, Catamarca) y (0, Mendoza). Un join normal solo devuelve Dirección y Desarrollo con sus localizaciones. El left join agrega Ventas y Compras con la localización en `NULL`. El right join agrega Catamarca y Mendoza con los datos del departamento en `NULL`. El full join agrega todas esas filas.

## División (÷)

La división sirve para consultas del tipo "los que cumplen con **todos**". Sean R1(A, B) y R2(B). El resultado de `R1 ÷ R2` es una relación con el atributo A, y un valor de A aparece en el resultado solo si está combinado en R1 con **cada uno** de los valores de B que hay en R2.

Sea `ARTISTAYGENERO` con (45, Soul), (45, Pop), (45, Dance), (8, Soul), (8, Pop) y (23, Dance), y sea `GÉNERO` con Soul, Pop y Dance. Entonces `ARTISTAYGENERO ÷ GÉNERO` devuelve solo el artista **45**, porque es el único combinado con todos los géneros. El artista 8 tiene dos de los tres y el 23 solo uno, así que quedan fuera.

Para poder dividir, el grado de R1 debe ser mayor que el de R2, y los atributos de R2 deben estar incluidos en los de R1.

## Agrupamiento (Ģ)

El agrupamiento junta las tuplas por uno o varios atributos y calcula funciones de grupo (SUM, AVG, MAX, MIN y COUNT) sobre cada grupo. Se escribe `atributos de agrupamiento Ģ funciones (R)`, y a cada valor calculado se le pone nombre con `AS`.

Sea `EMP` con seis empleados repartidos así: tres en el departamento 1, dos en el 2 y uno en el 6. La consulta:

`depto Ģ COUNT(código) AS conteo (EMP)`

devuelve una fila por departamento: (1, 3), (2, 2) y (6, 1).

## Derivación o extensión (EXTEND)

La derivación agrega a una relación columnas calculadas. Se escribe `EXTEND R ADD cálculos AS nombres`. Por ejemplo, con una relación `EMP` que tiene `sal` y `bono`:

`EXTEND EMP ADD sal + bono AS totsal`

devuelve la relación original con una columna extra `totsal`. Un empleado con sal 33 y bono 1 queda con totsal 34. La relación original no se modifica.

## Asignación (←)

Guarda el resultado de una expresión en una variable de relación para reutilizarlo después. Se escribe `VariableRelación ← Relación`.

## Nota sobre la notación

La notación cambia según la fuente. El join se escribe con ⨝ en unos materiales y como `|X|` en otros. En algunos el join natural se escribe con un asterisco (`*`) y la división con una barra (`/`) en lugar de `÷`. No son operaciones distintas, solo formas diferentes de escribir lo mismo.