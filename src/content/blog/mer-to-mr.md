---
title: "Transformación de MER a MR"
date: "2026-08-29T00:00:00-05:00"
description: "Las reglas para transformar un Modelo Entidad-Relación (MER) en un Modelo Relacional (MR)."
draft: false
categories:
  - "Evidencias"
tags:
  - "Modelado"
---
Después de construir un Modelo Entidad-Relación (MER), el siguiente paso es transformarlo en un Modelo Relacional (MR): el diseño que ya se acerca a cómo se van a crear las tablas en la base de datos. Aquí recojo las reglas principales que estoy aprendiendo para hacer esa transformación.

<!-- more -->

## Las reglas de transformación

1. **Eliminación de atributos multivaluados** — un atributo que puede tener varios valores no puede quedar dentro de una tabla tal cual; hay que sacarlo y convertirlo en una tabla aparte, relacionada con la entidad original.

2. **Eliminación de atributos compuestos** — un atributo que se puede dividir en partes (como un nombre completo) se descompone en sus partes simples antes de pasar al modelo relacional.

3. **Todas las entidades en el MER / Las entidades se convierten en tablas** — como regla general, cada entidad del MER se convierte en una tabla en el MR, conservando sus atributos.

4. **Cardinalidad 1:1 con participación total en ambas entidades** — cuando ambas entidades participan siempre en la relación (participación total), se pueden fusionar en una sola tabla.

5. **Cardinalidad 1:1 con participación parcial** — si alguna de las entidades tiene participación mínima de 0 (no siempre participa), no se fusionan; se maneja con una llave foránea en el lado que puede quedar vacío.

6. **Transformación para entidades con cardinalidad 1:M** — la llave primaria de la entidad del lado "1" se agrega como llave foránea en la tabla del lado "M".

7. **Transformación para entidades con cardinalidad 1:M** (Continuación del caso anterior, con más detalle sobre cómo ubicar la llave foránea según el sentido de la relación).

8. **Transformación para entidades con cardinalidad N:M** — se necesita una tabla intermedia (tabla de relación) que contenga las llaves primarias de ambas entidades como llaves foráneas.

9. **Relaciones n-arias** (relaciones entre 3 o más entidades) — también requieren una tabla intermedia que conecte las llaves primarias de todas las entidades participantes.

10. **Transformación de roles** — cuando una misma entidad participa más de una vez en una relación (con distintos roles), cada rol se representa con su propia llave foránea, diferenciada por nombre.

11. **Generalización/Especialización** — cuando hay una entidad general con subtipos (por ejemplo, "Empleado" con subtipos "Gerente" y "Vendedor"), hay varias estrategias posibles: una tabla para la entidad general y una para cada subtipo, o combinarlas según el caso.

## Aplicando la transformación a un caso real
Para practicar, tomé un diagrama MER de un zoológico/safari con las entidades: `HABITAT`, `CONTINENTE`, `ESPECIE`, `ZONA`, `ITINERARIO`, `CUIDADOR` y `GUIA`.

![Diagrama entidad-relación del zoológico usado para practicar la transformación a MR.](image/mer-zoologico.png)

Así fue como apliqué las reglas:



