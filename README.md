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