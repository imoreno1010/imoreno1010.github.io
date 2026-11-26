---
title: "Proyecto: Modelo Entidad-Relación Extendido"
date: "2026-09-26T13:00:00-05:00"
description: "Modelo entidad-relación extendido del conjunto residencial: especialización de Persona en cuatro roles y agregación del contrato de arriendo."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Este es el Modelo Entidad-Relación Extendido del proyecto de gestión de un conjunto residencial. Parte del MER básico y agrega dos conceptos que permiten representar mejor la realidad del conjunto: la especialización de `PERSONA` en sus roles y la agregación del contrato de arriendo.

<!-- more -->

![Modelo Entidad-Relación Extendido del conjunto residencial, con la especialización de Persona y la agregación Arriendo.](image/theme-showcase/EXTENDIDO.drawio.png)

## ¿Qué es el MER extendido?

El MER extendido (o EER) es el modelo entidad-relación con herramientas adicionales para casos que el modelo básico representa con dificultad. Aquí se usaron dos:

- **Especialización (o generalización):** una entidad general se divide en tipos más específicos, que heredan sus atributos y relaciones.
- **Agregación:** una relación (junto con las entidades que une) se trata como si fuera una entidad, para poder relacionarla con otra.

## Qué cambia respecto al MER básico

El resto del modelo queda igual (finanzas, parqueadero, salón comunal y sanciones). Los cambios están en el módulo de personas y casas:

- Las cuatro relaciones `ser` (1:1) entre `PERSONA` y sus roles se reemplazan por **una sola especialización**.
- La entidad `CONTRATO_ARRIENDO` y las relaciones `firmar` y `asumir` se reemplazan por **la relación `arrendar` y la agregación `ARRIENDO`**.

Por eso el modelo extendido tiene **15 entidades y una agregación**, y **19 relaciones**, en lugar de las 16 entidades y 24 relaciones del básico.

## Especialización de PERSONA

`PERSONA` es la entidad general (supertipo), y de ella se especializan cuatro subtipos: `PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE` y `VISITANTE`. Se dibuja con un triángulo que une la entidad general con sus subtipos.

**Qué se gana.** En el MER básico, cada rol repetía los atributos de identificación (`tipo_documento` y `numero_documento`) y se unía a `PERSONA` con su propia relación `ser`. Con la especialización, cada subtipo **hereda** los atributos de `PERSONA` (nombre, identificación, correo y teléfonos) y no tiene que repetirlos. Los subtipos conservan solo las relaciones que les son propias:

- `PROPIETARIO` **poseer** `CASA`
- `RESIDENTE` **habitar** `CASA`
- `VISITANTE` **visitar** `CASA`
- `ARRENDATARIO` y `PROPIETARIO` participan en **arrendar**

**Tipo de especialización.** Los roles no son excluyentes: una persona puede ser propietaria de una casa y arrendataria de otra, o tener varios roles a la vez (solapada). También puede no tener ninguno (parcial), como pasa con un trabajador o un familiar que solo figura como persona. Esto responde directamente a los supuestos del proyecto (S-20 y S-21), según los cuales los roles de la persona no son excluyentes.

## Agregación ARRIENDO

El contrato de arriendo es una situación particular: no es una cosa que exista por sí sola, sino el resultado de que un **propietario** le arriende a un **arrendatario**, y ese acuerdo **recae sobre una casa**. Dibujado como relación, queda una relación (`arrendar`) que necesita relacionarse con otra entidad (`CASA`), y el modelo básico no permite relacionar una relación con una entidad.

La solución es la **agregación**: se encierra la relación `arrendar`, con el propietario y el arrendatario que la forman, en un recuadro llamado `ARRIENDO`, y ese recuadro se trata como una entidad. Así se puede relacionar con la casa:

- `ARRENDATARIO` **arrendar** `PROPIETARIO` (M:N), con los atributos `id_contrato`, `fecha_inicio`, `fecha_fin`, `cuota_mensual` y `estado_contrato`
- `ARRIENDO` **recaer** `CASA` (M:1)

La relación `arrendar` es M:N porque un propietario puede arrendar a muchos arrendatarios y un arrendatario puede tomar en arriendo de muchos propietarios. Además, lleva los datos del contrato como atributos propios: sus fechas, la cuota mensual y su estado. La relación `recaer` es M:1 porque una casa puede tener muchos arriendos a lo largo del tiempo, pero cada uno recae sobre una sola casa.

Hay reglas que el diagrama no puede mostrar y que se controlan más adelante en la implementación: que exista **un solo contrato vigente por casa** (S-3) y que el arrendatario del contrato **no pueda ser propietario de esa misma casa** (S-39).

## Entidades y relaciones

**Personas y casas**

- `PERSONA` se especializa en `PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE` y `VISITANTE`
- `PROPIETARIO` **poseer** `CASA` (M:N), con los atributos `porcentaje`, `fecha_compra` y `fecha_venta`
- `RESIDENTE` **habitar** `CASA` (M:M), con los atributos `fecha_ingreso` y `fecha_salida`
- `ARRENDATARIO` **arrendar** `PROPIETARIO` (M:N), formando la agregación `ARRIENDO`
- `ARRIENDO` **recaer** `CASA` (M:1)

**Parqueadero**

- `PERSONA` **tener** `VEHICULO` (1:M)
- `VEHICULO` **parquear** `CELDA_PARQUEADERO` (M:M), con los atributos `fecha_hora_entrada` y `fecha_hora_salida`
- `VISITANTE` **visitar** `CASA` (M:M), con los atributos `fecha_entrada` y `fecha_salida`
- `CELDA_PARQUEADERO` **asignar** `ASIGNACION_CELDA` (1:M)
- `CASA` **adquirir** `ASIGNACION_CELDA` (1:M)

**Finanzas**

- `CASA` **generar** `FACTURA` (1:M)
- `FACTURA` **contener** `DETALLE_FACTURA` (1:M, relación identificante de la entidad débil)
- `CONCEPTO_COBRO` **referenciar** `DETALLE_FACTURA` (1:M)
- `PAGO` **realizar** `FACTURA` (M:1)
- `PERSONA` **realizar** `PAGO` (1:M)

**Salón comunal y sanciones**

- `CASA` **solicitar** `RESERVA_SALON` (1:M)
- `CASA` **recibir** `SANCION` (1:M)
- `RESERVA_SALON` **facturar** `DETALLE_FACTURA` (1:1)
- `SANCION` **facturar** `DETALLE_FACTURA` (1:1)
- `ASIGNACION_CELDA` **cobrar** `DETALLE_FACTURA` (1:M)

Los atributos, las llaves y la entidad débil `DETALLE_FACTURA` son los mismos que en el MER básico, y se explican en el post anterior.

## Conclusión

El modelo extendido representa mejor el problema que el básico: la especialización evita repetir datos y deja claro que los roles son variantes de una misma persona, y la agregación permite que el contrato de arriendo, que nace de la relación entre propietario y arrendatario, se vincule con la casa. El siguiente paso es transformar este modelo al modelo relacional.