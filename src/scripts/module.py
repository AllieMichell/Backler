#!/usr/bin/python

#Import required python libraries
import os
import sys
import csv 
import time
import pipes
import pymongo 
import dbtools
import paramiko
import sshtools 
import mongotools
import functionstools
from datetime import datetime
from mongotools import Backler
from pymongo import MongoClient

"""
FUNCIONES GLOBALES ESTABLECIDAS COMO MODULOS 
QUE SE UTILIZAN EN EL MAIN 
"""
def mysqlDump_SSH(servername:str, serverhost:str, serverport:str, serverpassword:str, ssh:str, sshpath:str, remotepath:str, localpath:str, dbip:str, dbtype:str, dbuser:str, dbpassword:str, dbname:str, dbtimestamp:str, projectName:str) -> str:
    """
    Este modulo es utilizado para poder realizar los respaldos de 
    mysql ademas de realizar los logs que se almacenan en la base de
    datos de logs
    Parametros
    ----------
        servername: Usuario del servidor --> ubuntu
        serverhost: IP del servidor 
        serverport: Puerto del servidor
        serverpassword: Contraseña del servidor
        ssh: Si existe o es respaldo por ssh
        sshpath: Ubicación de la llave rsa 
        remotepath: Ubicación en el servidor donde se realiza el dump
        localpath: Ubicación local en donde se guarda el dump
        dbip: IP de la base de datos
        dbtype: Tipo de base de datos 
        dbuser: Usuario de la base de datos
        dbpassword: Contraseña de la base de datos
        dbname: Nombre de la base de datos
        dbtimestamp: Fecha en la que se creo el log
        projectName: Nombre del projecto
    Returns
    -------
        None: Retorna el modulo de hacer un mysqldump
        por ssh, ademas de guardar los logs
    """ 
    MYSQLDUMP = dbtools.dumpMySQL_local(dbuser, dbpassword, dbip, dbname)
    print(dbname)
    MESSAGE =  dbtools.dumpMySQL_localMessage(dbuser, dbpassword, dbip, dbname)
    DB_STATUS = "successful"
    COMMANDS = "cd backups; sudo {0}".format(MYSQLDUMP)
    sshtools.SSHCommands(serverhost, servername, serverport, sshpath, COMMANDS)
    #Connection to Mongodb and save Log
    logs = mongotools.JSON_SCHEMA(projectName, dbtype, dbtimestamp, dbip, DB_STATUS, localpath, MESSAGE, ssh)
    mongoClient = MongoClient("localhost", 27017)
    db = mongoClient.Backler
    collection = db.logs
    for log in logs:
        collection.insert_one(log.toDBCollection())
    mongoClient.close()
    #SFTP Get Files
    FILES = ['latest.sql']
    sshtools.SFTPFiles(serverhost, serverport, servername, serverpassword, sshpath, remotepath, localpath, FILES)
    #Delete the files that we dump in the server
    COMMANDS = "cd backups; rm latest.sql"
    sshtools.SSHCommands(serverhost, servername, serverport, sshpath, COMMANDS)
    functionstools.deleteBackupLogs(localpath, dbtype)
    
def mongoDump_SSH(servername:str, serverhost:str, serverport:str, serverpassword:str, ssh:str, sshpath:str, remotepath:str, localpath:str, dbip:str, dbtype:str, dbport: str, dbname:str, dbtimestamp:str, projectName:str) -> str: 
    """
    Este modulo es utilizado para poder realizar los respaldos de 
    mongoDB ademas de realizar los logs que se almacenan en la base de
    datos de logs
    Parametros
    ----------
        servername: Usuario del servidor --> ubuntu
        serverhost: IP del servidor 
        serverport: Puerto del servidor
        serverpassword: Contraseña del servidor
        ssh: Si existe o es respaldo por ssh
        sshpath: Ubicación de la llave rsa 
        remotepath: Ubicación en el servidor donde se realiza el dump
        localpath: Ubicación local en donde se guarda el dump
        dbip: IP de la base de datos
        dbtype: Tipo de base de datos 
        dbport: Puerto de la base de datos
        dbname: Nombre de la base de datos
        dbtimestamp: Fecha en la que se creo el log
        projectName: Nombre del projecto
    Returns
    -------
        None: Retorna el modulo de hacer un mongodump
        por ssh, ademas de guardar los logs
    """
    MONGODUMP = dbtools.dumpMongo_latest(dbip, dbport, dbname)
    print(dbname)
    MESSAGE = dbtools.dumpMongo_latestMessage(dbip, dbport, dbname)
    DB_STATUS = "successful"
    COMMANDS = "cd backups; sudo {0}".format(MONGODUMP)
    sshtools.SSHCommands(serverhost, servername, serverport, sshpath, COMMANDS)
    #Connection to Mongodb and save Log
    logs = mongotools.JSON_SCHEMA(projectName, dbtype, dbtimestamp, dbip, DB_STATUS, localpath, MESSAGE, ssh)
    mongoClient = MongoClient("localhost", 27017)
    db = mongoClient.Backler
    collection = db.logs
    for log in logs:
        collection.insert_one(log.toDBCollection())
    mongoClient.close()
    #SFTP Get Files
    FILES = ['latest']
    sshtools.SFTPFiles(serverhost, serverport, servername, serverpassword, sshpath, remotepath, localpath, FILES)
    #Delete the files that we dump in the server
    COMMANDS = "cd backups; sudo rm -r latest"
    sshtools.SSHCommands(serverhost, servername, serverport, sshpath, COMMANDS)
    functionstools.deleteBackupLogs(localpath, dbtype)

