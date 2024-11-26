# DP-203

Este proyecto consiste en una página web donde poder publicar todo el contenido de la documentación relativa al DP-203, con el objetivo de poder escalarla al resto de exámenes.  
En este repositorio aparecerán los ficheros del lado del cliente (HTML, CSS, JS) pero no del servidor.  

Este repositorio sirve de modelo para luego automatizar el proceso de creación de la página web desde el respectivo servidor. 
El objetivo será coger un CSV que contenga las preguntas y algunos parámetros del examen seleccionado y a raíz de eso se pueda generar
las páginas html diseñadas en este repositorio, siguiendo una estructura muy similar.

El objetivo final es el siguiente:
- Tener un servidor dockerizado que se pueda desplegar desde cualquier lugar
- Acceder al servidor con un usuario (debe ser creado por el administrador previamente)
- Poder generar exámenes nuevos desde la importación de los archivos CSV e imágenes necesarios
- Agregar un sistema de correcciones y adiciones a los examenes para poder mejorar su contenido

En cuanto a los usuarios, los objetivos son los siguientes:
- Poder almacenar en una base de datos todas las estadísticas importantes de cada usuario (porcentaje de aciertos, preguntas más 
falladas, número de examenes realizados)
- A raíz de esa información, poder generar exámenes personalizados de forma automática para mejorar la experiencia de usuario

Propiedades adicionales:
- Base de datos donde subir documentación oficial y verificada 
- Chatbot implementado usando la API gratuita de groq y alimentado con la documentación necesaria para poder asistir a los usuarios de forma flexible y adaptable.
