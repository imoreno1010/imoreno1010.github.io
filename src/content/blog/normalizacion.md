---
title: "Normalización"
date: "2026-09-21T00:00:00-05:00"
description: "Las formas normales (1FN, 2FN, 3FN, FNBC y 4FN): en qué consiste cada una."
draft: false
categories:
  - "Evidencias"
tags:
  - "Normalización"
---
La teoría de normalización está basada en la aplicación de una serie de reglas. Una relación está en una determinada forma normal si cumple con el conjunto específico de restricciones que impone esa regla.

<!-- more -->

## Primera Forma Normal (1FN)

Exige que los atributos sean atómicos, es decir, que una misma celda no contenga varios valores a la vez ni grupos repetidos. Por ejemplo, si una tabla de pedidos guarda en una sola fila varios productos juntos (como si fueran una lista dentro de la celda), eso no cumple 1FN. La solución es separar esa información en una fila por cada producto, incluso si eso significa repetir el número de pedido en varias filas, o dividir la información en dos tablas relacionadas: una para los datos generales del pedido y otra para el detalle de cada producto.

## Segunda Forma Normal (2FN)

Además de cumplir 1FN, exige que cada atributo que no es clave dependa completamente de la clave primaria, no solo de una parte de ella. Esto solo es relevante cuando la clave primaria está compuesta por más de un campo. Por ejemplo, si una tabla tiene como clave la combinación de "número de pedido" y "número de producto", pero el nombre o el precio del producto en realidad solo dependen del número de producto (y no del pedido), esos datos deben sacarse a una tabla aparte de productos, porque dependen solo de una parte de la clave, no de la combinación completa.

## Tercera Forma Normal (3FN)

Además de cumplir 1FN y 2FN, exige que ningún atributo que no es clave dependa de otro atributo que tampoco es clave, lo que se conoce como dependencia transitiva. Por ejemplo, si en una tabla de pedidos el nombre del cliente depende del número de cliente, y no directamente del número de pedido, esa dependencia es transitiva: el nombre del cliente no depende del pedido en sí, sino del cliente. En ese caso, hay que crear una tabla separada para los clientes.

## Forma Normal de Boyce-Codd (FNBC)

Es una versión más estricta de la 3FN. La diferencia aparece en que la 3FN permite que un atributo no clave dependa de otro atributo no clave, siempre y cuando ese segundo atributo sea parte de una clave candidata. La FNBC no permite esa excepción: exige que, para toda dependencia funcional dentro de la tabla, el lado izquierdo de la dependencia sea siempre una superclave (es decir, un conjunto de atributos capaz de identificar la fila por sí solo). En la práctica, la mayoría de tablas que cumplen 3FN también cumplen FNBC; la diferencia solo se nota en casos puntuales donde hay más de una clave candidata y se cruzan entre sí.

## Cuarta Forma Normal (4FN)

Además de cumplir 1FN, 2FN y 3FN, exige que los campos multivaluados se identifiquen con su propia clave única, es decir, que no se mezclen dentro de una misma tabla dos relaciones independientes entre sí. Un ejemplo de esto es cuando una tabla intenta guardar a la vez qué materias existen y qué materias toma cada alumno: aunque ya esté en 3FN, sigue mezclando dos cosas distintas. La solución es separar el catálogo general de materias de la relación específica entre cada alumno y las materias que cursa, cada una en su propia tabla.
