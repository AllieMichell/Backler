# Backler
## 1.- Genera resumen ejecutivo
Backler es una aplicación web que tiene como finalidad el lograr ayudar a las compañías a tener un control alterno del respaldo de sus bases de datos, si bien existe la posibilidad de habilitar nodos de nuestros servicios de bases de datos para que esta subsista si es que en algún momento se pierde el nodo principal, sin embargo, con nuestra propuesta buscamos mantener y realizar los respaldos de bases de datos mediante DUMPS de las mismas, de forma que si se llegaran a perder con un Restore lograríamos poner en producción nuevamente nuestras bases de datos.

Backler busca ayudar a que tengamos control y conocimiento del estatus de nuestras bases de datos, usualmente cuando realizamos un respaldo (DUMP), tenemos el archivo listo para restaurar las bases de datos en dado caso que se pierdan o se pongan en funcionamiento en otra instancia, usualmente el respaldo de las bases de datos se realiza por comandos de terminal, Backler busca solucionar eso con una interfaz grafica que ayuda al usuario a administrar el respaldo de sus bases de datos mediante la plataforma.

El estilo de arquitectura de Backler es el Modelo Vista Controlador (MVC), con la finalidad de lograr crear una aplicación de mayor calidad, el codigo esta estructurado y en nuestros modelos basados en MongoDB, nuestras Vistas basadas en React.JS y nuestros controladores basados en Node.JS

## 2.- Requerimientos
#### Construido con:
- [Node.JS](https://nodejs.org/es/ "Node title") Servidor web
- [React.JS](https://es.reactjs.org/ "React title") Cliente web
- [MongoDB](https://www.mongodb.com/es "MongoDB title") Base de datos 
- [Python](https://www.python.org/ "Python title") Backend scripts respaldos

#### Paqueterías / Dependencias 
Instalar dependencias para Node.js y React.js
```bash
# Comando en bash 
# Instala todas las dependencias que se encuentran en el archivo de configuración package.json
npm install
```
Instalar paqueterías para Python 
```bash
#Comando en bash
# Operative System Library
pip install os
# CSV Library
pip install csv
# System Library
pip install sys
# Time Library
pip install time
# JSON Library
pip install json
# Pipes Library
pip install pipes
# urllib Library
pip install urllib
# Shutil Library
pip install shutil
# MongoDB Library
pip install pymongo
# MySQL Library
pip install pymysql
# SSH Connection Library
pip install paramiko
# Datetime Library
pip install datetime
# Sub process Library
pip install subprocess
```
## Instalación
### ¿Cómo instalar el ambiente de desarrollo?
Para poder instalar la aplicación en el entorno de desarrollo, necesitamos tener nuestra instancia, contenedor o equipo de computo, con el ambiente de desarrollo necesario para operar la aplicación con facilidad.  

Necesitamos instalar las siguientes tecnologías  

[Node.JS](https://nodejs.org/es/ "Node title") Servidor web  
```bash
# Comando en bash comprobar la instalación 
node --version
# v10.16.3 Ejemplo
```
[React.JS](https://es.reactjs.org/ "React title") Cliente web  
```bash
# Comando en bash comprobar la instalación 
npx --version
# 6.9.0 Ejemplo
```
[MongoDB](https://www.mongodb.com/es "MongoDB title") Base de datos 
```bash
# Comando en bash comprobar la instalación 
mongo --version
# MongoDB shell version v4.2.0 Ejemplo
```
[Python](https://www.python.org/ "Python title") Backend 
```bash
# Comando en bash comprobar la instalación, instalar python 3 
python --version
# Python 3.7.4 Ejemplo
```
[PM2](https://pm2.io/ "PM2") Build Node.js Applications
```bash
# Comando en bash comprobar la instalación
pm2 --version
# 3.5.1 Ejemplo
```



# Backler
Backler es una aplicación MERN Stack creada para realizar los respaldos de las bases de datos de las aplicaciones del área de Innovación 
tecnología incluyendo configuraciones de Jenkins

## Quick Start
### Introducción
Para poder iniciar la aplicación se deben de correr los siguientes comandos 

```bash
# Clonar el repositorio
git clone https://github.com/AllieMichell/Backler.git

# Entrar al directorio
cd Backler

# Instalar las dependencias
npm install

# Iniciar el servidor
npm run server

# Iniciar el cliente
npm run client

# Construir para producción
npm run build

# Iniciar el servidor de producción
npm start
```
### Variables de Entorno
```.env
DB_HOST=mongodb://192.168.80.12:27017/Buckler
EXEC_BACKUP= \Backler\src\scripts\backup.py
EXEC_BYID = \Backler\src\scripts\modularBackup.py
EXEC_BYNAME = \Backler\src\scripts\runByName.py
IP_API = 127.0.0.1:3100
```