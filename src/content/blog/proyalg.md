---
title: "Proyecto: Álgebra relacional (50 ejercicios)"
date: "2026-10-12T12:00:00-05:00"
description: "50 ejercicios de álgebra relacional sobre el modelo del conjunto residencial."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---

## ¿De qué trata este post?

El álgebra relacional es el lenguaje formal sobre el que se apoya SQL: cada consulta se expresa como una combinación de operadores que reciben una o dos relaciones (tablas) y devuelven otra relación. En este post se aplica a la base de datos del conjunto residencial. Los 50 ejercicios están planteados sobre las tablas del modelo relacional ya normalizado hasta 3FN, el mismo que quedó en el post de normalización. 

## El modelo sobre el que se consulta

Las consultas usan las 21 tablas del modelo en 3FN. Se pueden agrupar por módulos:

- **Personas y casas:** `PERSONA`, `TELEFONO`, `PROPIETARIO`, `ARRENDATARIO`, `RESIDENTE`, `VISITANTE`, `CASA`, `POSESION`, `ARRIENDO`, `RESIDENCIA` y `VISITA`.
- **Parqueadero:** `VEHICULO`, `CELDA_PARQUEADERO`, `ASIGNACION_CELDA` y `PARQUEO`.
- **Salón comunal y sanciones:** `RESERVA_SALON` y `SANCION`.
- **Finanzas:** `CONCEPTO_COBRO`, `FACTURA`, `DETALLE_FACTURA` y `PAGO`.


## Cómo están organizados los ejercicios

Los ejercicios van de menor a mayor dificultad, y cada tramo introduce operadores nuevos:

- **Del 1 al 14:** consultas sobre una sola tabla, con proyección (`π`) y selección (`σ`), incluidas condiciones combinadas con `∧` y `∨`.
- **Del 15 al 31:** reuniones (`⋈`) entre dos o más tablas, con join natural cuando las columnas se llaman igual y con condición cuando no, y con filtros sobre el resultado.
- **Del 32 al 37:** operaciones de conjuntos: unión (`⋃`), intersección (`⋂`) y diferencia (`−`), y el renombrado (`ρ`) para hacer compatibles las relaciones antes de restarlas.
- **Del 38 al 42:** reuniones con filtro y reuniones externas (`⟕` y `⟖`), que conservan las filas sin pareja y rellenan con `NULL` lo que no tiene correspondencia.
- **Del 43 al 50:** agrupamiento (`Ģ`) con `COUNT`, `SUM` y `AVG`, columnas calculadas con `EXTEND`, y la división (`÷`) para consultas del tipo "los que cumplen con todos".

## Los 50 ejercicios

Estos son los 50 ejercicios de álgebra relacional del proyecto del conjunto residencial, planteados sobre el modelo relacional normalizado hasta 3FN.

<!-- more -->

**1.** El número y la manzana de todas las casas.

`πnumero, manzana (CASA)`

**2.** El correo de todas las personas.

`πcorreo (PERSONA)`

**3.** La placa y la marca de todos los vehículos.

`πplaca, marca (VEHICULO)`

**4.** El id y el tipo de todas las celdas de parqueadero.

`πid_celda,tipo (CELDA_PARQUEADERO)`

**5.** El número y la manzana de las casas que tienen más de 3 habitaciones.

`πnumero, manzana(σnumero_habitaciones > 3(CASA))`

**6.** La placa y el modelo de los vehículos cuyo tipo sea 'MOTO'.

`πplaca, modelo (σtipo = "MOTO"(VEHICULO))`

**7.** El número de factura y el periodo de las facturas cuyo estado sea 'PENDIENTE'.

`πnumero_factura, periodo(σestado = "PENDIENTE"(FACTURA))`

**8.** El id del contrato y la cuota mensual de los arriendos cuya cuota mensual sea mayor a 1500000 y cuyo estado de contrato sea 'VIGENTE'.

`πid_contrato, cuota_mensual (σcuota_mensual > 1500000 ∧ estado_contrato = "VIGENTE"(ARRIENDO))`

**9.** Los métodos de pago que se han usado en la tabla PAGO, sin repetir.

`πmetodo_pago(PAGO)`

**10.** La placa y el modelo de los vehículos cuyo tipo sea 'CARRO' y cuyo modelo sea mayor a 2020.

`πplaca, modelo(σtipo = "CARRO" ∧ modelo > 2020(VEHICULO))`

**11.** El número y la manzana de las casas con área mayor a 120 y con al menos 3 habitaciones.

`πnumero, manzana (σarea > 120 ∧ numero_habitaciones >= 3(CASA))`

**12.** El id, el tipo y el valor de las sanciones cuyo valor sea mayor a 200000 o cuyo tipo sea 'RUIDO'.

`πid_sancion,tipo, valor (σvalor > 200000 ∨ tipo = "RUIDO"(SANCION))`

**13.** El id de la reserva, el valor del depósito y el valor por hora de las reservas de salón cuyo estado sea 'CONFIRMADA'.

