# OpenCerts

IMPORTANTE: para usar muchas funciones de la web es necesario simular un servidor dado que por motivos de seguridad el navegador no permite el acceso a ciertos archivos con rutas locales. para eso recomiendo usar la extensión live server de visual studio code: https://github.com/ritwickdey/vscode-live-server-plus-plus

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

# Imágenes de muestra
![image](https://github.com/user-attachments/assets/389a7a95-74ea-48ef-8bf3-15a876c8ec2b)
![image](https://github.com/user-attachments/assets/2996097a-ea66-4fd2-b074-e33234de96f9)
![image](https://github.com/user-attachments/assets/1df2ec67-7c66-452a-8b3e-ccbc35cc6850)
![image](https://github.com/user-attachments/assets/7e4ff389-0663-47b9-8bc3-99f6c410309a)
![image](https://github.com/user-attachments/assets/0f790b03-1c5c-4085-83e2-2ca6b6868285)

