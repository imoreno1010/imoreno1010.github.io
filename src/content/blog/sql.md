---
title: "Definición de SQL"
date: "2026-10-21T00:00:00-05:00"
description: "Resumen de los temas de SQL del curso: introducción, SELECT, filtrado y orden, funciones de una fila, conversión, funciones de grupo, joins y subconsultas."
draft: false
categories:
  - "Evidencias"
tags:
  - "SQL"
---
Resumen de cada tema de SQL visto en el curso de Bases de Datos 1, desde la introducción hasta las subconsultas. Los ejemplos usan las tablas `employees` y `departments` del esquema de recursos humanos de Oracle.

<!-- more -->

## C1 — Introducción

SQL (Structured Query Language) es el lenguaje estándar para comunicarse con una base de datos relacional: sirve para guardar, modificar, eliminar y consultar datos. Es un lenguaje declarativo, es decir, se describe **qué** datos se quieren y el motor decide cómo obtenerlos. Está basado en el álgebra relacional, que es procedimental.

Las sentencias empiezan con una palabra clave que indica qué hacen: `SELECT` para consultar, `INSERT`, `UPDATE` y `DELETE` para agregar, modificar y eliminar filas, y `CREATE`, `ALTER` y `DROP` para crear, cambiar y borrar objetos como las tablas. Las palabras clave no distinguen mayúsculas de minúsculas, pero se suelen escribir en mayúscula para leer mejor.

## C2 — Recuperar datos con SELECT

`SELECT` indica qué columnas se quieren y `FROM` de qué tabla. Equivale a la proyección (π) del álgebra relacional.

```sql
SELECT employee_id, last_name, salary
FROM employees;
```

Con `SELECT *` se piden todas las columnas. También se pueden usar expresiones aritméticas (`salary * 12`), alias con `AS` para renombrar una columna del resultado, la concatenación de textos con `||` y `DISTINCT` para eliminar filas repetidas.

## C3 — Restringir y ordenar datos

`WHERE` filtra filas con una condición, como la selección (σ) del álgebra relacional, y `ORDER BY` ordena el resultado. `ORDER BY` siempre va al final y puede ser `ASC` (de menor a mayor, lo predeterminado) o `DESC`.

```sql
SELECT last_name, salary
FROM employees
WHERE salary >= 5000 AND department_id = 50
ORDER BY salary DESC;
```

En la condición se usan comparadores (`=`, `<`, `>`, `<=`, `>=`, `<>`) y operadores como `BETWEEN` (rango), `IN` (lista de valores), `LIKE` (patrones de texto con `%` y `_`), `IS NULL` (valores nulos) y `AND`, `OR` y `NOT` para combinar condiciones. Para buscar nulos no sirve `= NULL`, porque `NULL` significa "sin valor" y no es igual a nada.

## C4 — Funciones de una fila

Se aplican a cada fila por separado y devuelven un resultado por fila. Hay de varios tipos:

- **De texto:** `UPPER`, `LOWER`, `INITCAP`, `CONCAT`, `SUBSTR`, `LENGTH`, `INSTR`, `REPLACE` y `TRIM`.
- **Numéricas:** `ROUND` (redondea), `TRUNC` (corta decimales) y `MOD` (residuo).
- **De fecha:** `SYSDATE` (fecha actual), `MONTHS_BETWEEN`, `ADD_MONTHS`, `NEXT_DAY` y `LAST_DAY`.

```sql
SELECT UPPER(last_name), ROUND(salary / 30, 2)
FROM employees;
```

Oracle tiene una tabla especial llamada `DUAL` para probar funciones sin una tabla real, por ejemplo `SELECT SYSDATE FROM DUAL`.

## C5 — Funciones de conversión

Cambian un valor de un tipo de dato a otro. La conversión puede ser **implícita**, cuando Oracle la hace por su cuenta, o **explícita**, cuando uno llama a una función, que es la opción más clara. Las principales son `TO_CHAR` (número o fecha a texto, con un formato como `'DD/MM/YYYY'`), `TO_NUMBER` (texto a número) y `TO_DATE` (texto a fecha).

Este tema incluye las funciones generales para manejar nulos: `NVL(x, y)` reemplaza `x` por `y` si `x` es nulo, y también están `NVL2`, `NULLIF` y `COALESCE` (devuelve el primer valor no nulo). Para lógica condicional se usan `CASE` y `DECODE`.