`πid_reserva, valor_deposito, valor_por_hora (σestado = "CONFIRMADA" (RESERVA_SALON))`

**14.** Los distintos estados que puede tener una factura, sin repetir.

`πestado(FACTURA)`

**15.** El primer nombre y primer apellido de todos los propietarios.

`πprimer_nombre, primer_apellido(PROPIETARIO ⋈ PERSONA )`

**16.** El primer nombre y correo de todos los residentes.

`πprimer_nombre, correo (PERSONA ⋈ RESIDENTE)`

**17.** El primer nombre de cada persona junto con sus teléfonos (primer nombre y teléfono).

`πprimer_nombre,telefono(PERSONA ⋈ (tipo_documento = persona_tipo_documento ∧ numero_documento = persona_numero_documento)TELEFONO)`

**18.** La placa, marca y primer nombre del dueño de cada vehículo.

`πplaca, marca, primer_nombre(PERSONA ⋈ (tipo_documento = persona_tipo_documento ∧ numero_documento = persona_numero_documento)VEHICULO)`

**19.** El número de línea, el valor de la línea y el periodo de la factura a la que pertenece, para todas las líneas de factura.

`πnumero_linea, valor, periodo(FACTURA ⋈ (numero_factura = factura_numero_factura)DETALLE_FACTURA)`

**20.** El valor de cada línea de factura junto con el nombre del concepto de cobro asociado.

`π valor, nombre(DETALLE_FACTURA ⋈ (id_concepto = concepto_cobro_id_concepto)CONCEPTO_COBRO)`

**21.** El id del pago, su valor y el primer nombre de la persona que lo hizo.

`πid_pago, valor, primer_nombre(PAGO ⋈ (persona_tipo_documento = tipo_documento ⋀ persona_numero_documento = numero_documento)PERSONA)`

**22.** El id de la reserva y el estado de las reservas de salón, junto con el área de la casa que hizo la reserva.

`πid_reserva, estado, area(RESERVA_SALON ⋈ (casa_numero = numero ∧ casa_manzana = manzana)CASA)`

**23.** La fecha de ingreso y primer nombre de los residentes que viven en la casa número 1 de la manzana 1.

`πfecha_ingreso, primer_nombre(σcasa_numero = 1 ∧ casa_manzana = 1(RESIDENCIA ⋈ (residente_tipo_documento = tipo_documento ∧ residente_numero_documento = numero_documento) PERSONA))`

**24.** El porcentaje de posesión y primer nombre de los propietarios de la casa número 3 de la manzana 2.

`πporcentaje, primer_nombre(σcasa_numero = 3 ∧ casa_manzana = 2 (POSESION ⋈ (propietario_tipo_documento = tipo_documento ∧ propietario_numero_documento = numero_documento)PERSONA))`

**25.** El primer nombre y correo de los visitantes que han entrado a la casa número 4 de la manzana 2.

`πprimer_nombre, correo(σcasa_numero = 4 ∧ casa_manzana = 2(VISITA ⋈ (visitante_tipo_documento = tipo_documento ∧ visitante_numero_documento = numero_documento) PERSONA))`

**26.** El Id del parqueo, placa del vehículo y tipo de la celda donde parqueó, para todos los parqueos.

`πid_parqueo, vehiculo_placa,tipo(CELDA_PARQUEADERO ⋈ (id_celda = celda_parqueadero_id_celda) PARQUEO)`

**27.** El primer nombre del propietario, porcentaje de posesión y área de la casa, para todas las posesiones.

`πprimer_nombre, porcentaje, area((POSESION ⋈ (propietario_tipo_documento = tipo_documento ∧ propietario_numero_documento = numero_documento) PERSONA) ⋈ (casa_manzana = manzana ∧ casa_numero = numero)CASA)`

**28.** El número de factura, estado de la factura y primer nombre de la persona que pagó, para los pagos hechos con método 'EFECTIVO'.

`πnumero_factura, estado, primer_nombre(σmetodo_pago = "EFECTIVO"((FACTURA ⋈ (numero_factura = factura_numero_factura)PAGO) ⋈ (persona_tipo_documento = tipo_documento ∧ persona_numero_documento = numero_documento)PERSONA))`

**29.** El primer nombre y teléfono de todos los propietarios.

`πprimer_nombre,telefono((PROPIETARIO ⋈ PERSONA) ⋈ (tipo_documento = persona_tipo_documento ∧ numero_documento = persona_numero_documento) TELEFONO)`

**30.** El número de factura, valor de la línea y nombre del concepto de cobro, de las facturas del periodo '2026-10'.

`πnumero_factura, valor, nombre (σperiodo = "2026 − 10"((FACTURA ⋈ (numero_factura = factura_numero_factura) DETALLE_FACTURA) ⋈ (concepto_cobro_id_concepto = id_concepto)CONCEPTO_COBRO))`

**31.** El primer nombre del arrendatario y cuota mensual, de los contratos con estado 'VIGENTE'.

