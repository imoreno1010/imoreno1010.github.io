---
title: "MER con Oracle SQL Developer Data Modeler"
date: "2026-09-06T00:00:00-05:00"
description: "Aprendimos a usar Oracle SQL Developer Data Modeler para construir un modelo entidad-relación y transformarlo automáticamente a modelo relacional, con un caso de un aeropuerto."
draft: false
categories:
  - "Evidencias"
tags:
  - "Modelado"
---
Aprendimos a usar una herramienta llamada Oracle SQL Developer Data Modeler para construir modelos de datos de forma gráfica. A diferencia de dibujar el MER a mano y transformarlo tabla por tabla, esta herramienta permite diseñar el modelo lógico visualmente y generar el modelo relacional de forma automática.

<!-- more -->

## El modelo lógico

Diseñé un modelo sobre un caso de un aeropuerto, con entidades como `PASAJERO`, `CONTACTO`, `VUELO`, `RUTA`, `TRIPULANTE` (especializado en `PILOTO` y `AUXILIAR`), `AVION`, `CERTIFICADO`, `PROVEEDOR`, `INSUMO` y `TABLET`, en total 16 entidades y 16 relaciones.

![Modelo lógico completo.](image/theme-showcase/logical.png)


### Cómo leer la notación

La herramienta usa unos símbolos pequeños antes de cada atributo para indicar su naturaleza:

- **`#`** — indica que el atributo es (o es parte de) el identificador único de la entidad, es decir, su llave primaria en el modelo lógico.
- **`*`** — indica que el atributo es obligatorio (no puede quedar vacío).
- **`o`** — indica que el atributo es opcional (puede quedar sin valor).

Por ejemplo, en la entidad `PASAJERO`, `# * documento` significa que `documento` es la llave y además es obligatorio, mientras que `o nombre` significa que `nombre` es un atributo opcional, sin ser clave.

En el modelo relacional (ya transformado a tablas), la notación cambia a la que es más estándar en bases de datos:

- **`P`** — marca la columna como llave primaria (Primary Key) de la tabla.
- **`F`** — marca la columna como llave foránea (Foreign Key), es decir, que referencia a la llave primaria de otra tabla.
- Junto a cada columna también aparece su tipo de dato (`NUMBER`, `VARCHAR`, `DATE`), asignado automáticamente por la herramienta según el tipo que se definió en el modelo lógico.

## Cómo se hace la transformación en esta herramienta

A diferencia de hacer la transformación a mano aplicando las reglas una por una, en Oracle Data Modeler el proceso es automático:Se busca la opción **"Realizar Ingeniería a Modelo Relacional"**. Se abre una ventana donde se confirma qué se va a transformar (entidades, relaciones, vistas) y hacia qué modelo relacional destino. Al confirmar, la herramienta genera automáticamente las tablas, resolviendo las cardinalidades, llaves primarias y foráneas según las reglas de transformación.

## El modelo relacional resultante

Este fue el resultado: cada entidad se convirtió en una tabla con sus columnas tipadas (`NUMBER`, `VARCHAR`, `DATE`), y las relaciones se resolvieron con llaves primarias (`P`) y foráneas (`F`), generando automáticamente los nombres de las restricciones (`_PK`, `_FK`).

![Modelo relacional generado automáticamente a partir del modelo lógico.](image/theme-showcase/transformacion.png)
