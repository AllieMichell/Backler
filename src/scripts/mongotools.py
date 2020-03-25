#!/usr/bin/python

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

"""
Este documento es usado para crear las fucinones utilizadas 
para conectarse a la base de datos donde se encuentran
los logs del script 
"""
class Backler:
    """
    Esta clase es utilizada para crear la base de 
    datos en MongoDB, desde el schema 
    """
    def __init__(self, projectName, typeFile, hour, ip, status, pathLocation, message, method):
        
        self.projectName = projectName
        self.typeFile = typeFile
        self.hour = hour
        self.ip = ip
        self.status = status
        self.pathLocation = pathLocation
        self.message = message
        self.method = method
    
    def toDBCollection(self):
        return{
            "projectName":self.projectName,
            "typeFile":self.typeFile,
            "hour":self.hour,
            "ip":self.ip,
            "status":self.status,
            "pathLocation":self.pathLocation,
            "message":self.message,
            "method":self.method
        }
    
    def __str__(self):
        return "Name Project: %s - Type File: %s - Hour: %s - IP: %s - Status: %s - Path Location: %s - Message: %s - Method: %r" \
                %(self.projectName, self.typeFile, self.hour, self.ip, self.status, self.pathLocation, self.message, self.method)

def JSON_SCHEMA(projectName:str, dbtype:str, dbtimestamp:str, dbip:str, dbstatus:str, localpath:str, message:str, method:str) -> str:
    """
    Esta función es tilizada para insertar o colocar los datos del json
    que se emplearan en el Schema en el que se guardaran los datos en 
    la base de datos, recubre los parametros que se guardará en la base de 
    datos.
    Parametros
    ----------
        projectName: Nombre de la base de datos
        dbtype: Tipo del archivo (db)
        dbtimestamp: Fecha y hora en la que se guarda
        dbip: IP de la base de datos a la que realiza la consulta
        dbstatus: Status del respaldo y el log 
        localpath: Dirección absoluta en la que se guarda el arhivo
    Returns
    -------
        logs: Retorna el json con los datos almacenados en mongo
        status: Retorna el estatus del error
    """
    try:
        logs = [
            Buckler("{0}".format(projectName),
                    "{0}".format(dbtype),
                    "{0}".format(dbtimestamp),
                    "{0}".format(dbip),
                    "{0}".format(dbstatus),
                    "{0}".format(localpath),
                    "{0}".format(message),
                    "{0}".format(method)
            )
        ]
        #status = sys.stdout.write("Successfull save: {0}\n".format(logs))
        return logs
    except OSError as e:
        status = sys.stderr.write("{0}\n".format(e))
        return status

def update(nameProject:str, newDirectory:str) -> str: 
    """
    Esta funcion es utilizada para actualizar el directorio en el cual se realizan 
    los respaldos, basicamente en donde se guardan
    Parametros
    ----------
        nameProject: El nombre del proyecto
        newDirectory: El nuevo directorio de los respaldos
    Returns
    -------
        result: El nuevo directorio de los respaldos
    """
    try:
        mongoClient = pymongo.MongoClient("localhost", 27017)
        db = mongoClient.Buckler
        collection = db.projects
        result = collection.update_one(
        {'projectName':nameProject },
        {
            '$set':{
                'localPath': newDirectory
            }
        })
        mongoClient.close()
        return result
    except OSError as err:
        print(err)
