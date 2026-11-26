---
title: "Proyecto: Introducción, alcance y supuestos"
date: "2026-09-11T00:00:00-05:00"
description: "Proyecto final de Bases de Datos 1: gestión de un conjunto residencial de casas. Problemática, objetivos, alcance, requerimientos funcionales y supuestos."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Proyecto final de Bases de Datos 1: el diseño y la implementación de una base de datos para administrar un conjunto residencial de casas. En este post explico de qué trata, qué cubre y qué supuestos se tomaron para delimitar el diseño.

<!-- more -->

## Datos del proyecto

- **Universidad:** Universidad El Bosque
- **Programa:** Ingeniería de Sistemas
- **Asignatura:** Bases de Datos 1
- **Docente:** Christian Felipe Duarte
- **Integrantes:** Isabella Moreno Pérez, Sofia Moreno Pérez y José Manuel Cipagauta Toro

## Problemática

Los conjuntos residenciales de casas que funcionan bajo el régimen de propiedad horizontal manejan gran parte de su gestión de forma manual y dispersa: hojas de cálculo, cuadernos, mensajes de WhatsApp y carpetas físicas. Esto genera desorden en la información, conflictos entre residentes, pérdidas económicas para la administración y falta de trazabilidad en las decisiones. Los problemas más frecuentes son:

- **Falta de claridad sobre quién es quién en cada casa.** No siempre hay registro de quién es el propietario, quién es el arrendatario y quiénes viven realmente en la casa, lo que provoca cobros a la persona equivocada, notificaciones que no llegan y confusión sobre quién responde por los daños o por la deuda.
- **Cartera y cobros desordenados.** No hay un control confiable de quién pagó, quién debe y cuánto debe, y a veces no es claro quién responde por la deuda cuando la casa está arrendada.
- **Conflictos por el parqueadero.** Las celdas de visitantes son ocupadas por residentes, los visitantes se quedan por días, hay vehículos sin registrar y no hay trazabilidad cuando ocurre un daño o un robo.
- **Reservas del salón comunal con problemas.** Hay reservas duplicadas para la misma fecha, reservas de residentes con deudas, depósitos que no se devuelven o se retienen sin soporte, y daños que nadie reconoce.
- **Sanciones sin proceso ni historial.** Las multas se imponen de manera informal, sin registro de notificación ni descargos, y no se sabe quiénes son reincidentes.

La pregunta que orienta el proyecto es: **¿cómo centralizar y estructurar la información de un conjunto residencial de casas para que la administración pueda consultarla de forma confiable, aplicar sus reglas de negocio y tomar decisiones informadas?**

## Objetivo general

Diseñar e implementar una base de datos relacional que centralice y controle la información de la administración de un conjunto residencial de casas (propietarios, arrendatarios, cartera, parqueadero, salón comunal y sanciones), permitiendo consultas confiables, la validación de reglas de negocio y el apoyo a la toma de decisiones. Para ello se aplica el proceso completo de diseño (modelo entidad-relación y modelo relacional normalizado hasta la Tercera Forma Normal) y de implementación en una máquina virtual con Linux, con acceso desde una aplicación web sencilla de demostración.

## Objetivos específicos

