#!/usr/bin/python 

#Import required python libraries
import os
import sys
import time
import pipes
import shutil
import pymongo
import paramiko
#Import required custom python libraries
import dbtools
import sshtools
import functionstools

"""
FUNCIONES GLOBALES ESTABLECIDAS COMO MODULOS 
PARA CREAR EL TEST DE CONECCIÓN A LAS BASES
DE DATOS Y CONFIGURACIONES DE JENKINS
"""
def mysqlTestConnection_SSH(servername:str, serverhost:str, serverport:str, sshpath:str, dbip:str, dbuser:str, dbpassword:str, dbname:str) -> str:
    """
    Esta función es empleada para hacer un test de conección al servidor de las bases de datos 
    MySQL via SSH 
    Parametros
    ----------
        servername: Nombre / SO del servidor
        serverhost: Dirección IP del servidor
        serverport: Puerto del servidor
        sshpath: Directorio de ubicación de la llave RSA SSH
        dbip: Dirección IP de la base de datos
        dbuser: Usuario de la base de datos
        dbpassword: Contraseña de la base de datos
        dbname: Nombre de la base de datos
    Return 
    ------
        Retorna el status de la ejecución del proceso se representa con un Booleano
    """
    try:
        mysqlDump = dbtools.dumpMySQL_local(dbuser, dbpassword, dbip, dbname)   
        cBackup = 'cd backups; sudo {0}'.format(mysqlDump)
        sshtools.SSHTestCommands(serverhost, servername, serverport, sshpath, cBackup)
        cValidation = 'cd backups; ls; rm latest.sql'
        sshtools.SSHTestCommands(serverhost, servername, serverport, sshpath, cValidation)
        return True
    except OSError as err:
        return False
        

    
def mongoTestConnection_SSH(servername:str, serverhost:str, serverport:str, sshpath:str, dbip:str, dbport:str, dbname:str) -> str:
    """
    Esta función es empleada para hacer un test de conección al servidor de las bases de datos 
    MongoDB via SSH 
    Parametros
    ----------
        servername: Nombre / SO del servidor
        serverhost: Dirección IP del servidor
        serverport: Puerto del servidor
        sshpath: Directorio de ubicación de la llave RSA SSH
        dbip: Dirección IP de la base de datos
        dbport: Puerto de la base de datos
        dbname: Nombre de la base de datos
    Return 
    ------
        Retorna el status de la ejecución del proceso se representa con un Booleano
    """
    try:
        mongoDump = dbtools.dumpMongo_latest(dbip, dbport, dbname)
        cBackup = 'cd backups; sudo {0}'.format(mongoDump)
        sshtools.SSHCommands(serverhost, servername, serverport, sshpath, cBackup)
        cValidation = 'cd backups; ls; sudo rm -r latest'
        sshtools.SSHCommands(serverhost, servername, serverport, sshpath, cValidation)
        return True
    except OSError as err:
        return False
    


def jenkinsTestConnection_SSH(servername:str, serverhost:str, serverport:str, sshpath:str, remotepath:str) -> str:
    """
    Esta función es empleada para hacer un test de conección al servidor de las configuraciones 
    Jenkins via SSH 
    Parametros
    ----------
        servername: Nombre / SO  del servidor
        serverhost: Dirección IP del servidor
        serverport: Puerto del servidor
        sshpath: Directorio de ubicación de la llave RSA SSH
        remotepath: Directorio al cual va y busca el archivo a respaldar
    Return
    ------
        Retorna el status de la ejecución del proceso se representa con un Booleano
    """
    try:
        jenkinsDate = sshtools.jenkinsFile()
        cBackup = 'cd /var/lib/jenkins/backup; sudo zip -r {0}.zip {1}'.format("latest",jenkinsDate)
        sshtools.SSHTestCommands(serverhost, servername, serverport, sshpath, cBackup)
        cValidation = 'cd /var/lib/jenkins/backup; ls'
        sshtools.SSHTestCommands(serverhost, servername, serverport, sshpath, cValidation)
        return True
    except OSError as err:
        return False

def mysqlTestConnection(localpath:str, dbip:str, dbuser:str, dbpassword:str, dbname:str) -> str:
    """
    Esta función es empleada para hacer un test de conección al servidor de las bases de datos 
    MySQL
    Parametros
    ----------
        localpath: Directorio local en el cual se realizarán los respaldos
        dbip: Dirección IP de la base de datos
        dbuser: Usuario de la base de datos
        dbpassword: Contraseña de la base de datos
        dbname: Nombre de la base de datos
    Return 
    ------
        Retorna el status de la ejecución del proceso se representa con un Booleano
    """
    try:
        if dbuser=="" or dbpassword =="" or dbip=="" or dbname=="":
            return False
        else:
            os.chdir(localpath)
            os.system("mysqldump --databases --create-options --add-drop-database --column-statistics=0 --routines=true --triggers -h{2} -u{0} -p{1} {3} > {3}.sql".format(dbuser, dbpassword, dbip, dbname))
            os.remove(("{0}.sql").format(dbname))
            return True
    except OSError as err:
        return False

def mongoTestConnection(localpath:str, dbip:str, dbport:str, dbname:str) -> str:
    """
    Esta función es empleada para hacer un test de conección al servidor de las bases de datos 
    MongoDB
    Parametros
    ----------
        localpath: Directorio local en el cual se realizarán los respaldos
        dbip: Dirección IP de la base de datos
        dbport: Puerto de la base de datos
        dbname: Nombre de la base de datos
    Return 
    ------
        Retorna el status de la ejecución del proceso se representa con un Booleano
    """
    try:
        if dbip =="" or dbport =="" or dbname=="":
            return False
        else: 
            os.chdir(localpath)
            os.system("mongodump --host {0} --port {1} --db {2} --out {2}".format(dbip, dbport, dbname))
            shutil.rmtree("{0}".format(dbname))
            return True
    except OSError as err:
        return False   