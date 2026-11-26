---
title: "Proyecto: Modelo lógico y relacional en Data Modeler"
date: "2026-11-25T14:00:00-05:00"
description: "El modelo del conjunto residencial en Oracle SQL Developer Data Modeler: modelo lógico (21 entidades) y modelo relacional (21 tablas) generado a partir de él."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Después de dibujar el MER y el MER extendido, el modelo del conjunto residencial se construyó en Oracle SQL Developer Data Modeler. Ahí quedó en dos niveles: el **modelo lógico**, que es el diagrama de entidades y relaciones ya preparado para implementarse, y el **modelo relacional**, que son las tablas con sus llaves primarias y foráneas.

<!-- more -->

## ¿Qué tipo de modelo es?

Este diagrama **no está en notación de Peter Chen**. En los modelos anteriores las entidades eran rectángulos, las relaciones eran rombos y los atributos eran elipses. En Data Modeler es distinto:

- **Las entidades** se dibujan como cajas que traen los atributos dentro, listados uno debajo de otro.
- **Las relaciones** son líneas entre las cajas, sin rombo, que muestran la cardinalidad en sus extremos: la "pata de gallo" (tres rayitas) marca el lado "muchos", y cada mitad de la línea es continua si la participación es obligatoria o punteada si es opcional. Los atributos de una relación ya no pueden ir "colgados" del rombo, así que esas relaciones se convierten en entidades propias.
- **Los atributos** llevan símbolos que indican su naturaleza (los explico abajo).

Sigue siendo un modelo entidad-relación, pero escrito en la notación de Barker (la que usa Oracle por defecto) y con más detalle: ya trae llaves primarias, tipos de dato y las relaciones muchos a muchos resueltas. Por eso se llama **modelo lógico**. El segundo nivel, el **modelo relacional**, es el de tablas: lo genera la herramienta a partir del lógico.

## El modelo lógico

El modelo lógico tiene **21 entidades** y **25 relaciones**, más **4 jerarquías** (la especialización de `PERSONA`).

![Modelo lógico (parte 1):] (image/theme-showcase/logicaluno.png)
![Modelo lógico (parte 2):] (image/theme-showcase/logicaldos.png)

![Modelo lógico (parte 3): POSESION, ARRIENDO, RESIDENCIA, CASA, FACTURA y PAGO.](image/datamodel-logico-3.png)

### Cómo leer la notación

Cada atributo lleva un símbolo al lado:

- **`#`**: es el identificador único de la entidad (su llave primaria). `CASA` tiene dos, `numero` y `manzana`, porque una casa se identifica por la combinación de ambos.
- **`*`**: el atributo es obligatorio, no puede quedar vacío.
- **`o`**: el atributo es opcional. Por ejemplo, `correo`, `segundo_nombre` y `segundo_apellido` en `PERSONA`, o `marca` y `modelo` en `VEHICULO`.

También hay atributos opcionales por una razón del negocio: las **fechas de fin** (`fecha_fin` en `ARRIENDO` y en `ASIGNACION_CELDA`, `fecha_salida` en `RESIDENCIA`, `VISITA` y `PARQUEO`, y `fecha_venta` en `POSESION`) se dejan vacías mientras el registro siga vigente, y solo se llenan al cerrarlo. Así se conserva el historial sin borrar nada.

### Qué cambia respecto al MER extendido

Las 15 entidades del MER extendido siguen, pero se agregan 6 más, que salen de resolver lo que la notación no permite dibujar directamente:

- **Relaciones muchos a muchos con atributos** (`poseer`, `habitar`, `visitar` y `parquear`): cada una se convierte en una entidad propia, que guarda sus datos y su historial. Quedan así `POSESION` (con `porcentaje`, `fecha_compra` y `fecha_venta`), `RESIDENCIA` (con `fecha_ingreso` y `fecha_salida`), `VISITA` (con `fecha_entrada` y `fecha_salida`) y `PARQUEO` (con `fecha_hora_entrada` y `fecha_hora_salida`). Cada una lleva su propio identificador (`id_posesion`, `id_residencia`, `id_visita` y `id_parqueo`), lo que permite que la misma persona vuelva a poseer o visitar la misma casa en otra fecha.
- **La agregación `ARRIENDO`:** se convierte en una entidad con el identificador `id_contrato`, los datos del contrato (`fecha_inicio`, `fecha_fin`, `cuota_mensual` y `estado_contrato`) y tres relaciones: con el propietario que firma (`firmar`), con el arrendatario que lo asume (`asumir`) y con la casa sobre la que recae (`recaer`).
- **El atributo multivaluado `telefono`:** se convierte en la entidad `TELEFONO`, ligada a `PERSONA`, para que una persona pueda tener varios teléfonos.

### Las 21 entidades

