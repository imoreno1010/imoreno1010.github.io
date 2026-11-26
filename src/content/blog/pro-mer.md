---
title: "Proyecto: Modelo Entidad-Relación"
date: "2026-09-25T12:00:00-05:00"
description: "Modelo entidad-relación (notación Chen) del conjunto residencial: 16 entidades, tipos de atributos, entidad débil y relaciones con sus cardinalidades."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Este es el Modelo Entidad-Relación (MER) del proyecto de gestión de un conjunto residencial de casas, hecho en notación Chen. Es el modelo conceptual: organiza los datos del sistema antes de pasar al modelo relacional y a la implementación.

<!-- more -->

![Modelo Entidad-Relación del conjunto residencial, en notación Chen.](image/theme-showcase/mer.drawio.png)

## Cómo se aplicaron los 5 elementos del MER

El modelo tiene **16 entidades** y **24 relaciones**, y sigue las convenciones del MER: las entidades se escriben en mayúscula y en singular (`CASA`, no `CASAS`), y las relaciones se nombran con un verbo en infinitivo (`poseer`, `habitar`, `generar`).

### Entidades

Las 16 entidades se organizan por módulos, igual que en los requerimientos del proyecto:

- **Personas y casas:** `CASA`, `PERSONA`, `PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE`, `VISITANTE` y `CONTRATO_ARRIENDO`.
- **Finanzas:** `CONCEPTO_COBRO`, `FACTURA`, `DETALLE_FACTURA` y `PAGO`.
- **Parqueadero:** `CELDA_PARQUEADERO`, `ASIGNACIÓN_CELDA` y `VEHICULO`.
- **Salón comunal:** `RESERVA_SALON`.
- **Sanciones:** `SANCION`.

Una decisión importante fue manejar los roles de la persona como entidades separadas (`PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE` y `VISITANTE`), cada una unida a `PERSONA` por una relación `ser` de cardinalidad 1:1. Así, una misma persona puede ser propietaria de una casa y arrendataria de otra, o tener varios roles a la vez, o ninguno, como lo exigen los supuestos del proyecto. En el modelo extendido esto se vuelve a representar como una especialización.

### Atributos

En el modelo aparecen todos los tipos de atributo:

- **Simples:** por ejemplo `placa`, `marca`, `area` o `estado`, que no se pueden dividir.
- **Compuestos:** `nombre_completo` en `PERSONA`, que se divide en `primer_nombre`, `segundo_nombre`, `primer_apellido` y `segundo_apellido`. También son compuestos `identificación` (formado por `tipo_documento` y `numero_documento`) e `id_casa` (formado por `manzana` y `numero`).
- **Multivaluado:** `telefono` en `PERSONA`, porque una persona puede tener varios teléfonos (se dibuja con una elipse doble).
- **Derivados:** `horas_reservadas` y `total_pagar` en `RESERVA_SALON` (se dibujan con una elipse punteada). No se guardan, porque se calculan a partir de `hora_inicio`, `hora_final` y `valor_por_hora`.
- **Clave:** el atributo subrayado que identifica de forma única a cada registro.

### Llaves primarias

Las llaves primarias se reparten en dos grupos, según si son naturales o artificiales:

- **Naturales:** pertenecen realmente a lo que describen. La `identificación` (tipo y número de documento) identifica a la persona y a sus roles, la `placa` identifica al vehículo, y la combinación `manzana` y `numero` identifica a la casa.
- **Artificiales (subrogadas):** son códigos asignados solo para identificar la entidad: `id_contrato`, `id_celda`, `id_asignacion`, `id_sancion`, `id_reserva`, `id_concepto`, `id_pago` y `numero_factura`.

Cumplen las condiciones de una buena clave: son únicas, no cambian con el tiempo y no pueden ser nulas.

### Entidad débil

`DETALLE_FACTURA` es una entidad débil (doble rectángulo): una línea de detalle no existe por sí sola, solo tiene sentido dentro de una factura. Se identifica con `numero_linea` (clave parcial) junto con la factura a la que pertenece, y su relación con `FACTURA` (`contener`) es una relación identificante, que se dibuja con doble rombo.

