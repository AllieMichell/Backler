#C:\Users\AxtelUser\AppData\Local\Continuum\anaconda3\python.exe
#funciones 

#Import required python libraries
import os
import sys
import time
import datetime
import pipes
from datetime import datetime
import pymongo
import csv
import paramiko
import subprocess
import pymysql
from pymongo import MongoClient

"""
Este documento es usado para crear las funciones del
sistema de backups de las bases de datos de AxtelLabs
"""

def readCSV(csvname:str) -> str:
    """
    Esta función es utilizada para leer archivos csv
    en un script de python y omitir el nombre de 
    columna
    Parametros
    ----------
        csvname: Nombre y Path del csv a leer
    Retruns
    -------
        reader: Retorna el csv para poder utilizarlo
    """
    try:
        file = open("{0}".format(csvname),newline="\n",encoding="utf-8")
        reader = csv.reader(file)
        next(reader,None)
        #status = sys.__stdout__.write("Successful : {0}\n".format(csvname)) 
        return reader
    except OSError as e:
        status = sys.stderr.write("{0}\n".format(e))
        return status
#
#
#
#Recibe un comando para almacenar el log que retorna
def STATUS_MESSAGE(command): 
    """
    Esta función es empleada para poder visualizar los logs 
    de los comandos realziados 
    Parametros 
    ----------
        command: Comandos a emplear al realizar la función
    Returns
    -------
        successCommand : Retorna el mensaje de success
        errorCommand : Retorna el mensaje de error
    """
    p = subprocess.Popen(command, stdin=None, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    try:
        successCommand = p.communicate()
        #p_status = p.wait()
        #p_status = "successful"
        #print("Command output: {0}".format(sys.__stdout__))
        #print("Command exit/return code: {0}".format(p_status))
        return successCommand
    except OSError as e:
        errorCommand = p.communicate("{0}".format(e))
        #p_status = p.wait()
        #p_status = "error"
        #print("Command output: {0}".format(sys.__stderr__))
        #print("Command exit/return code: {0}".format(p_status))
        return errorCommand
#
#
#
#Funciones para renombrar los archivos
def renameFile_MySQL(filename:str) -> str: 
    """
    Esta función es utilizada para renombrar un archivo sql
    a la fecha en la que fue creada
    Parametros
    ----------
        filename: Nombre del archivo al cual queremos renombrar 
        con la fecha en la que fue creado
    Returns
    -------
        renamefile = Retorna el nombre del archivo al que fue
        renombrado y crea latest
        status: Retorna el estatus del error al ejecutar la 
        función
    """
    try:
        file_name = "{0}".format(filename)
        mod_time = os.stat(file_name).st_mtime
        create = datetime.fromtimestamp(mod_time)
        create_str = str(create)
        separate_date = create_str.split("-")
        separate_time = create_str.split(":")
        date = separate_date[0]+separate_date[1]+separate_date[2]
        time = separate_time[0]+separate_time[1]+separate_time[2]
        lastdate = date[0:8]+"_"+time[11:17]
        renamefile = os.rename(file_name, lastdate+".sql")
        #status = sys.stdout.write("Successful rename: {0}\n".format(renamefile))
        return renamefile
    except OSError as e:
        status = sys.stderr.write("{0}\n".format(e))
        return status

def renameFile_MongoDB(filename:str) -> str: 
    """
    Esta función es utilizada para renombrar una carpeta de 
    mongo a cuando fue creada
    Parametros
    ----------
        filename: Nombre del archivo al cual queremos renombrar 
        con la fecha en la que fue creado
    Returns
    -------
        renamefile: Retorna la función para poder renombrar 
        un archivo al nombre que decidamos 
        status: Retorna el estatus del error al ejecutar la 
        función
    """
    try: 
        file_name = "{0}".format(filename)
        mod_time = os.stat(file_name).st_mtime
        create = datetime.fromtimestamp(mod_time)
        create_str = str(create)
        separate_date = create_str.split("-")
        separate_time = create_str.split(":")
        date = separate_date[0]+separate_date[1]+separate_date[2]
        time = separate_time[0]+separate_time[1]+separate_time[2]
        lastdate = date[0:8]+"_"+time[11:17]
        renamefile = os.rename(file_name, lastdate)
        #status = sys.stdout.write("Successful rename : {0}\n".format(renamefile))
        return renamefile
    except OSError as e: 
        status = sys.stderr.write("{0}\n".format(e))
        return status

def renameFile_Jenkins(filename:str) -> str: 
    """
    Esta función es utilizada para renombrar una carpeta de 
    jenkins a cuando fue creada
    Parametros
    ----------
        filename: Nombre del archivo al cual queremos renombrar 
        con la fecha en la que fue creado
    Returns
    -------
        renamefile: Retorna la función para poder renombrar 
        un archivo al nombre que decidamos 
        status: Retorna el estatus del error al ejecutar la 
        función
    """
    try: 
        file_name = "{0}".format(filename)
        mod_time = os.stat(file_name).st_mtime
        create = datetime.fromtimestamp(mod_time)
        create_str = str(create)
        separate_date = create_str.split("-")
        separate_time = create_str.split(":")
        date = separate_date[0]+separate_date[1]+separate_date[2]
        time = separate_time[0]+separate_time[1]+separate_time[2]
        lastdate = date[0:8]+"_"+time[11:17]
        renamefile = os.rename(file_name, lastdate+".zip")
        #status = sys.stdout.write("Successful rename : {0}\n".format(renamefile))
        return renamefile
    except OSError as e: 
        status = sys.stderr.write("{0}\n".format(e))
        return status
#
#
#
#Funciones de test de conección de bases de datos
def testConnectingDB_MYSQL(dbuser:str, dbpassword:str, dbhost:str, dbname:str) -> str:
    """
    Esta función es utilizada para poder realizar un 
    test de conección antes de realizar los comandos
    de dump de las bases de datos 
    Parametros
    ----------
        dbuser: Usuario de la base de datos
        dbpassword: Password de la base de datos
        dbhost: IP para conectarse a la base de datos
        dbname: Nombre de la base de datos para el dump
    Returns
    -------
        active: Retorna un estatus de connección 
    """
    if dbuser=="" or dbpassword =="" or dbhost=="" or dbname=="":
        print("se encontraron campos vacios")
    else:
        db = pymysql.connect(user=dbuser,password=dbpassword,host=dbhost,database=dbname)
        db.close()
        active = 1
        return active

def testConnectingDB_MongoDB(dbhost, dbport, dbname):
    """
    Esta función es utilizada para poder realizar un 
    test de conección antes de realizar los comandos 
    de dump de las bases de datos
    Parameteros
    -----------
        dbhost: IP de la base de datos 
        dbport: Puerto de la base de datos
        dbname: Nombre de la base de datos
    Returns
    ------
        active: Retorna un estatus de conección
    """
    if dbhost=="" or dbport=="" or dbname=="":
        print("se encontraron campos vacios")
    else: 
        client = MongoClient("mongodb://{0}:{1}/{2}".format(dbhost, dbport, dbname))
        client.server_info()
        active = 1
        return active
#
#
#
#Funciones de DUMP de las bases de datos 
#Funciones de POPEN guardar logs de Los DUMP
def dumpMySQL_remote(dbuser:str, dbpassword:str, dbhost:str, dbname:str) -> str:
    """
    Esta función es utilizada para realizar
    el comando de mysqldump con el nombre latest.
    Parametros
    ----------
        dbuser: Usuario de la base de datos
        dbpassword: Password de la base de datos
        dbhost: IP para conectarse a la base de datos
        dbname: Nombre de la base de datos para el dump
    
    Returns
    -------
        command: Retorna el comando a realizar, mysqldump
        status: Retorna el estatus del comando
    """
    #os.spawn
    if dbuser=="" or dbpassword =="" or dbhost=="" or dbname=="":
        print("se encontraron campos vacios")
    else:
        command = "mysqldump --databases --create-options --add-drop-database --column-statistics=0 --routines=true --triggers -h{2} -u{0} -p{1} {3} > latest.sql".format(dbuser, dbpassword, dbhost, dbname)
        os.system(command)
        return command

def dumpMySQL_remoteMessage(dbuser:str, dbpassword:str, dbhost:str, dbname:str) -> str:
    """
    Esta función es utilizada obtener el 
    mensaje del eror o status del comando 
    de mysqldump con el nombre latest.
    Parametros
    ----------
        dbuser: Usuario de la base de datos
        dbpassword: Password de la base de datos
        dbhost: IP para conectarse a la base de datos
        dbname: Nombre de la base de datos para el dump
    
    Returns
    -------
        status: Retorna el estatus del comando

    """
    #command = dumpMySQL_remote(dbuser, dbpassword, dbhost, dbname)#Función de dump remoto
    command = "mysqldump --column-statistics=0 --routines=true --triggers -h{2} -u{0} -p{1} --databases {3} > latest.sql".format(dbuser, dbpassword, dbhost, dbname)
    message = STATUS_MESSAGE(command)#Función para verificar los mensajes de estatus
    os.system(command)
    return message

def dumpMySQL_local(dbuser:str, dbpassword:str, dbhost:str, dbname:str) -> str:
    """
    Esta función es utilizada para realizar
    el comando de mysqldump con el nombre latest

    Parametros
    ----------
        dbuser: Usuario de la base de datos
        dbpassword: Password de la base de datos
        dbhost: IP para conectarse a la base de datos
        dbname: Nombre de la base de datos para el dump
    Returns
    -------
        command: Retorna el comando a realizar, mysqldump
        status: Retorna el estatus del comando
    """
    if dbuser=="" or dbpassword =="" or dbhost=="" or dbname=="":
        print("se encontraron campos vacios")
    else:
        print("Proceso realizado")
        command = "mysqldump --databases --create-options --add-drop-database --routines=true --triggers -h{2} -u{0} -p{1} {3} > latest.sql".format(dbuser, dbpassword, dbhost, dbname)
        #STATUS_MESSAGE(command)
        os.system(command)
        return command

def dumpMySQL_localMessage(dbuser:str, dbpassword:str, dbhost:str, dbname:str) -> str:
    """
    Esta función es utilizada para obtener  
    el mensaje del eror o status del comando 
    de mysqldump con el nombre latest.
    Parametros
    ----------
        dbuser: Usuario de la base de datos
        dbpassword: Password de la base de datos
        dbhost: IP para conectarse a la base de datos
        dbname: Nombre de la base de datos para el dump
    
    Returns
    -------
        status: Retorna el estatus del comando

    """
    #command = dumpMySQL_remote(dbuser, dbpassword, dbhost, dbname)#Función de dump remoto
    command = "mysqldump --column-statistics=0 --routines=true --triggers -h{2} -u{0} -p{1} --databases {3} > latest.sql".format(dbuser, dbpassword, dbhost, dbname)
    message = STATUS_MESSAGE(command)#Función para verificar los mensajes de estatus
    os.system(command)
    return message

def dumpMongo_latest(dbhost:str, dbport:str, dbname:str) -> str:
    """
    Esta función es utilizada para realizar 
    el comando de mongodump con el nombre latest
    Parametros
    ----------
        dbhost: IP del servidor en el que esta la DB
        dbport: Puerto en el cual esta la DB Usualmente 27017
        dbname: Nombre de la base de datos para el dump
    Retruns
    -------
        command: Retorna el comando a realizar, mongodump
        status: Retorna el estatus del comando realizado
    """
    command = "mongodump --host {0} --port {1} --db {2} --out latest".format(dbhost, dbport, dbname)
    os.system(command)
    return command

def dumpMongo_latestMessage(dbhost:str, dbport:str, dbname:str) -> str:
    """
    Esta función es utilizada para obtener
    el mensaje de error o status del comando
    de mongodump con el nombre de latest
    Parametros
    ----------
        dbhost: IP del servidor en el que esta la DB
        dbport: Puerto en el cual esta la DB Usualmente 27017
        dbname: Nombre de la base de datos para el dump
    Returns
    -------
        message: Retorna el estatus del comando
    """
    command = "mongodump --host {0} --port {1} --db {2} --out latest".format(dbhost, dbport, dbname)
    message = STATUS_MESSAGE(command)
    os.system(command)
    return message
    
