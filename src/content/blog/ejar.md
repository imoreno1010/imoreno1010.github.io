---
title: "Ejercicios de Álgebra Relacional"
date: "2026-10-08T13:00:00-05:00"
description: "Ejercicios de álgebra relacional resueltos paso a paso sobre una tienda en línea: operaciones básicas, producto cartesiano, unión, diferencia, división y máximo."
draft: false
categories:
  - "Evidencias"
tags:
  - "SQL"
---
Hice 10 ejercicios de álgebra relacional sobre el caso de una tienda en línea, resueltos paso a paso.

<!-- more -->

## El problema

Una tienda en línea guarda en su base de datos sus clientes, sus productos, los proveedores que los suministran y las compras que se hacen. Cada proveedor suministra un solo producto, y en cada compra el cliente puede dejar una calificación del producto de 1 a 5. Las relaciones son:

- `CLIENTE(id_cli, nombre, ciudad, edad)`
- `PRODUCTO(id_prod, nombre_prod, categoria, precio)`
- `PROVEEDOR(id_prov, nombre_prov, id_prod)`
- `COMPRA(id_cli, id_prod, cantidad, calificacion)`

### Datos de ejemplo

Para poder comprobar los resultados, se usan estos datos ficticios:

- **CLIENTE:** (C01, Ana, Bogotá, 21), (C02, Luis, Medellín, 30), (C03, Marta, Bogotá, 25) y (C04, Pedro, Cali, 35).
- **PRODUCTO:** (P01, Teclado, Tecnología, 80000), (P02, Mouse, Tecnología, 40000), (P03, Libreta, Papelería, 5000), (P04, Monitor, Tecnología, 600000) y (P05, Silla, Hogar, 250000).
- **PROVEEDOR:** (V01, Alfa, P01), (V02, Beta, P02), (V03, Gamma, P03) y (V04, Delta, P04).
- **COMPRA:** (C01, P01, 2, 5), (C01, P02, 1, 4), (C01, P04, 1, 5), (C02, P01, 1, 3), (C02, P03, 10, 4), (C03, P01, 1, 5), (C03, P02, 2, 4), (C03, P04, 1, 3) y (C04, P03, 5, 2).

## Notación

- **σ** selección (filtra filas), **π** proyección (elige columnas) y **ρ** renombrado.
- **×** producto cartesiano, **∪** unión, **−** diferencia y **←** asignación (guarda un resultado para usarlo después).
- **∧** significa "y" y **∨** significa "o".

## Punto 1: Operaciones básicas

### a) Nombre y ciudad de todos los clientes

```
π nombre, ciudad ( CLIENTE )
```

La proyección conserva solo esas dos columnas y todas las filas. **Resultado:** (Ana, Bogotá), (Luis, Medellín), (Marta, Bogotá) y (Pedro, Cali).

### b) Clientes que son de Bogotá

```
σ ciudad = 'Bogotá' ( CLIENTE )
```

La selección conserva todas las columnas, pero solo las filas que cumplen la condición. **Resultado:** (C01, Ana, Bogotá, 21) y (C03, Marta, Bogotá, 25).

### c) Nombre de los productos de la categoría Tecnología con precio mayor a 50000

```
π nombre_prod ( σ categoria = 'Tecnología' ∧ precio > 50000 ( PRODUCTO ) )
```

Primero la selección deja los productos que cumplen las **dos** condiciones a la vez: el Mouse es de Tecnología pero cuesta 40000, y la Libreta y la Silla no son de Tecnología. Después la proyección deja solo el nombre. **Resultado:** Teclado y Monitor.

## Punto 2: Consultas con producto cartesiano

### a) Nombre del cliente y nombre del producto que compró

Se necesitan tres relaciones. El join se expresa aplicando σ sobre el producto cartesiano, y se usa ρ para dar un alias a cada relación y evitar ambigüedad con `id_cli` e `id_prod`, que aparecen en más de una:

```
π nombre, nombre_prod ( σ CL.id_cli = CO.id_cli ∧ CO.id_prod = P.id_prod ( ρ CL ( CLIENTE ) × ρ CO ( COMPRA ) × ρ P ( PRODUCTO ) ) )
```

El producto cartesiano combina **todas** las filas de las tres relaciones (4 × 9 × 5 = 180 filas). La selección se queda solo con las combinaciones que tienen sentido: esas donde el cliente de la compra es ese cliente y el producto de la compra es ese producto. Esto equivale a un join con condición: `σ condición ( R × S ) ≡ R ⨝ condición S`.

**Resultado:** nueve filas, una por compra: (Ana, Teclado), (Ana, Mouse), (Ana, Monitor), (Luis, Teclado), (Luis, Libreta), (Marta, Teclado), (Marta, Mouse), (Marta, Monitor) y (Pedro, Libreta).

### b) Nombre de los clientes de Bogotá y de los productos que compraron con calificación mayor a 4

```
π nombre, nombre_prod ( σ CL.id_cli = CO.id_cli ∧ CO.id_prod = P.id_prod ∧ ciudad = 'Bogotá' ∧ calificacion > 4 ( ρ CL ( CLIENTE ) × ρ CO ( COMPRA ) × ρ P ( PRODUCTO ) ) )
```

Es el mismo producto del ejercicio anterior, pero la selección agrega dos condiciones de filtro: la ciudad y la calificación. Cuidado con el `> 4`: es estricto, así que las calificaciones de 4 no entran. Marta compró el Mouse con 4 y el Monitor con 3, y por eso esas compras no aparecen.

**Resultado:** (Ana, Teclado), (Ana, Monitor) y (Marta, Teclado).