1. Modelar la relación entre casas, propietarios, arrendatarios y residentes, conservando el historial de propiedad y de ocupación.
2. Gestionar la facturación, los pagos y la cartera por casa, diferenciando quién es el responsable de la deuda de quién realiza el pago.
3. Controlar el parqueadero (celdas, vehículos y parqueos) y el registro de visitas a las casas, evitando cruces y dejando trazabilidad.
4. Administrar las reservas del salón comunal validando disponibilidad, estado de cartera y sanciones, y registrando el depósito de garantía.
5. Registrar las sanciones con su proceso (notificación, descargos y decisión) y su historial.
6. Elaborar el modelo entidad-relación (notación Peter Chen, extendido y Crow's Foot), transformarlo al modelo relacional y normalizarlo hasta 3FN, documentándolo con un diccionario de datos.
7. Demostrar la manipulación y consulta de los datos mediante álgebra relacional, con un mínimo de 50 ejercicios sobre el modelo del conjunto residencial.
8. Implementar la base de datos en un sistema gestor relacional (distinto de SQL Server) instalado en una máquina virtual con una distribución Linux o Unix, y conectarla a una aplicación web sencilla que permita la lectura de los datos.
9. Gestionar el desarrollo en equipo de tres integrantes con Git y GitHub, con aportes de todos los miembros, y documentar el proceso.

## Alcance

El proyecto comprende el análisis, el diseño y la implementación de una base de datos para un **único conjunto residencial cerrado, conformado exclusivamente por casas**. No se contemplan torres ni apartamentos.

**El proyecto incluye:**

- Gestión de casas, propietarios, arrendatarios y residentes, con historial de propiedad y ocupación.
- Facturación mensual por casa, registro de pagos y cartera en mora y paz y salvo.
- Control del parqueadero: celdas por tipo, vehículos y parqueos, y registro de visitas a las casas.
- Reserva del salón comunal con validaciones y registro del depósito de garantía.
- Sanciones a las casas, con su proceso de notificación, descargos y decisión.
- Consultas y reportes de apoyo a la administración.
- Modelos entidad-relación, modelo relacional en 3FN y diccionario de datos.
- Mínimo 50 ejercicios de álgebra relacional sobre el modelo.
- Implementación en una máquina virtual con Linux o Unix y un gestor de bases de datos distinto de SQL Server.
- Aplicación web sencilla de demostración que se conecta a la base de datos y permite la lectura de los datos.
- Repositorio en GitHub con el código, los scripts y la documentación.

**El proyecto no incluye:**

- Aplicación móvil ni funciones de escritura en la aplicación web: la aplicación web es de demostración y solo permite leer.
- Contabilidad completa, nómina ni facturación electrónica ante la DIAN.
- Pasarela de pagos en línea ni integración con bancos.
- Integración con cámaras, control de acceso o dispositivos físicos.
- Gestión de varios conjuntos residenciales al mismo tiempo.
- Proveedores y contratos de servicios, recolección de basuras, reclamos de posventa a la constructora, mantenimiento de activos, personal, asamblea y votaciones, PQRS, auditoría y roles de usuario, que se consideran posibles ampliaciones futuras.

## Modelo de datos previsto

El modelo tiene 16 entidades (incluidas las cuatro subentidades de Persona), organizadas en cuatro módulos:

- **Personas y casas:** Casa, Persona (con especialización en Propietario, Arrendatario, Residente y Visitante) y Contrato de arriendo. En el modelo extendido, el contrato se representa como la agregación Arriendo, formada por la relación Arrendar entre Propietario y Arrendatario y vinculada a la Casa.
- **Finanzas:** Concepto de cobro, Factura, Detalle de factura y Pago.
- **Parqueadero:** Celda, Asignación de celda y Vehículo. Las visitas se registran como una relación entre Visitante y Casa.
- **Salón comunal:** Reserva de salón, que incluye el depósito de garantía como atributo.
- **Sanciones:** Sanción.

## Requerimientos funcionales

El proyecto parte de 22 requerimientos funcionales, organizados por módulo.

**Casas y personas**

- **RF-01.** Registrar las casas con su nomenclatura (manzana y número), área y número de habitaciones.
- **RF-02.** Registrar personas con sus datos de contacto y asignarles uno o varios roles: propietario, arrendatario, residente o visitante.
- **RF-03.** Registrar la propiedad de cada casa con fecha de compra, fecha de venta y porcentaje, conservando el historial.
- **RF-04.** Registrar contratos de arriendo (casa, propietario que lo firma, arrendatario que lo asume, cuota mensual, fechas y estado) y validar que exista un solo contrato vigente por casa.
- **RF-05.** Registrar los residentes de cada casa con su fecha de ingreso y de salida.

**Finanzas**

- **RF-06.** Definir los conceptos de cobro con su valor base (administración ordinaria, cuota extraordinaria, multa, reserva del salón, etc.).
- **RF-07.** Generar las facturas mensuales por casa, con su detalle por concepto, incluidas las multas por sanciones, las reservas del salón y la cuota extra de las celdas adicionales.
- **RF-08.** Registrar los pagos indicando quién pagó y por qué medio, y aplicarlos a las facturas.
- **RF-09.** Calcular y consultar la cartera en mora por casa.
- **RF-10.** Consultar el estado de cuenta de una casa y emitir su paz y salvo cuando no tenga deudas.

**Parqueadero**

- **RF-11.** Registrar las celdas de parqueadero por tipo y su estado, y asignarlas a una casa con su fecha de inicio y de fin cuando corresponda.
- **RF-12.** Registrar los vehículos (placa, tipo, marca y modelo) asociados a la persona a la que pertenecen.
- **RF-13.** Registrar cada ingreso de un vehículo como un parqueo, con la celda y la fecha y hora de entrada y de salida, y detectar los vehículos de visitantes que superan el tiempo máximo.
- **RF-14.** Registrar las visitas a las casas, con el visitante, la casa visitada y las fechas de entrada y de salida. El vehículo de un visitante solo se registra en el parqueadero mientras tenga una visita vigente.
- **RF-15.** Consultar las celdas de parqueadero disponibles en un momento dado.

**Salón comunal**

- **RF-16.** Registrar reservas del salón por casa, con fecha, hora de inicio y hora final, calculando las horas reservadas y el total a pagar, y validando que el horario esté disponible.
- **RF-17.** Validar, antes de aceptar una reserva, que la casa no tenga cartera en mora ni sanciones pendientes.
- **RF-18.** Registrar el valor del depósito de garantía de cada reserva y reflejar su devolución o retención en el estado de la reserva.

**Sanciones, reportes y aplicación web**

- **RF-19.** Registrar sanciones a una casa, con su tipo, descripción, fecha del incidente, notificación, descargos, valor y estado del proceso.
- **RF-20.** Consultar el historial de sanciones y las casas reincidentes.
- **RF-21.** Generar consultas de apoyo: cartera por casa, ocupación del parqueadero, fechas más solicitadas del salón y sanciones por casa.
- **RF-22.** Mostrar en una aplicación web sencilla, de solo lectura, la información de la base de datos: casas y sus responsables, estado de cuenta, celdas disponibles y reservas del salón.

## Supuestos

Para delimitar el diseño se asumen las siguientes condiciones

**Casas, personas y roles**

- **S-1.** El conjunto es cerrado y está formado solo por casas; cada casa se identifica con una nomenclatura única, formada por la manzana y el número.
- **S-3.** Una casa puede tener uno o varios propietarios (con su porcentaje de participación, cuya suma vigente es 100%) y, en un momento dado, como máximo un contrato de arriendo vigente.
- **S-4.** Una misma persona puede ser propietaria de varias casas y, a la vez, arrendataria de otra.
- **S-20.** Propietario, Arrendatario, Residente y Visitante son roles de Persona, cada uno con relaciones propias (Poseer y Firmar, Asumir, Habitar, Visitar). Los roles no son excluyentes: una persona puede tener varios a la vez, o ninguno.
- **S-21.** Quien ingresa al conjunto para visitar una casa se registra como persona con los datos mínimos necesarios (identificación y nombre) y se le asigna el rol de visitante. Los propietarios, arrendatarios y residentes no se registran como visitantes. Si un visitante pasa a ser arrendatario o residente, se le agrega ese rol y se conserva su historial de visitas.
- **S-22.** La persona se identifica por su documento (tipo y número) y puede tener varios teléfonos.
- **S-24.** Un arrendatario con contrato vigente figura como residente de esa casa.
- **S-39.** Una persona puede ser propietaria de una casa y arrendataria de otra, pero el arrendatario de un contrato no puede ser propietario de esa misma casa.
- **S-40.** El propietario que vive en su casa se registra como residente de ella.
- **S-41.** Toda persona que vive en una casa se registra como residente de ella, esté o no incluida en el contrato de arriendo.
- **S-25.** Se conserva el historial de propiedad, ocupación, visitas, parqueos y asignaciones de celdas mediante sus fechas. Una misma persona puede volver a ser propietaria de la misma casa en otro periodo. Al terminar una visita, un parqueo o una ocupación se cierra el registro con su fecha de salida, sin borrarlo.

**Finanzas**

- **S-2.** La cuota de administración de cada casa se define conforme al reglamento de propiedad horizontal y se registra como valor base en el concepto de cobro correspondiente.
- **S-5.** La deuda de administración se asigna a la casa, de la cual responde su propietario, aunque el pago pueda ser realizado por otra persona, como el arrendatario.
- **S-6.** Las cuotas de administración se facturan mensualmente, y pueden existir cobros adicionales (cuotas extraordinarias, multas, reservas del salón).
- **S-26.** El valor de cada factura es la suma de sus líneas de detalle, y cada línea se refiere a un concepto del catálogo de cobros. La línea guarda su propio valor en el momento de facturar, de modo que la factura conserva lo cobrado aunque después cambie la tarifa.
- **S-27.** Una factura puede recibir varios pagos (abonos). Cada pago registra quién lo realizó, que puede ser el propietario, el arrendatario u otra persona.
- **S-28.** Las multas por sanciones, las reservas del salón y la cuota extra de las celdas adicionales se cobran a la casa como líneas de su factura.
- **S-29.** Una línea de factura puede corresponder a una reserva del salón, a una sanción (cuando esta genera una multa) o a una asignación de celda adicional, pero como máximo a una de ellas. Las demás líneas, como la administración mensual o las cuotas extraordinarias, no están ligadas a ninguna de las tres.
- **S-35.** Cada concepto de cobro tiene un nombre, una descripción y un valor base, que sirven para calcular los cobros de las facturas.
- **S-36.** Las facturas y las reservas tienen un estado que refleja su situación (por ejemplo, pendiente, pagada o vencida; confirmada o cancelada).
- **S-18.** No se registran las condiciones económicas de la compraventa de las casas (precio, pagos, créditos hipotecarios), pues corresponden a un negocio entre particulares y no a la administración del conjunto.

**Parqueadero**

- **S-7.** Cada casa tiene asignada una celda de parqueadero propia, sin costo adicional, que no puede ser usada por visitantes. El parqueadero comunal, ubicado en el centro del conjunto, tiene celdas para los vehículos de visitantes y celdas que una casa puede solicitar como adicionales a cambio de una cuota extra. Una celda asignada a una casa no puede ser usada por otra persona.
- **S-8.** El tiempo máximo de permanencia en el parqueadero de un vehículo que ingresa por una visita es un valor configurable definido por la administración.
- **S-30.** Todo vehículo pertenece a una persona (propietario, arrendatario, residente o visitante) y se registra una sola vez, por su placa.
- **S-31.** Cada vez que un vehículo ingresa al conjunto se registra un parqueo con el vehículo, la celda y la fecha y hora de entrada, y se cierra al salir con la fecha y hora de salida. Esto aplica a todos los vehículos, de residentes y de visitantes. El vehículo se registra una sola vez, pero cada ingreso genera un parqueo.
- **S-23 y S-32.** Los vehículos de visitantes usan celdas de visitantes del parqueadero comunal, que no están asignadas a ninguna casa, y solo se registran mientras el visitante tenga una visita vigente. El parqueo se relaciona con la visita por medio de la persona dueña del vehículo y de las fechas. Usar el parqueadero no convierte a una persona en visitante: esa condición la determina únicamente la relación Visitar.
- **S-33.** Toda asignación de una celda a una casa se registra con su fecha de inicio y su fecha de fin, que se deja vacía mientras la asignación esté vigente, y se conserva como historial. La cuota extra de una celda adicional se cobra a la casa cada mes como una línea de su factura, con el concepto de cobro "Parqueadero adicional". Cada celda tiene un tipo (propia, adicional o de visitantes), un estado (ocupada o desocupada) y puede tener a lo sumo una asignación vigente y un parqueo abierto a la vez.
- **S-34.** Cada visita se registra con el visitante, la casa visitada y las fechas de entrada y de salida.
- **S-37.** Los vehículos se identifican por su placa y registran su tipo, marca y modelo.

**Salón comunal y sanciones**

- **S-9.** El salón comunal se reserva por franjas de horario (hora de inicio y hora final) y solo puede existir una reserva por franja. La reserva se asocia a la casa, no a una persona, y exige un depósito de garantía cuyo valor se registra en la reserva. Las horas reservadas se calculan a partir de la hora de inicio y la hora final, y el total a pagar es el resultado de multiplicar esas horas por el valor por hora de la reserva; ninguno de los dos se almacena.
- **S-10.** Una casa con cartera en mora o con sanciones pendientes no puede reservar el salón comunal.
- **S-11.** Toda sanción se impone a una casa y sigue un proceso de notificación, descargos y decisión, y queda registrada con sus fechas y el estado de su proceso.
- **S-38.** El valor del depósito de garantía se registra en la reserva, y su devolución o retención se refleja en el estado de la reserva. La sanción registra su tipo, descripción, fecha del incidente, fecha de notificación, descargos, valor de la multa (si lo hay) y el estado de su proceso.

**Generales del proyecto**

- **S-12.** Los datos personales que se almacenan se limitan a los necesarios para la administración, en cumplimiento de la normativa de protección de datos.
- **S-13.** Para las pruebas se utilizarán datos ficticios.
- **S-14.** El esquema se normalizará mínimo hasta la Tercera Forma Normal (3FN) antes de su implementación.
- **S-15.** La base de datos se implementará en una máquina virtual con una distribución Linux o Unix y un gestor diferente de SQL Server; ambas decisiones se justifican en los documentos de análisis de la segunda fase.
- **S-16.** La aplicación web es de demostración y solo permite la lectura de datos.
- **S-17.** El proyecto lo desarrolla un equipo de tres estudiantes, que gestionan el código y la documentación en un repositorio de GitHub.
- **S-19.** Los módulos de proveedores, contratos de servicios, recolección de basuras, reclamos de posventa a la constructora, mantenimiento, empleados, asamblea y votaciones, PQRS, auditoría y roles de usuario quedan fuera del alcance y se consideran ampliaciones futuras.

## Lo que sigue

En los siguientes posts de esta sección se presenta el proceso de diseño