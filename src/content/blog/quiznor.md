---
title: "Quiz de Normalización"
date: "2026-10-02T00:00:00-05:00"
description: "Quiz de normalización: pasar una relación a BCNF y determinar la forma normal más alta de una relación a partir de sus dependencias funcionales."
draft: false
categories:
  - "Evidencias"
tags:
  - "Normalización"
---
Quiz de análisis sobre normalización, con respuestas argumentadas: conversión a BCNF y forma normal más alta de una relación según sus dependencias funcionales.

<!-- more -->

## Punto 1: Dirección(Ciudad, Calle, CodPostal)

La relación tiene las dependencias funcionales `(Ciudad, Calle) → CodPostal` y `CodPostal → Ciudad`.

### ¿Cómo se convierte a BCNF y qué se pierde?

Se descompone en `R1(CodPostal, Ciudad)` y `R2(Calle, CodPostal)`, sacando de la tabla original la dependencia `CodPostal → Ciudad`, cuyo determinante `CodPostal` no es superclave. Se pierde la dependencia `(Ciudad, Calle) → CodPostal`

## Punto 2: R(A, B, C, D, E)

La relación tiene las dependencias funcionales `AB → C`, `C → D`, `D → B` y `A → E`.

### Pregunta 1: ¿Cuál es la forma normal más alta a la que puede llegar?

Las claves candidatas son `AB`, `AC` y `AD`, y `E` es el único atributo no primo. Como `A → E` es una dependencia parcial (E depende solo de una parte de la clave), viola 2FN y la relación solo llega hasta 1FN.

### Pregunta 2: ¿Qué pasa si se elimina E y la dependencia A → E?

Lo que pasaría es que sollo se cumpliría hasta 3FN ya que segun con las claves determinadas hay dependencias que no cumple con  `X → Y`.