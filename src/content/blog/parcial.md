---
title: "Pre-parcial MER y Transformación"
date: "2026-09-12T00:00:00-05:00"
description: "Pre-parcial de dos puntos: diseño de un modelo entidad-relación extendido y su transformación."
draft: false
categories:
  - "Evidencias"
tags:
  - "Modelado"
---
Realicé un pre-parcial asignado por el docente para practicar el tema de MER y su transformación, dividido en dos puntos de 20 puntos cada uno.

<!-- more -->

## Primer punto — Diseño del modelo entidad-relación extendido

El caso plantea una cadena de salas de cine (CineAndes) que necesita un modelo conceptual a partir de un conjunto de reglas de negocio: cada sede tiene varias salas, cada sala está compuesta por sillas identificadas por fila y número, cada película puede estar en varios idiomas y tener una precuela, y una función es la proyección de una película en una sala, fecha y hora específicas.

![Reglas del primer punto: sede, salas, sillas, película y función.](image/theme-showcase/parcialpunto11.jpeg)

Las reglas también incluían una relación de especialización (todo empleado es proyeccionista o taquillero, nunca ambos ni ninguno) y una relación recursiva (un empleado puede supervisar a otros empleados, y tiene a lo sumo un supervisor):

![Reglas sobre clientes, empleados y la relación de supervisión.](image/theme-showcase/parcialpunto12.jpeg)

Este fue el diagrama MER final que realicé, siguiendo las indicaciones y marcando atributos clave, compuestos, multivaluados y derivados:

![Diagrama MER final del primer punto.](image/theme-showcase/solucion1.jpeg)

## Segundo punto — Reducción a tablas

Para este punto, el docente entregó un modelo entidad-relación ya validado (independiente de lo dibujado en el punto 1), con entidades como SEDE, SALA, SILLA, CLIENTE, FUNCIÓN, PELÍCULA, EMPLEADO, PROVEEDOR, PRODUCTO y MEDIO_PAGO, además de 9 relaciones entre ellas — incluyendo entidades débiles (SALA depende de SEDE, SILLA depende de SALA), una relación ternaria (PROVEEDOR–SEDE–PRODUCTO) y una agregación (la relación COMPRA entre CLIENTE y FUNCIÓN se paga con un único MEDIO_PAGO):

![Modelo de partida entregado por el docente para el punto 2.](image/theme-showcase/parcialpunto21.jpeg)

A partir de ese modelo, se pedía transformar cada parte por separado: los atributos de SEDE y CLIENTE, las entidades débiles SALA/SILLA/FUNCIÓN, la relación COMPRA, la relación ternaria ENTREGA, la agregación PAGA_CON, y la especialización de EMPLEADO:

![Tareas específicas pedidas para la transformación del punto 2.](image/theme-showcase/parcialpunto22.jpeg)

Para este caso, la tarea consistía en la transformación. Siguiendo las indicaciones y resolviendo punto por punto, quedó así:

![Transformación a modelo relacional del segundo punto.](image/theme-showcase/solucion2.jpg)