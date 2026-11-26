---
title: "Proyecto: Normalización hasta 3FN"
date: "2026-10-03T12:00:00-05:00"
description: "Normalización del modelo relacional del conjunto residencial: de la tabla original del MER a la Primera, Segunda y Tercera Forma Normal, con los cambios de cada paso."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Este post muestra cómo se normalizó el modelo relacional del proyecto del conjunto residencial. Se parte de las tablas tal como salen de la transformación del MER y se llevan, paso a paso, hasta la Tercera Forma Normal (3FN), explicando qué se cambió en cada una.

<!-- more -->

## Por qué se normaliza

Normalizar es revisar las tablas con una serie de reglas para que cada dato viva en un solo lugar. Así se evitan las anomalías de inserción, eliminación y actualización: por ejemplo, que el nombre de un concepto de cobro quede repetido en muchas filas y, al cambiarlo, se olvide actualizar alguna. La explicación general de cada forma normal está en el post de Normalización; aquí se aplica al proyecto.

## Las formas normales que se aplican

- **Primera Forma Normal (1FN):** cada celda tiene un solo valor (atributos atómicos), no hay atributos multivaluados ni grupos repetidos, y cada tabla tiene su llave primaria definida. En el proyecto esto afecta a los teléfonos de la persona, a las columnas con nombres repetidos y a los atributos derivados.
- **Segunda Forma Normal (2FN):** además de cumplir 1FN, todo atributo que no es llave depende de la llave primaria completa y no solo de una parte. Solo importa en las tablas con llave compuesta, como `PERSONA` (tipo y número de documento), `CASA` (número y manzana) y `DETALLE_FACTURA` (número de línea y factura).
- **Tercera Forma Normal (3FN):** además de cumplir 1FN y 2FN, ningún atributo que no es llave depende de otro atributo que tampoco es llave (dependencia transitiva). En el proyecto esto afecta a `CONCEPTO_COBRO` y a `FACTURA`.

## Punto de partida: las tablas del MER

El punto de partida son las 21 tablas que salen de transformar el modelo entidad-relación al modelo relacional. Tienen cuatro problemas que la normalización va resolviendo:

- `PERSONA` incluye `telefono`, que es un atributo multivaluado, además de existir la tabla `TELEFONO`.
- `ARRIENDO` tiene dos pares de columnas de documento con el mismo nombre (el del propietario y el del arrendatario), que solo se distinguen por su posición.
- `RESERVA_SALON` guarda `horas_reservadas` y `total_pagar`, que son atributos derivados.
- `CONCEPTO_COBRO` trae `numero_linea` y `numero_factura`, y `FACTURA` guarda `total`.

## Primera Forma Normal (1FN)

En 1FN se resolvieron los problemas de atomicidad y de llaves:

- **Teléfonos.** Se quitó la columna `telefono` de `PERSONA`. Los teléfonos quedan solo en la tabla `TELEFONO`, con una fila por cada teléfono de cada persona.
- **Nombres y documentos atómicos.** El nombre ya estaba dividido en cuatro columnas (`primer_nombre`, `segundo_nombre`, `primer_apellido` y `segundo_apellido`) y el documento separado en tipo y número.
- **Documentos en ARRIENDO.** Las columnas de documento se renombraron con prefijo (`arrendatario_tipo_documento`, `arrendatario_numero_documento`, `propietario_tipo_documento` y `propietario_numero_documento`) para que no se confundan.
- **Atributos derivados.** Se quitaron `horas_reservadas` y `total_pagar` de `RESERVA_SALON`, porque se calculan con `hora_inicio`, `hora_final` y `valor_por_hora`.
- **Detalle de factura.** `DETALLE_FACTURA` cumple 1FN porque tiene una fila por cada línea de la factura, y no columnas como `concepto1` o `concepto2`.

Todas las demás tablas ya cumplían 1FN: cada celda tiene un solo valor y la llave primaria está definida.

![1FN, parte 1:](image/theme-showcase/1fnp.png)

![1FN, parte 2:](image/theme-showcase/2fnp.png)

![1FN, parte 3: ](image/theme-showcase/3fnp.png)

## Segunda Forma Normal (2FN)

En 2FN se revisó que no hubiera dependencias parciales. El resultado fue que **no hizo falta cambiar ninguna tabla**:

- **Llave compuesta en PERSONA.** Los nombres y el correo dependen de la llave completa (tipo y número de documento), no de solo uno de los dos.
- **Llave compuesta en CASA.** El área y el número de habitaciones dependen de la casa completa, porque el número solo no la identifica sin la manzana.
- **Llave compuesta en DETALLE_FACTURA.** El valor y las llaves foráneas dependen de la línea completa de esa factura.
- **VEHICULO.** Se identifica solo por la placa, por lo que la marca, el modelo y el tipo dependen únicamente de ella.
- **Tablas con llave simple.** Las demás tablas, como `POSESION`, `ARRIENDO` y `PARQUEO`, tienen una llave de una sola columna (`id_...`), así que no puede haber dependencia parcial.

Quedó pendiente `CONCEPTO_COBRO`: cumple 2FN porque su llave es simple, pero sus columnas `numero_linea` y `numero_factura` se corrigen en el paso siguiente.

![2FN, parte 1: ](image/theme-showcase/4fnp.png)

![2FN, parte 2: ](image/theme-showcase/5fnp.png)

![2FN, parte 3: ](image/theme-showcase/6fnp.png)

## Tercera Forma Normal (3FN)

En 3FN se buscaron atributos que no son llave y que dependen de otro atributo que tampoco es llave. Se hicieron dos cambios:

- **CONCEPTO_COBRO.** Se quitaron `numero_linea` y `numero_factura`. El `nombre`, la `descripcion` y el `valor_base` dependen solo de `id_concepto`, no de una línea de factura. La relación entre ambos ya existe en `DETALLE_FACTURA`, que guarda `concepto_cobro_id_concepto` como llave foránea.
- **FACTURA.** Se eliminó `total`, porque es un atributo derivado: se calcula como la suma del valor de sus líneas en `DETALLE_FACTURA`.

En el resto de las tablas ningún atributo que no es llave determina a otro que tampoco lo es. Por ejemplo, en `VEHICULO` la marca, el modelo y el tipo no se determinan entre sí, y en `ARRIENDO` la cuota, las fechas y el estado dependen del contrato, mientras que los datos de las personas quedan en `PERSONA`.

![3FN, parte 1:](image/theme-showcase/7fnp.png)

![3FN, parte 2: .](image/theme-showcase/8fnp.png)

![3FN, parte 3: ](image/theme-showcase/9fnp.png)

## Conclusión

Después de la normalización, el modelo relacional del conjunto residencial queda en 3FN, con 21 tablas, sin atributos multivaluados, sin atributos derivados guardados y sin dependencias parciales ni transitivas. Los cambios fueron pocos, porque el modelo ya venía bien estructurado desde el MER: lo principal fue separar los teléfonos, quitar los derivados y `CONCEPTO_COBRO`. 