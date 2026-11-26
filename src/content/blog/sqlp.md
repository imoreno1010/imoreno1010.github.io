---
title: "Proyecto: Sentencias SQL del aplicativo"
date: "2026-10-15T12:00:00-05:00"
description: "Sentencias SQL del aplicativo del conjunto residencial: una sentencia representativa de cada clase DAO, con lo que hace y la regla del modelo que respalda."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Este post muestra las sentencias SQL del aplicativo del conjunto residencial. En el aplicativo, cada tabla del modelo tiene una clase DAO (Data Access Object), que es la que se comunica con la base de datos. Esas clases concentran todas las sentencias SQL del proyecto.A continuación mostraré una sentencia por cada clase ya que cada una cuenta con varias.

<!-- more -->

## ¿Qué son las sentencias del aplicativo?

El álgebra relacional de los 50 ejercicios es la parte teórica de las consultas, y las sentencias de este post son su implementación real en SQL. Cada clase DAO del aplicativo (`CasaDao`, `PersonaDAO`, `FacturaDAO`, etc.) guarda sus sentencias como constantes de texto y las ejecuta contra la base de datos con `PreparedStatement`. Por eso en todas aparece el símbolo `?`: es un parámetro que el aplicativo reemplaza por el valor real al ejecutar la sentencia, lo que evita escribir los valores directamente en el SQL.

Cada DAO tiene **varias sentencias**: por ejemplo, listar todos los registros, buscar uno por su llave, insertar, actualizar, eliminar y validar reglas del negocio. Para que el post sea legible, aquí muestro **una sola sentencia por clase**, la más representativa de cada una, y no las que repiten el mismo patrón en todas las tablas. En total son 18 clases.

## Cómo están organizadas

Las sentencias van agrupadas por módulos, igual que el modelo del proyecto:

- **Personas y casas:** `PersonaDAO`, `TelefonoDAO`, `RolDAO`, `CasaDao`, `PosesionDAO`, `ArriendoDAO`, `ResidenciaDAO` y `VisitaDAO`.
- **Parqueadero:** `VehiculoDAO`, `CeldaParqueaderoDAO`, `AsignacionCeldaDAO` y `ParqueoDAO`.
- **Finanzas:** `ConceptoCobroDAO`, `FacturaDAO`, `DetalleFacturaDAO` y `PagoDAO`.
- **Salón comunal y sanciones:** `ReservaSalonDAO` y `SancionDAO`.

Entre todas se ven los cuatro tipos básicos de sentencia: consultas (`SELECT`), inserciones (`INSERT`), actualizaciones (`UPDATE`) y eliminaciones (`DELETE`). También aparecen reuniones (`JOIN`), agrupamiento (`GROUP BY`), subconsultas y validaciones con `EXISTS`, que respaldan las reglas de negocio definidas en los supuestos del proyecto.

## Personas y casas

### PersonaDAO: buscar una persona por su documento

```sql
SELECT tipo_documento, numero_documento, correo, primer_nombre, segundo_nombre,
       primer_apellido, segundo_apellido
FROM persona
WHERE tipo_documento = ?
AND numero_documento = ?
```

La persona se identifica con una llave compuesta (tipo y número de documento), por eso la condición lleva las dos igualdades.

### TelefonoDAO: insertar un teléfono

```sql
INSERT INTO telefono (telefono, persona_tipo_documento, persona_numero_documento)
VALUES (CAST(? AS NUMERIC), ?, ?)
```

Es la tabla que quedó al sacar el atributo multivaluado de `PERSONA` en la 1FN: cada teléfono es una fila. El `CAST` convierte el texto recibido al tipo numérico de la columna.

### RolDAO: listar los propietarios

```sql
SELECT p.tipo_documento, p.numero_documento, p.correo, p.primer_nombre, p.segundo_nombre,
       p.primer_apellido, p.segundo_apellido
FROM persona p
JOIN propietario r ON r.tipo_documento = p.tipo_documento
            AND r.numero_documento = p.numero_documento
ORDER BY p.primer_nombre, p.primer_apellido
```

Une `PERSONA` con `PROPIETARIO` para traer los datos completos de quienes tienen ese rol. Es el equivalente en SQL del ejercicio 15 de álgebra relacional.

### CasaDao: insertar una casa

```sql
INSERT INTO casa (numero,
manzana,
area,
numero_habitaciones)
VALUES (?, ?, ?, ?)
```

