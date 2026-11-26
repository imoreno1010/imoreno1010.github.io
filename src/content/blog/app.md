---
title: "Proyecto: Implementación y manipulación de datos"
date: "2026-10-31T12:00:00-05:00"
description: "Muestra del aplicativo del conjunto residencial: la base de datos en una máquina virtual, el back y el front que permiten consultar e ingresar datos."
draft: false
categories:
  - "Evidencias"
tags:
  - "Proyecto"
---
Este es el último post del proyecto: la muestra del aplicativo funcionando. Aquí se ve cómo el diseño de las fases anteriores (el modelo entidad-relación, el modelo relacional en 3FN y las consultas) se convirtió en un sistema real que se puede usar.

<!-- more -->

## Cómo está armado el aplicativo

El aplicativo tiene tres partes conectadas entre sí:

- **La base de datos:** el modelo relacional del conjunto residencial, implementado en un sistema gestor de bases de datos (RDBMS) instalado en una máquina virtual con Oracle Linux. Simula un ambiente de desarrollo real, con el servidor de datos separado de la máquina donde se programa.
- **El back:** el código en Java que se conecta a la base de datos. Cada tabla tiene su propia clase DAO, que guarda las sentencias SQL del post anterior y las ejecuta para consultar, insertar, actualizar y eliminar datos.
- **El front:** la aplicación web, que es lo que ve el usuario. Muestra la información en pantalla y envía lo que el usuario ingresa al back, que lo guarda en la base de datos.

El recorrido completo es: el usuario hace una acción en la página web, el back traduce esa acción en una sentencia SQL, la base de datos la ejecuta y el resultado vuelve por el mismo camino hasta la pantalla.

## Qué se logra con esto

El aplicativo cubre los tres objetivos de esta parte del proyecto:

- **Implementar un RDBMS:** configurar y usar un sistema gestor de bases de datos en un entorno virtualizado, con una máquina virtual con Oracle Linux.
- **Utilizar operaciones relacionales:** manipular y consultar los datos con las operaciones del álgebra relacional (que es la base teórica de las consultas), implementadas en SQL como se vio en el post de sentencias.
- **Conectar aplicaciones a la base de datos:** construir una aplicación web sencilla que interactúa con la base de datos, con consulta e ingreso de datos.

## Muestra del aplicativo

Estas son algunas pantallas del aplicativo no funcional, sin conexión a la bases de datos
![Captura 1 del aplicativo.](image/theme-showcase/app1.png)

![Captura 2 del aplicativo.](image/theme-showcase/app2.png)

![Captura 3 del aplicativo.](image/theme-showcase/app3.png)

![Captura 4 del aplicativo.](image/theme-showcase/app4.png)

![Captura 5 del aplicativo.](image/theme-showcase/app5.png)

## Video de demostración

Aquí se puede ver el aplicativo en funcionamiento completo y explicación detallada.

<div style="position: relative; width: 100%; aspect-ratio: 16 / 9; margin: 1.5rem 0;">
  <iframe
    src="https://www.youtube.com/embed/pPgZhVnE6CE"
    title="Video Proyecto Bases Datos 1"
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

## Conclusión

Con el aplicativo se cierra el recorrido del proyecto: desde la problemática del conjunto residencial, pasando por el modelo entidad-relación, la normalización hasta 3FN, los ejercicios de álgebra relacional y las sentencias SQL, hasta un sistema que conecta una base de datos en una máquina virtual con una aplicación web. El diseño se probó en la práctica con datos reales de ejemplo.