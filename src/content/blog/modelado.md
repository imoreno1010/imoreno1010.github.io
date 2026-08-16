---
title: "Modelo Entidad-Relación (MER)"
date: "2026-08-14T00:00:00-05:00"
description: "Todo lo relacionado con Modelo Entidad-Relación: sus componentes o elementos, tipos de atributos, cardinalidades, y un ejercicio MER aplicado a una plataforma de streaming."
draft: false
categories:
  - "Evidencias"
tags:
  - "Modelado"
---
El Modelo Entidad-Relación (MER) es un modelo conceptual, un proceso para "pintar" que sirve para organizar los datos de un sistema, antes de pasar al diseño lógico o físico de la base de datos.

<!-- more -->

## Los 5 elementos del MER

Todo modelo entidad-relación debe tener estos 5 elementos:

1. **Entidades** — Estas se representan con rectángulos, se escriben en mayúscula y en singular (por ejemplo `USUARIO`, no `usuarios`).
2. **Atributos** — Es la información que describe a una entidad.

## Tipos de atributo

- **Simple**: Este no se puede separar en partes más pequeñas.
- **Compuesto**: Se puede dividir (por ejemplo, el `nombre` completo en nombres y apellidos).
- **Derivado**: Se calcula a partir de otro dato (por ejemplo, la `edad` se deriva de la fecha de nacimiento).
- **Multivaluado**: Puede tener más de un valor (por ejemplo, `teléfono` o `correo`).
- **Clave**: Identifica de forma única a la entidad. Puede convivir con otros atributos dentro de la misma entidad, pero toda entidad debe tener al menos uno.

3. **Llave primaria / atributos clave** — Es el atributo que identifica de forma única cada registro de una entidad.
4. **Relaciones** — Estas se representan con rombos y siempre se nombran con un verbo en infinitivo (verbos como por ejemplo `comprar` — `tener` — `realizar`).
5. **Cardinalidades** — Estas indican cuántas veces puede relacionarse una entidad con otra.

## Cardinalidades

Las cardinalidades definen cómo se relacionan las entidades entre sí:

- **Uno a uno (1:1)**
- **Uno a muchos (1:M)** — Asi mismo de **Muchos a uno (M:1)** visto desde el otro lado
- **Muchos a muchos (M:N)**

## Atributos clave artificiales

Otro concepto clave: Inicialmente todos los atributos son "naturales" (pertenecen realmente al objeto que describen). Los atributos **artificiales** son los que no pertenecen naturalmente a la entidad, sino que se asignan para poder identificarla de forma única — por ejemplo, un código (`CC`) generado por el sistema. A esto también se le llama **atributo subrogado clave**.

Un buen atributo clave debe cumplir 4 condiciones:
- Ser único
- No poder cambiar en el tiempo
- No ser nulo
- Preferiblemente ser de tipo numérico

## Ejercicio aplicado: plataforma de streaming

El ejercicio planteaba lo siguiente, La Universidad El Bosque desea lanzar una plataforma de streaming, en la cual cada estudiante tenga acceso a contenido como; series, películas, documentales, video , entre otros. El sistema de información debe almacenar los datos de cada uno de los tipos de contenido, productor, año de lanzamiento, categoría a la que pertenecen, usuarios de la plataforma, gustos, categorías más vistas, información personal del usuario, historial de búsquedas, historial de videos vistos. Etc.
Diseñe un modelo Entidad – Relación en el que inicialmente definí las siguientes entidades:

- **USUARIO** (cédula, nombres, apellidos, correo, contraseña, edad)
- **HISTORIAL_BUSQUEDA** (id_búsqueda, texto_búsqueda, fecha_búsqueda)
- **HISTORIAL_VISTO** (id_historial, fecha_visto)
- **TIPO_CONTENIDO** (id_tipo, tipo)
- **CONTENIDO** (id_contenido, título, año_lanzamiento, duración)
- **PRODUCTOR** (id_productor, nombre_productor)
- **CATEGORIA** (id_categoría, nombre_categoría)

Y estas relaciones, con sus cardinalidades:

- `USUARIO` **realizar** `HISTORIAL_BUSQUEDA` (1:M)
- `USUARIO` **ver** `HISTORIAL_VISTO` (1:M)
- `HISTORIAL_VISTO` **registrar** `CONTENIDO` (M:1)
- `TIPO_CONTENIDO` **tener** `CONTENIDO` (1:M)
- `CONTENIDO` **tener** `PRODUCTOR` (M:1)
- `CONTENIDO` **pertenecer** `CATEGORIA` (M:M)

![Modelo Entidad - Relación de la plataforma de streaming, hecho a mano en mi cuaderno.](image/theme-showcase/mer-streaming.jpeg)

Finalmente, este ejercicio me ayudó a entender y mejorar en la parte de cómo aplicar los 5 elementos del MER en un caso real y a practicar la diferencia entre todas las cardinalidades y relaciones.