Registra una casa con su nomenclatura (número y manzana), su área y su número de habitaciones (RF-01).

### PosesionDAO: sumar el porcentaje vigente de una casa

```sql
SELECT COALESCE(SUM(porcentaje), 0)
FROM posesion
WHERE casa_numero = ?
AND casa_manzana = ?
AND fecha_venta IS NULL
AND id_posesion <> ?
```

Suma los porcentajes de los propietarios actuales de una casa (los que no tienen fecha de venta), sin contar la posesión que se está editando. Sirve para validar que la suma vigente sea 100 % (supuesto S-3). El `COALESCE` devuelve 0 cuando la casa todavía no tiene propietarios.

### ArriendoDAO: listar los contratos de arriendo

```sql
SELECT id_contrato, cuota_mensual, fecha_inicio, fecha_fin, estado_contrato,
       arrendatario_tipo_documento, arrendatario_numero_documento, casa_numero, casa_manzana,
       propietario_tipo_documento, propietario_numero_documento
FROM arriendo
ORDER BY id_contrato
```

Trae cada contrato con el arrendatario, el propietario y la casa a la que corresponde (RF-04).

### ResidenciaDAO: verificar si ya existe una residencia vigente

```sql
SELECT COUNT(*)
FROM residencia
WHERE residente_tipo_documento = ?
AND residente_numero_documento = ?
AND casa_numero = ?
AND casa_manzana = ?
AND fecha_salida IS NULL
AND id_residencia <> ?
```

Cuenta si la persona ya figura como residente de esa casa sin fecha de salida, para no registrarla dos veces al mismo tiempo. Se apoya en el supuesto S-25: al terminar una ocupación se cierra el registro con su fecha de salida, sin borrarlo.

### VisitaDAO: insertar una visita

```sql
INSERT INTO visita (fecha_entrada, fecha_salida, visitante_tipo_documento, visitante_numero_documento,
                    casa_numero, casa_manzana)
VALUES (CAST(? AS DATE), CAST(? AS DATE), ?, ?, ?, ?)
RETURNING id_visita
```

Registra la visita con el visitante, la casa visitada y las fechas (S-34). `RETURNING` devuelve el `id_visita` que la base de datos acaba de generar.

## Parqueadero

### VehiculoDAO: actualizar un vehículo

```sql
UPDATE vehiculo
SET marca = ?,
    modelo = ?,
    tipo = ?,
    persona_tipo_documento = ?,
    persona_numero_documento = ?
WHERE placa = ?
```

Modifica los datos del vehículo y a quién pertenece. La placa es la llave primaria y por eso va solo en el `WHERE`, sin modificarse (S-30 y S-37).

### CeldaParqueaderoDAO: listar las celdas

```sql
SELECT id_celda, tipo, estado
FROM celda_parqueadero
ORDER BY id_celda
```

Muestra cada celda con su tipo (propia, adicional o de visitantes) y su estado (ocupada o desocupada), como en el supuesto S-33.

### AsignacionCeldaDAO: buscar una asignación por su id

```sql
SELECT id_asignacion, fecha_inicio, fecha_fin, casa_numero, casa_manzana, celda_parqueadero_id_celda
FROM asignacion_celda
WHERE id_asignacion = ?
```

Devuelve la asignación de una celda a una casa, con su fecha de inicio y su fecha de fin (vacía mientras esté vigente).

### ParqueoDAO: listar los parqueos, del más reciente al más antiguo

```sql
SELECT id_parqueo, fecha_hora_entrada, fecha_hora_salida, vehiculo_placa, celda_parqueadero_id_celda
FROM parqueo
ORDER BY fecha_hora_entrada DESC
```

Cada ingreso de un vehículo es un parqueo con su celda y sus fechas y horas de entrada y de salida (S-31). El `DESC` pone primero los más recientes.

## Finanzas

### ConceptoCobroDAO: eliminar un concepto de cobro

```sql
DELETE FROM concepto_cobro WHERE id_concepto = ?
```

Elimina un concepto del catálogo de cobros por su identificador.

### FacturaDAO: listar las facturas con su total, lo pagado y el saldo

