---
title: "MER Tranformación individual"
date: "2026-08-29T00:00:00-05:00"
description: "Ejercicio individual de transformación de un modelo entidad-relación, con un diagrama elegido por mí."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Se propone realizar autónomamente y completo una transformación para un Modelo Entidad Relación. Inicialmente elegí el diagrama modelo entidad-relación que consideré que contenía lo necesario para cierta transformación, lo repliqué en Draw.io y me quedó así:

![Diagrama entidad-relación elegido para el ejercicio individual, replicado en LucidChart.](image/theme-showcase/mer-individual.png)

A partir de este, empecé a realizar la transformación.

## Pasos de la transformación

### Regla 1 — Atributos multivaluados
No aplica, ya que todos los óvalos de mi diagrama son sencillos; ninguno representa un atributo con varios valores posibles.

### Regla 2 — Atributos compuestos
No aplica tambien porque ningún óvalo tiene otros óvalos colgando de él; todos los atributos son simples.

### Regla 3 — Cada entidad → tabla, con su identificador como PK
En este caso si plica a las entidades "normales" (no a las subclases, esas las resolví en la regla 11).


### Reglas 4-5 — Relaciones 1:1
Aplica para `dirigir` (GERENTE 1 — 1 ALMACEN). Como ambos lados son "1", ninguna se duplica: la FK se pone en uno de los dos lados (aquí, en `GERENTE`, ya que es más natural que el gerente "apunte" al almacén que dirige). Si ambos lados tuvieran participación total (1,1), incluso se podría unir y crear una sola entidad (regla 4) — pero en este caso `ALMACEN` se relaciona con otras entidades (`trabajar`, `suministrar`).

### Reglas 6-7 — Relaciones 1:N
La aplique para la relación `trabajar` (VENDEDOR N — 1 ALMACEN). El lado "1" (`ALMACEN`) pasa su PK como FK al lado "N" (`VENDEDOR`), porque cada vendedor solo trabaja en un almacén.

### Regla 8 — Relaciones N:M (binarias)
No la use ya que mi diagrama no tiene ninguna relación binaria M:N

### Regla 9 — Relaciones n-arias (ternarias)
Para `suministrar` (N:M:M entre `PROVEEDOR`, `ALMACEN`, `PRODUCTO`). Como ninguna de las tres entidades tiene cardinalidad "1", ninguna puede quedarse por fuera de la PK — se crea tabla nueva con las tres FK como PK compuesta, más los atributos propios de la relación (`cantidad`, `fecha`).

### Regla 10 — Roles
Ninguna entidad de mi diagrama se relaciona consigo misma, no hay relaciones reflexivas.

### Regla 11 — Generalización/Especialización
Aplica a `es_un` (`EMPLEADO` especializado en `GERENTE`/`VENDEDOR`, parcial y disjunta). Como es parcial (no todo empleado es gerente o vendedor), se deja la superclase + la entidad por cada subclase", donde la PK de cada subclase es la misma que la de la superclase, funcionando también como FK hacia ella.

## Modelo Relacional 
![Modelo Relación apartir de la transformación del Modelo Entidad Relación.](image/theme-showcase/tienda.png)