def jenkins_SSH(servername:str, serverhost:str, serverport:str, serverpassword:str, ssh:str, sshpath:str, remotepath:str, localpath:str, dbtype:str, dbname:str, dbtimestamp:str, projectName:str) -> str: 
    """
    Este modulo es utilizado para poder realizar los respaldos de 
    Jenkins ademas de realizar los logs que se almacenan en la base de
    datos de logs
    Parametros
    ----------
        servername: Usuario del servidor --> ubuntu
        serverhost: IP del servidor 
        serverport: Puerto del servidor
        serverpassword: Contraseña del servidor
        ssh: Si existe o es respaldo por ssh
        sshpath: Ubicación de la llave rsa 
        remotepath: Ubicación en el servidor donde se realiza el dump
        localpath: Ubicación local en donde se guarda el dump
        dbtype: Tipo de base de datos 
        dbname: Nombre de la base de datos
        dbtimestamp: Fecha en la que se creo el log
        projectName: Nombre del projecto
    Returns
    -------
        None: Retorna el modulo de hacer el SFTP Protocol
        de la configuración de jenkins por ssh

    """
    STATUS = "successful"
    MESSAGE = "Successfully backup Jenkins configuration"
    jenkinsDate = sshtools.jenkinsFile()
    COMMANDS = "cd /var/lib/jenkins/backup; sudo zip -r {0}.zip {1}".format("latest",jenkinsDate)
    sshtools.SSHCommands(serverhost, servername, serverport, sshpath, COMMANDS)
    #Connection to Mongodb and save Log
    logs = mongotools.JSON_SCHEMA(projectName, dbtype, dbtimestamp, serverhost, STATUS, localpath, MESSAGE, ssh)
    mongoClient = MongoClient("localhost", 27017)
    db = mongoClient.Backler
    collection = db.logs
    for log in logs:
        collection.insert_one(log.toDBCollection())
    mongoClient.close()
    #SFTP Get Files 
    FILES = ["{0}.zip".format('latest')]
    sshtools.SFTPFiles(serverhost, serverport, servername, serverpassword, sshpath, remotepath, localpath, FILES)
    #Connection to MongoDB and save Log
    COMMANDS = "cd /var/lib/jenkins/backup; sudo rm -r latest.zip"
    sshtools.SSHCommands(serverhost, servername, serverport, sshpath, COMMANDS)
    functionstools.deleteBackupLogs(localpath, dbtype)

def mysqlDump_Module(ssh:str, localpath:str, dbip:str, dbtype:str, dbuser:str, dbpassword:str, dbname:str, dbtimestamp:str, projectName:str) -> str:
    """
    Este modulo es utilizado para poder realizar los respaldos de 
    mysql ademas de realizar los logs que se almacenan en la base de
    datos de logs
    Parametros
    ----------
        ssh: Si existe o es respaldo por ssh
        localpath: Ubicación local en donde se guarda el dump
        dbip: IP de la base de datos
        dbtype: Tipo de base de datos 
        dbuser: Usuario de las base de datos 
        dbpassword: Contraseña de la base de datos
        dbname: Nombre de la base de datos
        dbtimestamp: Fecha en la que se creo el log
        projectName: Nombre del projecto
    Returns
    -------
        None: Retorna el modulo de hacer un mysqldump
        por telnet, ademas de guardar los logs
    """
    MYSQLDUMP = dbtools.dumpMySQL_remote(dbuser, dbpassword, dbip, dbname)
    print(dbname)
    MESSAGE =  dbtools.dumpMySQL_remoteMessage(dbuser, dbpassword, dbip, dbname)
    DB_STATUS = "successful"
    #Connection to Mongodb and save Log
    logs = mongotools.JSON_SCHEMA(projectName, dbtype, dbtimestamp, dbip, DB_STATUS, localpath, MESSAGE, ssh)
    mongoClient = MongoClient("localhost", 27017)
    db = mongoClient.Backler
    collection = db.logs
    for log in logs:
        collection.insert_one(log.toDBCollection())
    mongoClient.close()
    functionstools.deleteBackupLogs(localpath, dbtype)

def mongoDump_Module(ssh:str, localpath:str, dbip:str, dbtype:str, dbport:str, dbname:str, dbtimestamp:str, projectName:str) -> str:
    """
    Este modulo es utilizado para poder realizar los respaldos de 
    mongoDB ademas de realizar los logs que se almacenan en la base de
    datos de logs
    Parametros
    ----------
        ssh: Si existe o es respaldo por ssh
        localpath: Ubicación local en donde se guarda el dump
        dbip: IP de la base de datos
        dbtype: Tipo de base de datos 
        dbname: Nombre de la base de datos
        dbtimestamp: Fecha en la que se creo el log
        projectName: Nombre del projecto
    Returns
    -------
        None: Retorna el modulo de hacer un mongodump
        por telnet, ademas de guardar los logs
    """
    MONGODUMP = dbtools.dumpMongo_latest(dbip, dbport, dbname)
    print(dbname)
    MESSAGE = dbtools.dumpMongo_latestMessage(dbip, dbport, dbname)
    DB_STATUS = "successful"
    #Connection to Mongodb and save Log
    logs = mongotools.JSON_SCHEMA(projectName, dbtype, dbtimestamp, dbip, DB_STATUS, localpath, MESSAGE, ssh)
    mongoClient = MongoClient("localhost", 27017)
    db = mongoClient.Backler
    collection = db.logs
    for log in logs:
        collection.insert_one(log.toDBCollection())
    mongoClient.close()
    functionstools.deleteBackupLogs(localpath, dbtype)