## Punto 3: Unión y diferencia

Estos operadores exigen relaciones **compatibles**: la misma cantidad de atributos y del mismo dominio. En ambos ejercicios se proyecta solo `id_cli`, así que lo son.

### a) Códigos de los clientes que compraron P01 o P02

```
π id_cli ( σ id_prod = 'P01' ( COMPRA ) ) ∪ π id_cli ( σ id_prod = 'P02' ( COMPRA ) )
```

Quienes compraron P01 son C01, C02 y C03, y quienes compraron P02 son C01 y C03. La unión junta ambos conjuntos y **elimina repetidos**, así que C01 y C03 aparecen una sola vez. **Resultado:** C01, C02 y C03.

### b) Códigos de los clientes que compraron P01 pero no P02

```
π id_cli ( σ id_prod = 'P01' ( COMPRA ) ) − π id_cli ( σ id_prod = 'P02' ( COMPRA ) )
```

La diferencia devuelve lo que está en el primer conjunto y no en el segundo. De {C01, C02, C03} se quitan los que también compraron P02 (C01 y C03). **Resultado:** C02. Recuerda que la diferencia **no es conmutativa**: invertir el orden daría un resultado distinto (en este caso, ninguna fila).

## Punto 4: Consultas avanzadas

### a) Nombre de los clientes que compraron todos los productos de Tecnología

La división se expresa mediante producto cartesiano y diferencia. Es el tipo de consulta "los que cumplen con **todos**".

**Paso 1: Productos de Tecnología.**

```
T ← π id_prod ( σ categoria = 'Tecnología' ( PRODUCTO ) )
```

Resultado: P01, P02 y P04.

**Paso 2: Pares (cliente, producto) que existen en COMPRA.**

```
Pares ← π id_cli, id_prod ( COMPRA )
```

**Paso 3: Todos los pares posibles (cada cliente que compró algo, combinado con cada producto de Tecnología).**

```
Posibles ← π id_cli ( COMPRA ) × T
```

Son 4 clientes × 3 productos = 12 pares.

**Paso 4: Pares posibles que NO están en COMPRA (combinaciones que faltan).**

```
Faltantes ← Posibles − Pares
```

Resultado: (C02, P02), (C02, P04), (C04, P01), (C04, P02) y (C04, P04).

**Paso 5: Clientes con al menos un producto faltante.**

```
ConFaltantes ← π id_cli ( Faltantes )
```

Resultado: C02 y C04.

**Paso 6: Clientes sin ningún faltante, es decir, los que compraron todos.**

```
Candidatos ← π id_cli ( COMPRA ) − ConFaltantes
```

Resultado: C01 y C03.

**Paso 7: Obtener los nombres.**

```
π nombre ( σ CL.id_cli = CA.id_cli ( ρ CL ( CLIENTE ) × ρ CA ( Candidatos ) ) )
```

**Resultado:** Ana y Marta. Es el mismo resultado que daría el operador de división directamente: `π id_cli, id_prod ( COMPRA ) ÷ T`.

### b) Nombre de los productos que nadie ha comprado

**Paso 1: Productos con al menos una compra.**

```
ConCompras ← π id_prod ( COMPRA )
```

Resultado: P01, P02, P03 y P04.

**Paso 2: Productos sin ninguna compra** (todos los productos menos los que tienen compras).

```
SinCompras ← π id_prod ( PRODUCTO ) − ConCompras
```

Resultado: P05.

**Paso 3: Obtener el nombre.**

```
π nombre_prod ( σ P.id_prod = S.id_prod ( ρ P ( PRODUCTO ) × ρ S ( SinCompras ) ) )
```

**Resultado:** Silla. La idea de esta consulta es que el álgebra relacional no tiene un operador "no existe", así que lo que **no** está se obtiene con una diferencia: todo menos lo que sí está.

### c) Nombre del proveedor del producto que recibió la calificación más alta

El máximo no se puede obtener directamente, así que se deduce por diferencia: la calificación máxima es la que **no** es menor que ninguna otra.

**Paso 1: Calificaciones que NO son la máxima** (existe alguna calificación mayor).

```
NoMaxima ← π C1.calificacion ( σ C1.calificacion < C2.calificacion ( ρ C1 ( COMPRA ) × ρ C2 ( COMPRA ) ) )
```

Se compara la relación `COMPRA` consigo misma, por eso se renombra dos veces. Resultado: 2, 3 y 4.

**Paso 2: Calificación máxima.**

```
CalifMax ← π calificacion ( COMPRA ) − NoMaxima
```

Del conjunto {2, 3, 4, 5} se quitan 2, 3 y 4. Resultado: 5.

**Paso 3: Productos con una compra de calificación máxima.**

```
ProdMax ← π id_prod ( σ CO.calificacion = N.calificacion ( ρ CO ( COMPRA ) × ρ N ( CalifMax ) ) )
```

Resultado: P01 (calificado con 5 por C01 y C03) y P04 (calificado con 5 por C01).

**Paso 4: Nombre del proveedor.**

```
π nombre_prov ( σ PV.id_prod = PM.id_prod ( ρ PV ( PROVEEDOR ) × ρ PM ( ProdMax ) ) )
```

**Resultado:** Alfa y Delta, los proveedores de P01 y P04. Si dos productos empatan en la calificación más alta, ambos aparecen.

## Conclusión

Estos ejercicios cubren los operadores básicos del álgebra relacional y muestran cómo se combinan. Teniendo en cuenta que lo más importante es que todos los operadores devuelven una relación, y por eso el resultado de uno se puede usar como entrada del siguiente. 