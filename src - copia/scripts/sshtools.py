#!/usr/bin/python

#Import required python libraries
import os
import sys
import csv
import scp
import time
import pipes
import pymongo
import datetime
import paramiko
from datetime import datetime
import dbtools

"""
Este documento es utilizado para realizar la conección al servidor 
por medio del protocolo SSH y el protocolo SFTP para obtener las bases 
de datos
"""
def SSHConnect(host:str, username:str, port:str, keypath:str) -> str:
    """
    Esta función es utilizada para realizar la conección al servidor
    por medio del protocolo SSH
    Parametros
    ----------
        host: IP en la cual se encuentra el servidor remoto
        similar --> host="192.168.89.20"
        username: Usuario del servidor para la conección remota
        similar --> username  = "ubuntu"
        keypath: Ruta absoluta en la cual se encuentra la llave 
        de conección
    Returns
    -------
        client: Retorna el cliente que es este caso es la conexión     al servidor
        status: Retorna el status del error
    """
    try:
        keyfile_path = paramiko.RSAKey.from_private_key_file("{0}".format(keypath))
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        print("Connecting...")
        #client.connect( hostname = host, username = username, pkey = keyfile_path )
        client.connect(hostname=host, port=port, username=username, pkey=keyfile_path)
        status = sys.stdout.write("Successful conect: {0}\n".format(client))
        return client
    except OSError as e:
        status = sys.stderr.write("{0}\n".format(e))
        return status

def SSHTesConnection(host:str, username:str, port:str, keypath:str) -> str:
    """
    Esta función es utilizada para realizar la conección al servidor
    por medio del protocolo SSH
    Parametros
    ----------
        host: IP en la cual se encuentra el servidor remoto
        similar --> host="192.168.89.20"
        username: Usuario del servidor para la conección remota
        similar --> username  = "ubuntu"
        keypath: Ruta absoluta en la cual se encuentra la llave 
        de conección
    Returns
    -------
        client: Retorna el cliente que es este caso es la conexión     al servidor
        status: Retorna el status del error
    """
    try:
        keyfile_path = paramiko.RSAKey.from_private_key_file("{0}".format(keypath))
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        #client.connect( hostname = host, username = username, pkey = keyfile_path )
        client.connect(hostname=host, port=port, username=username, pkey=keyfile_path)
        status = True
        return client
    except OSError as e:
        status = False
        return status

def SSHTestCommands(host:str, username:str, port:str, keypath:str, commands:str) -> str: 
    """
    Esta función es utilizada para realizar comandos dentro del
    servidor, utiliza la función SSHConnect para conectarse al 
    servidor por el protocolo SSH
    Parametros 
    ----------
        host: IP del servidor a conectar para hacer el respaldo 
        es utilizada en la función de SSHConnect
        username: Username del servidor para la conección SSH 
        usualmente es Ubuntu
        keypath: Dirección absoluta de la ubicación de la llave 
        SSH llave RSA
        commands : Array de commandos a realziar en el servidor
    Returns
    -------
        client: Retorna el client que realiza la coneción 
        al servidor para poder realizar comando dentro de 
        el como el comando dump
        status: Retorna el estatus del error
   """
    try:
        client = SSHTesConnection(host, username, port, keypath)
        commands_todo = ["{0}".format(commands)]
        for command in commands_todo :
            stdout = client.exec_command(command)
        client.close()
        status = True
        return client
    except OSError as e:
        status = False
        return status

def SSHCommands(host:str, username:str, port:str, keypath:str, commands:str) -> str: 
    """
    Esta función es utilizada para realizar comandos dentro del
    servidor, utiliza la función SSHConnect para conectarse al 
    servidor por el protocolo SSH
    Parametros 
    ----------
        host: IP del servidor a conectar para hacer el respaldo 
        es utilizada en la función de SSHConnect
        username: Username del servidor para la conección SSH 
        usualmente es Ubuntu
        keypath: Dirección absoluta de la ubicación de la llave 
        SSH llave RSA
        commands : Array de commandos a realziar en el servidor
    Returns
    -------
        client: Retorna el client que realiza la coneción 
        al servidor para poder realizar comando dentro de 
        el como el comando dump
        status: Retorna el estatus del error
   """
    try:
        client = SSHConnect(host, username, port, keypath)
        commands_todo = ["{0}".format(commands)]
        print(commands_todo)
        for command in commands_todo : 
            #print("Executing {0}".format(command))
            stdin, stdout, stderr = client.exec_command(command)
            print(stdout.read())
            print(("Errors"))
            print(stderr.read())
        client.close()
        status = sys.stdout.write("Successfull connect: {0}\n".format(client))
        return client
    except OSError as e:
        status = sys.stderr.write("{0}\n".format(e))
        return status

def SFTPFiles(host:str, port:str, username:str, password:str, keypath:str, remotepath:str, localpath:str, files:str) -> str:
    """
    Esta función es utilizada para realizar el envio de las bases de
    datos del servidor mediante el protocolo SFTP 
    Parametros
    ----------
        host: IP del equipo al que se busca realizar el envio 
        de datos
        port: Puerto del equipo al que se envia la base de datos 
        username: Username del server para la conección y 
        extracción de datos
        password: Password del server para la conección al 
        server y extracción de datos
        keypath: Dirección absoluta de la llave RSA y el 
        nombre del archivo
        remotepath: Dirección absoluta a la cual se enviara 
        la base de datos 
        localpath: Direción absoluta en la cual se encuentra 
        la base de datos que queremos enviar
        files: Documentos que deceamos extraer del servidor
    Returns
    -------
        file: Retorna los archivos que queremos traer del 
        servidor a la maquina local
        status: Retorna el estatus del error
    """
    try:
        ssh = SSHConnect(host, username, port, keypath)
        sftp = ssh.open_sftp()
        dir = sftp.listdir(remotepath)
        print(dir)
        print("Downloading...")
        for file in files:
            file_remote = remotepath+file
            file_local = localpath+"/"+file
            print(file_remote + ' >>> '+file_local)
            sftp.get(file_remote,file_local)
        sftp.close()
        ssh.close()
        status = sys.stdout.write("Successful SFTP: {0}\n".format(file))
        return file    
    except OSError as e:
        status = sys.stderr.write("{0}\n".format(e))


def SFTPDir(host:str, port:str, username:str, password:str, keypath:str, remotepath:str, localpath:str) -> str:
    """
    Esta función es utilizada para realizar el envio de un directorio remoto
    a un directorio local
    Parametros
    ----------
        remotedir = 
        localdir = 

    """
    try:
        ssh = SSHConnect(host, username, port, keypath)
        sftp = ssh.open_sftp()    
        dir = sftp.listdir(remotepath)
        print(dir)
        print('Downloading...')
        print(remotepath+' >>>> '+localpath)
        sftp.get(remotepath, localpath)
        sftp.close()
        ssh.close()
        status = sys.stdout.write('Successfully SFTP: {0}'.format(remotepath))
        return sftp
    except OSError as e:
        status = sys.stderr.write('{0}'.format(e))
        return status
    

def jenkinsFile ():
    """
    Esta función es utilizada para poder obtener el nombre de la carpeta a realizar
    el zip
    Parametros
    ----------
        None: No neceista parametros
    Returns
    -------
        None: Retorna el nombre del archivo a respaldar, que es la fecha
        del día actual en el formato de respaldos de Jenkins
    """
    now = datetime.now()
    now_str = str(now)
    currentdate = now_str[0:10]
    nameDate = "FULL-"+currentdate+"_00-00"
    # print(nameDate)
    return nameDate

