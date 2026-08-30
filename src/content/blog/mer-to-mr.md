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

![Diagrama entidad-relación usado para practicar la transformación a MR.](image/theme-showcase/mer-zoologico.png)

## Así fue como apliqué las reglas paso a paso:

### Paso 1 — Atributos multivaluados

Busqué óvalos dobles (un atributo con varios valores posibles). En el diagrama no hay ninguno. **No aplica.**

### Paso 2 — Atributos compuestos

Busqué la representación de estos atributos (un atributo dividido en partes). Tampoco hay. **No aplica.**

### Paso 3 — Cada entidad se convierte en una tabla

El atributo subrayado de cada entidad es su identificador → se vuelve la PK.

- `CONTINENTE (nombre PK)`
- `HABITAT (nombre PK, clima, veg.)`
- `ZONA (nombre PK, extension)`
- `CUIDADOR (nombre PK, dir., tel.)`
- `ITINERARIO (i# PK, duracion, long., visitantes)`
- `GUIA (nombre PK, dir., tel., fecha)`
- `ESPECIE (nombC PK, nombE, desc.)` 

### Paso 4-5 — Para relaciones con cardinalidades tipo 1:1

### Pasos 6-7 — Relaciones 1:N

Regla: la PK del lado "1" pasa como FK al lado "N" (porque cada fila del lado N solo puede asociarse a una fila del lado 1, así que cabe perfectamente como columna extra).

`ESPECIE` — `ZONA` es N:1 ("está en"). El "1" es `ZONA`, el "N" es `ESPECIE`. Entonces `zona_nombre` (la PK de `ZONA`) se agrega como FK dentro de `ESPECIE`:

→ `ESPECIE (nombC PK, nombE, desc., zona_nombre FK)`

### Paso 8 — Relaciones N:M

Regla: cuando ambos lados pueden repetirse (M:N), no cabe la FK en ninguna de las dos tablas (una especie tiene varios cuidadores y un cuidador cuida varias especies). Por eso se crea una tabla nueva, cuya PK es la combinación de las PK de ambas entidades. Si la relación tenía un atributo propio (como `fecha` o `hora`), ese atributo también se agrega ahí, porque describe la relación misma, no a ninguna entidad por separado.

Relaciones N:M en el diagrama:

1. `HABITAT`–`CONTINENTE` ("está en") → `HABITAT_CONTINENTE (habitat_nombre FK+PK, continente_nombre FK+PK)`
2. `HABITAT`–`ESPECIE` ("vive en") → `VIVE_EN (habitat_nombre FK+PK, especie_nombC FK+PK)`
3. `ESPECIE`–`CUIDADOR` ("cuida", atributo `fecha`) → `CUIDA (especie_nombC FK+PK, cuidador_nombre FK+PK, fecha)`
4. `ZONA`–`ITINERARIO` ("recorre") → `RECORRE (zona_nombre FK+PK, itinerario_i# FK+PK)`
5. `ITINERARIO`–`GUIA` ("lleva", atributo `hora`) → `LLEVA (itinerario_i# FK+PK, guia_nombre FK+PK, hora)`

### Pasos 9-11 — n-arias, roles, generalización/especialización

No aplican porque en el diagrama todas las relaciones son binarias, sin roles repetidos ni jerarquías de subtipos.

### Resultado final: 12 tablas

7 de entidades + 5 de relaciones N:M.
## Modelo Relacional
![Modelo Relacional.](image/theme-showcase/mr-zoologico.png)