## C6 — Funciones de agregación y de grupo

Toman varias filas y devuelven un solo resultado: `COUNT` (cuenta), `SUM` (suma), `AVG` (promedio), `MIN` y `MAX`. Todas ignoran los nulos, salvo `COUNT(*)`, que cuenta todas las filas. Para calcular por grupos se usa `GROUP BY`:

```sql
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 5000;
```

Toda columna del `SELECT` que no esté dentro de una función de grupo debe aparecer en el `GROUP BY`. Además, `WHERE` filtra filas **antes** de agrupar y `HAVING` filtra grupos **después**, por eso una función de grupo solo se puede usar en el `HAVING`. Esto corresponde al operador de agrupamiento (Ģ) del álgebra relacional.

## C7 — Joins

Un join combina filas de dos o más tablas, normalmente relacionando una llave foránea con la llave primaria de otra tabla.

```sql
SELECT e.last_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;
```

Las variantes son:

- **Natural join** (`NATURAL JOIN`): une automáticamente por las columnas con el mismo nombre.
- **JOIN ... USING:** une por una columna con el mismo nombre en ambas tablas, indicada explícitamente.
- **JOIN ... ON:** une con una condición escrita a mano, la más flexible.
- **Joins externos** (`LEFT`, `RIGHT` y `FULL OUTER JOIN`): conservan además las filas sin pareja, rellenando con `NULL`.
- **Self join:** une una tabla consigo misma, por ejemplo para relacionar cada empleado con su jefe.
- **Cross join:** el producto cartesiano, que combina cada fila de una tabla con cada fila de la otra.

## C8 — Subconsultas

Una subconsulta es una consulta anidada dentro de otra. La consulta interna se ejecuta **primero** y su resultado lo usa la consulta principal. Sirve para problemas que se resuelven en dos pasos: para saber quién fue contratado después de Davies, primero hay que saber cuándo fue contratado Davies.

```sql
SELECT last_name, hire_date
FROM employees
WHERE hire_date > (SELECT hire_date
                   FROM employees
                   WHERE last_name = 'Davies');
```

Reglas básicas: la subconsulta va **entre paréntesis**, conviene ponerla a la derecha del operador de comparación para que se lea mejor, y se usan operadores de una fila con subconsultas de una fila y operadores de varias filas con las de varias filas.

### Subconsultas de una fila

Devuelven una sola fila y se usan con los comparadores normales (`=`, `>`, `<`, etc.). Se pueden combinar varias, y también se puede usar una función de grupo dentro de la subconsulta, porque devuelve un solo valor. Por ejemplo, `WHERE salary = (SELECT MIN(salary) FROM employees)` devuelve a quienes ganan el salario mínimo. Con `HAVING` también se pueden usar subconsultas: el motor ejecuta primero la subconsulta y usa su resultado en el `HAVING` de la consulta principal.


### Subconsultas de varias filas

Devuelven más de una fila y usan `IN` (igual a cualquier valor de la lista), `ANY` (la comparación se cumple con **al menos uno**) y `ALL` (se cumple con **todos**). Si la subconsulta de los programadores devuelve los salarios 9000, 6000 y 4200, entonces `salary < ANY (...)` significa menor que el máximo (9000), mientras que `salary < ALL (...)` significa menor que el mínimo (4200).

### Subconsultas de varias columnas

Devuelven más de una columna a la consulta externa. Las comparaciones pueden ser por pares o no por pares. Por ejemplo, para mostrar a los empleados que ganan el salario más bajo de su departamento:

```sql
SELECT first_name, department_id, salary
FROM employees
WHERE (salary, department_id) IN (SELECT MIN(salary), department_id
                                  FROM employees
                                  GROUP BY department_id)
ORDER BY department_id;
```

Una subconsulta también puede usarse en el `FROM`, como si fuera una tabla.

### Valores nulos en una subconsulta

Si la subconsulta devuelve un nulo, un `NOT IN` **no devuelve ninguna fila**. Por ejemplo, para buscar los empleados que no son jefes con `NOT IN (SELECT manager_id FROM employees)` se obtienen 0 filas, porque el presidente no tiene jefe y su `manager_id` es nulo. Se evita agregando `WHERE manager_id IS NOT NULL` dentro de la subconsulta.