## Relaciones y cardinalidades

Estas son las relaciones del modelo, con su cardinalidad leída en el sentido en que está escrita cada una.

**Personas y casas**

- `PERSONA` **ser** `PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE` y `VISITANTE` (1:1, cada una)
- `PROPIETARIO` **poseer** `CASA` (M:N), con los atributos `porcentaje`, `fecha_compra` y `fecha_venta`
- `RESIDENTE` **habitar** `CASA` (M:M), con los atributos `fecha_ingreso` y `fecha_salida`
- `PROPIETARIO` **firmar** `CONTRATO_ARRIENDO` (1:M)
- `ARRENDATARIO` **asumir** `CONTRATO_ARRIENDO` (1:M)
- `CONTRATO_ARRIENDO` **recaer** `CASA` (M:1)

**Parqueadero**

- `PERSONA` **tener** `VEHICULO` (1:M)
- `VEHICULO` **parquear** `CELDA_PARQUEADERO` (M:M), con los atributos `fecha_hora_entrada` y `fecha_hora_salida`
- `VISITANTE` **visitar** `CASA` (M:M), con los atributos `fecha_entrada` y `fecha_salida`
- `CELDA_PARQUEADERO` **asignar** `ASIGNACIÓN_CELDA` (1:M)
- `CASA` **adquirir** `ASIGNACIÓN_CELDA` (1:M)

**Finanzas**

- `CASA` **generar** `FACTURA` (1:M)
- `FACTURA` **contener** `DETALLE_FACTURA` (1:M, relación identificante)
- `CONCEPTO_COBRO` **referenciar** `DETALLE_FACTURA` (1:M)
- `PAGO` **realizar** `FACTURA` (M:1)
- `PERSONA` **realizar** `PAGO` (1:M)

**Salón comunal y sanciones**

- `CASA` **solicitar** `RESERVA_SALON` (1:M)
- `CASA` **recibir** `SANCION` (1:M)
- `RESERVA_SALON` **facturar** `DETALLE_FACTURA` (1:1)
- `SANCION` **facturar** `DETALLE_FACTURA` (1:1)
- `ASIGNACIÓN_CELDA` **cobrar** `DETALLE_FACTURA` (1:M)

## Decisiones de diseño

- **Atributos en las relaciones.** Los atributos que dependen de la relación y no de una sola entidad van en el rombo: las fechas y el porcentaje de `poseer`, las fechas de `habitar` y `visitar`, y las fechas y horas de `parquear`. Con ellos se conserva el historial de propiedad, ocupación, visitas y parqueos.
- **Muchos a muchos con historial.** Una persona puede volver a ser propietaria de la misma casa en otro periodo, y un vehículo puede parquear muchas veces en la misma celda. Por eso estas relaciones son M:M y llevan fechas.
- **La factura conserva lo cobrado.** Cada `DETALLE_FACTURA` guarda su propio `valor`, de modo que la factura no cambia si después se modifica el `valor_base` del `CONCEPTO_COBRO`.
- **Una línea de factura, un origen.** Una línea de detalle se liga a una reserva, a una sanción o a una asignación de celda, pero como máximo a una de ellas. Las líneas de administración mensual o cuotas extraordinarias no se ligan a ninguna, y se cobran solo con su concepto de cobro. Por eso las relaciones `facturar` y `cobrar` unen cada una a `DETALLE_FACTURA` por separado.
- **Un solo contrato vigente por casa.** El contrato de arriendo es una entidad propia, relacionada con el propietario que lo firma, con el arrendatario que lo asume y con la casa sobre la que recae.

## Conclusión

Este modelo me permitió aplicar en un caso real todos los elementos del MER: entidades, atributos de todos los tipos, llaves naturales y artificiales, una entidad débil y relaciones de todas las cardinalidades, incluidas las M:M con atributos propios. El siguiente paso es el modelo entidad-relación extendido, que representa los roles de la persona como especialización y el contrato de arriendo como agregación.