```sql
SELECT f.numero_factura,
       f.periodo,
       f.fecha_emision,
       f.fecha_vencimiento,
       f.estado,
       COALESCE(t.total, 0) AS total,
       f.casa_numero, f.casa_manzana,
       COALESCE(p.pagado, 0) AS total_pagado,
       COALESCE(t.total, 0) - COALESCE(p.pagado, 0) AS saldo
FROM factura f
LEFT JOIN (SELECT factura_numero_factura, SUM(valor) AS total
           FROM detalle_factura
           GROUP BY factura_numero_factura) t
       ON t.factura_numero_factura = f.numero_factura
LEFT JOIN (SELECT factura_numero_factura, SUM(valor) AS pagado
           FROM pago
           GROUP BY factura_numero_factura) p
       ON p.factura_numero_factura = f.numero_factura
ORDER BY f.periodo, f.casa_manzana, f.casa_numero
```

Es la sentencia más completa del aplicativo. Como en la 3FN se eliminó el atributo `total` de `FACTURA`, aquí se calcula sumando las líneas de `DETALLE_FACTURA` (equivalente al ejercicio 44 de álgebra relacional), y lo pagado se calcula sumando los pagos. El saldo es la resta de los dos. Los `LEFT JOIN` hacen que aparezcan también las facturas que todavía no tienen líneas o pagos, con valor 0.

### DetalleFacturaDAO: insertar una línea de factura

```sql
INSERT INTO detalle_factura (factura_numero_factura, numero_linea, valor,
       concepto_cobro_id_concepto, asignacion_celda_id_asignacion,
       reserva_salon_id_reserva, sancion_id_sancion)
SELECT ?, COALESCE(MAX(numero_linea), 0) + 1, ?, ?, ?, ?, ?
FROM detalle_factura
WHERE factura_numero_factura = ?
RETURNING numero_linea
```

`DETALLE_FACTURA` es la entidad débil del modelo: su número de línea se cuenta dentro de cada factura. Por eso la sentencia calcula la siguiente línea como el máximo actual más uno (o 1 si la factura aún no tiene líneas). Las llaves a asignación, reserva y sanción pueden ir vacías, porque una línea corresponde como máximo a una de ellas (S-29).

### PagoDAO: insertar un pago sin pasarse del saldo

```sql
INSERT INTO pago (fecha, valor, metodo_pago, factura_numero_factura,
                  persona_tipo_documento, persona_numero_documento)
SELECT ?::date, ?::numeric, ?, ?, ?, ?
WHERE ?::numeric <= COALESCE((SELECT SUM(valor) FROM detalle_factura
                              WHERE factura_numero_factura = ?), 0)
                  - COALESCE((SELECT SUM(valor) FROM pago
                              WHERE factura_numero_factura = ?), 0)
RETURNING id_pago
```

Solo inserta el pago si su valor no supera lo que falta por pagar de la factura (el total de sus líneas menos los pagos anteriores). Si lo supera, no se inserta ninguna fila. Así se respeta que una factura puede recibir varios abonos (S-27) sin que se pague de más.

## Salón comunal y sanciones

### ReservaSalonDAO: detectar si una reserva se cruza con otra

```sql
SELECT EXISTS (SELECT 1 FROM reserva_salon
               WHERE estado <> 'CANCELADA'
                 AND hora_inicio < ? AND hora_final > ?
                 AND id_reserva <> ?)
```

Devuelve verdadero si ya hay una reserva no cancelada que se cruza con el horario pedido. Dos horarios se cruzan cuando uno empieza antes de que el otro termine y termina después de que el otro empiece. Así se cumple que solo exista una reserva por franja (S-9). El `id_reserva <> ?` permite ignorar la propia reserva al editarla.

### SancionDAO: actualizar el proceso de una sanción

```sql
UPDATE sancion
SET descargos = ?,
    estado_proceso = ?,
    valor = ?
WHERE id_sancion = ?
AND estado_proceso = 'EN_DESCARGOS'
```

Registra los descargos, el nuevo estado y el valor de la multa, pero solo si la sanción sigue en la etapa de descargos. Esto respeta el proceso de notificación, descargos y decisión (S-11): una sanción ya decidida no se puede modificar.

## Conclusión

Estas 18 sentencias muestran en parte cómo el aplicativo aplica el modelo diseñado: las llaves compuestas de persona y casa, los atributos derivados que ya no se guardan (el total de la factura), la entidad débil `DETALLE_FACTURA` y las reglas de negocio de los supuestos, como el porcentaje de propiedad, el cruce de reservas y el proceso de las sanciones. El siguiente paso es la implementación en la máquina virtual y la demostración del aplicativo.