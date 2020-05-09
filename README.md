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
Posterior a ello ya teniendo la configuración de Jenkins, lo que restaría es configurar nuestra aplicación con Jenkins, con la finalidad de que funcione nuestro pipeline.
### ¿Cómo ejecutar pruebas manualmente?
Backler tiene un diferentes APIs con las cuales poedmos probar manualmente el funcionamiento de nuestros controlladores. 
- ### Logs
APIs del controllador de los Logs de los respaldos de los proyectos  
POST http://127.0.0.1:3100/backler/api/logs/newLogs | API Crear un nuevo registro
```JSON
 {
    "projectName": "Jenkins User",
    "typeFile": "jenkins",
    "hour": "Fri Feb 22 15:17:57 2019",
    "ip": "192.168.89.30",
    "status": "successful",
    "pathLocation": "C:/Users/User/OneDrive - User, S.A.B. de CV/User/Proyectos/Jenkins User",
    "message": "Successfully backup",
    "method": "True"
}
```
GET http://127.0.0.1:3100/backler/api/logs/logsList | API Lista de los logs  
GET http://127.0.0.1:3100/backler/api/logs/getLatest | API Lista de los ultimos logs   
PUT http://127.0.0.1:3100/bAckler/api/logs/updateLogs | API Actualizar algún registro
```JSON
 {
    "projectName": "Jenkins User",
    "typeFile": "jenkins",
    "hour": "Fri Feb 22 15:17:57 2019",
    "ip": "192.168.89.30",
    "status": "successful",
    "pathLocation": "C:/Users/User/OneDrive - User, S.A.B. de CV/User/Proyectos/Jenkins User",
    "message": "Successfully backup",
    "method": "True"
}
```
DELETE http://127.0.0.1:3100/bAckler/api/logs/deleteLogs | API Para eliminar logs, por el ID
```JSON
{
    "_id": "5c4f2270ef25fb3ba441f54b"
}
```
- ### Projects  
APIs del controllador de los Proyectos a respaldar mediante Backler  
POST http://127.0.0.1:3100/backler/api/projects/newProject | API para registro de un nuevo proyecto a respaldar  
```JSON
{
    "serverName": "ubuntu",
    "serverHost": "192.168.80.53",
    "serverPort": 22,
    "serverPassword": "",
    "sshConnection": false,
    "sshPath": "",
    "remotePath": "",
    "localPath": "",
    "dbIp": "192.168.80.53",
    "dbType": "mongodb",
    "dbPort": 27017,
    "dbUser": "",
    "dbPassword": "",
    "dbName": "HandNote",
    "dbStatus": "success",
    "dbTime": null,
    "projectName": "HandNote"
}
```
GET http://127.0.0.1:3100/backler/api/projects/projectsList | API Lista de todos los proyectos a respaldar  
GET http://127.0.0.1:3100/backler/api/projects/project/5d6ed24e955c1d14ec4d26d8 | API Buscar proyecto por el ID  
GET http://127.0.0.1:3100/backler/api/projects/nameP/HandNote | API Buscar proyecto por el nombre  
PUT http://127.0.0.1:3100/backler/api/projects/updateProject | API Actualizar algún proyecto
```JSON
{
    "_id": "5dcef6c19a52e726945e4ebe",
    "serverName": "ubuntu",
    "serverHost": "192.168.80.55",
    "serverPort": 22,
    "serverPassword": "",
    "sshConnection": false,
    "sshPath": "",
    "remotePath": "",
    "localPath": "",
    "dbIp": "192.168.80.55",
    "dbType": "mongodb",
    "dbPort": 27017,
    "dbUser": "",
    "dbPassword": "",
    "dbName": "HandNote",
    "dbStatus": "success",
    "dbTime": null,
    "projectName": "HandNote"
}
```
DELETE http://127.0.0.1:3100/backler/api/projects/deleteProject | API Eliminar algún proyecto  
```JSON
{
    "_id": "5c4f2270ef25fb3ba441f54b"
}
```
- ### Tokens
APIs de los Bearer Tokens para la seguridad  
POST http://127.0.0.1:3100/backler/api/tokens/newToken | API Crear un nuevo token
```JSON
{
    "projectName":"HandNote",
	"user":"afloress"
}
```
GET http://127.0.0.1:3100/backler/api/tokens/tokensList /API Lista de tokens, requiere token  
- ### Functions
APIs de las funciones especiales que se requieren para los respaldos  
GET http://127.0.0.1:3100/backler/api/functions/runScript | API Para realizar los respaldos de todos los proyectos  
GET http://localho127.0.0.1:3100/backler/api/functions/runbyId/5dcef6c19a52e726945e4ebe | API Para respaldar un proyecto, por el ID  
GET http://127.0.0.1:3100/backler/api/functions/runbyName/HandNote | API Para respaldar un proyecto, por el nombre
GET http://127.0.0.1:3100/backler/api/functions/download/5dcef6c19a52e726945e4ebe | API Para descargar el respaldo de un proyecto, por el ID  
GET http://127.0.0.1:3100/backler/api/functions/testConnection/5dcef6c19a52e726945e4ebe | API Para hacer un test de conexión a la VM del proyecto
- ### Directory
APIs del controllador de directorio en el cual se realizaran y guardaran los respaldos de los proyectos  
POST http://127.0.0.1:3100/backler/api/directory/newDirectory | API Para crear el directorio en el cual se guardaran los respaldos  
```JSON
{
    "directoryPath": "/srv",
	"projects": [
		"5da5f950dcfc02105815669e",
		"5da5f945dcfc02105815669d",
		"5da5f932dcfc02105815669c",
		"5da5f928dcfc02105815669b",
		"5da5f919dcfc02105815669a",
		"5da5f908dcfc021058156699",
		"5da5f8fddcfc021058156698",
		"5da5f8f1dcfc021058156697",
		"5da5f8e2dcfc021058156696",
		"5da5f8bcdcfc021058156695"
    ]
}
```
GET http://127.0.0.1:3100/backler/api/directory/dirList | API Lista del directorio y datos de los proyectos  
PUT http://127.0.0.1:3100/backler/api/directory/updateDir/5da60142dcfc0210581566a0 | API Para actualizar el directorio del respaldo de los proyectos 
```JSON
{
    "directoryPath": "/srv/respaldos"
}
```
DELETE http://127.0.0.1:3100/backler/api/directory/deleteDir/5d64062109cafa174c5bdba4 | API Para eliminar el registro de algún directorio  
## Configuración 
### Configuración de Backler

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
Creamos el archivo .env
```bash
# BASE DE DATOS
DB_HOST=mongodb://127.0.0.1:27017/Backler
# SCRIPT BACKUP 
EXEC_BACKUP= \Backler\src\scripts\backup.py
# SCRIPT BACKUP BY ID
EXEC_BYID = \Backler\src\scripts\modularBackup.py
# SCRIPT BACKUP BANE
EXEC_BYNAME = \Backler\src\scripts\runByName.py
# IP OF API 
IP_API = 127.0.0.1:3100
```
## Uso
### Manual de usuario final
![Ejemplo](https://github.com/AllieMichell/Backler/blob/master/public/images/logo-Buckler.png)

## Créditos
### Alummnos
Jose Angel Abner Anzures Estrada  
Allie Michell Flores Sánchez   
Hugo Carlos Costilla Gomez  
Jorge Alberto Carranza Solis  
Adrian Zabdiel Sanchez Treviño

### Universidad
Universidad Tecmilenio 
### Materia 
Taller de productividad basada en herramientas tecnológicas
### Profesor
Juan Carlos 
### Licencia
MIT