`πprimer_nombre, cuota_mensual(σ estado_contrato = "VIGENTE" ((ARRIENDO ⋈ (arrendatario_tipo_documento = tipo_documento ∧ arrendatario_numero_documento = numero_documento)ARRENDATARIO) ⋈ PERSONA))`

**32.** El tipo y número de documento de las personas que son propietarias o arrendatarias.

`π tipo_documento, numero_documento(PROPIETARIO ⋃ ARRENDATARIO)`

**33.** El tipo y número de documento de las personas que son propietarias y residentes a la vez.

`𝜋tipo_documento, numero_documento(PROPIETARIO ⋂ RESIDENTE)`

**34.** El tipo y número de documento de las personas que no son propietarias.

`πtipo_documento, numero_documento(PERSONA) − PROPIETARIO`

**35.** El primer nombre y primer apellido de las personas que no son residentes.

`πprimer_nombre, primer_apellido((πtipo_documento, numero_documento(PERSONA) − RESIDENTE) ⋈ 𝑃𝐸𝑅𝑆𝑂𝑁𝐴)`

**36.** El número y manzana de las casas que tienen factura, pero no tienen sanción.

`ρ R(numero, manzana)(πcasa_numero, casa_manzana(FACTURA) − πcasa_numero, casa_manzana(SANCION))`

**37.** La placa de los vehículos que nunca han entrado al parqueadero.

`𝜋placa(VEHICULO) - 𝜌 P(placa) (𝜋vehiculo_placa (PARQUEO))`

**38.** El número de factura y valor de las líneas de factura cuyo valor sea mayor a 100000.

`𝜋 numero_factura, valor (𝜎valor > 100000 (FACTURA ⋈ ( numero_factura = factura_numero_factura) (DETALLE_FACTURA)))`

**39.** El primer nombre de todas las personas y su teléfono, incluyendo las que no tienen teléfono.

`𝜋primer_nombre,telefono(PERSONA ⟕ (tipo_documeneto = persona_tipo_documento ∧ numero_documento = persona_numero_documento)(TELEFONO))`

**40.** El número y manzana de todas las casas y el número de factura de sus facturas, incluyendo las casas que no tienen ninguna factura.

`𝜋numero, manzana, numero_factura(CASA ⟕ (numero = casa_numero ∧ manzana = casa_manzana)(FACTURA))`

**41.** El Id de todas las celdas de parqueadero y el id de la asignación que tengan, incluyendo las celdas sin asignación.

`𝜋id_celda, id_asignacion (ASIGNACION_CELDA ⟖(celda_parqueadero_id_celda = id_celda) (CELDA_PARQUEADERO))`

**42.** El primer nombre de la persona y fecha de los pagos cuyo valor sea mayor a 500000.

`𝜋primer_nombre, fecha (𝜎valor > 500000(PERSONA ⋈ (tipo_documento = persona_tipo_documento ∧ numero_documento = persona_numero_documento)(PAGO)))`

**43.** Cuántas facturas tiene cada casa.

`casa_numero, casa_manzana Ģ COUNT(numero_factura) AS CUANTAS (FACTURA)`

**44.** El total de cada factura.

`factura_numero_factura Ģ SUM(valor) AS TOTAL (DETALLE_FACTURA)`

**45.** El valor promedio de la cuota mensual de los arriendos, por estado de contrato. (Agrupamiento con AVG.)

`estado_contrato Ģ AVG(cuota_mensual) AS promedio(ARRIENDO)`

**46.** Para cada reserva de salón, el id y el total a pagar, calculado como las horas reservadas por el valor por hora.

`πid_reserva,total_pagar(EXTEND RESERVA_SALON ADD (hora_final − hora_inicio) ∗ valor_por_hora AS total_pagar)`

**47.** Tipo y número de documento de los propietarios que tienen posesión de todas las casas de la manzana 1.

`(π propietario_tipo_documento, propietario_numero_documento, casa_numero(σcasa_manzana = 1( POSESION))) ÷ (ρ C(casa_numero)(π numero (σ manzana = 1 ( CASA))))`

**48.** El primer nombre de cada persona y cuántos teléfonos tiene.

`𝜋 primer_nombre,telefonos (PERSONA ⋈ (tipo_documento = persona_tipo_documento ∧ numero_documento = persona_numero_documento)(persona_tipo_documento, persona_numero_documento Ģ COUNT (telefono)AS telefonos (TELEFONO)))`

**49.** El id de las reservas de salón cuyo total a pagar sea mayor a 300000, junto con ese total.

`πid_reserva,total_pagar(σtotal_pagar > 300000 (EXTEND RESERVA_SALON ADD (hora_final − hora_inicio) ∗ valor_por_hora AS total_pagar))`

**50.** El primer nombre y el total pagado por cada persona que ha realizado pagos.

`𝜋primer_nombre,total_pagado(PERSONA ⋈ (tipo_documento = persona_tipo_documento ∧ numero_documento = persona_numero_documento)(persona_tipo_documento, persona_numero_documento Ģ SUM (valor) AS total_pagado(PAGO)))`