- **Personas y casas:** `PERSONA` (con sus subtipos `PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE` y `VISITANTE`), `TELEFONO` y `CASA`.
- **Historiales de la casa:** `POSESION`, `RESIDENCIA`, `VISITA` y `ARRIENDO`.
- **Parqueadero:** `VEHICULO`, `CELDA_PARQUEADERO`, `ASIGNACION_CELDA` y `PARQUEO`.
- **Finanzas:** `CONCEPTO_COBRO`, `FACTURA`, `DETALLE_FACTURA` y `PAGO`.
- **Salón comunal y sanciones:** `RESERVA_SALON` y `SANCION`.

### La especialización de PERSONA

`PERSONA` es el supertipo y tiene cuatro subtipos (`PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE` y `VISITANTE`). En el diagrama, los subtipos se dibujan dentro de la caja de `PERSONA`, que es como esta notación representa la herencia. Los subtipos no repiten los datos de la persona: los heredan, y se identifican con la misma identificación (`tipo_documento` y `numero_documento`).

## El modelo relacional

A partir del modelo lógico se usó la opción **Ingeniería a Modelo Relacional**, y la herramienta generó automáticamente **21 tablas** y **29 llaves foráneas**. Cada entidad se convirtió en una tabla, cada atributo en una columna con su tipo de dato (`NUMBER`, `VARCHAR2` y `DATE`, que son los tipos de Oracle), y las relaciones se resolvieron con llaves foráneas (`F`) que apuntan a la llave primaria (`P`) de otra tabla.

En el modelo relacional las tablas se dibujan en amarillo. La `P` marca la llave primaria, la `F` la llave foránea y `PF` una columna que es las dos cosas; el asterisco rojo marca las columnas obligatorias.

![Modelo relacional (parte 1):](image/theme-showcase/relauno.png)
![Modelo relacional (parte 2):](image/theme-showcase/relados.png)

### Cómo quedaron las tablas

- **PERSONA:** su llave primaria es compuesta, `(tipo_documento, numero_documento)`.
- **Subtipos:** `PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE` y `VISITANTE` se convirtieron en cuatro tablas separadas. Cada una tiene como llave primaria la identificación de la persona, que a la vez es una llave foránea a `PERSONA` (por eso aparece marcada como `PF`).
- **CASA:** su llave primaria es compuesta, `(numero, manzana)`. Todas las tablas que se relacionan con la casa reciben esas dos columnas como llave foránea (`CASA_numero` y `CASA_manzana`): `FACTURA`, `RESERVA_SALON`, `SANCION`, `ASIGNACION_CELDA`, `POSESION`, `RESIDENCIA`, `VISITA` y `ARRIENDO`.
- **Tablas de historial:** `POSESION`, `RESIDENCIA`, `VISITA`, `PARQUEO` y `ARRIENDO` tienen una llave primaria propia (`id_...`) y llaves foráneas hacia las dos tablas que unen. Por ejemplo, `POSESION` apunta a `CASA` y a `PROPIETARIO`, y `ARRIENDO` apunta a `ARRENDATARIO`, `PROPIETARIO` y `CASA`.
- **VEHICULO:** su llave primaria es la `placa`, y tiene una llave foránea hacia `PERSONA`, que es su dueño.
- **TELEFONO:** guarda cada teléfono con una llave foránea a `PERSONA`.
- **DETALLE_FACTURA:** como era una entidad débil, su llave primaria es compuesta, `(numero_linea, numero_factura)`, y la columna `numero_factura` también es llave foránea hacia `FACTURA`. Además tiene llaves foráneas hacia `CONCEPTO_COBRO` y tres opcionales hacia `ASIGNACION_CELDA`, `RESERVA_SALON` y `SANCION`, porque una línea se liga como máximo a una de las tres.
- **PAGO:** tiene llaves foráneas hacia `FACTURA` (a cuál se abona) y hacia `PERSONA` (quién paga).

Las 29 llaves foráneas se crearon con la regla de borrado `NO ACTION`, es decir, no se puede eliminar un registro que otro todavía referencia. Eso protege el historial.

### Atributos derivados

`horas_reservadas` y `total_pagar` de `RESERVA_SALON` no se guardan en ninguna tabla, porque se calculan a partir de `hora_inicio`, `hora_final` y `valor_por_hora`. El `total` de la factura también se trató como derivado: se calcula sumando el `valor` de sus líneas.

## Conclusión

Pasar el modelo a Data Modeler obligó a decidir los detalles que el MER deja abiertos: resolver las relaciones muchos a muchos con sus historiales, elegir llaves primarias (compuestas y artificiales) y definir tipos de dato y obligatoriedad. Con el modelo relacional ya generado, el siguiente paso es revisar su normalización hasta la Tercera Forma Normal.