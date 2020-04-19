#!/usr/bin/python  

#Import required python libraries
import os
import sys
import shutil
from pymongo import MongoClient
from datetime import datetime
from sys import platform
"""
Este documento es utilizado para realizar aquellas funciones especiales para 
el sistema Backler
"""

def formatDATE():
    """
    Esta funcion es empleada para obtener el timestamp del momento en el que se
    realiza alguna acción en este caso el formato de la fecha con la cual se 
    crea el timestamp es el siguiente: 
    Monday, August 12, 2019 3:14 PM
    Returns
    -------
        formatDate: Timestamp en este formato Monday, August 12, 2019 3:14 PM
    """
    now = datetime.now()
    formatDate = now.strftime("%A, %B %d, %Y %H:%M:%S %p")
    return formatDate

def formatName(nameP:str) -> str: 
    """
    Esta funcion es empleada para poder crear el formato de los nombres de las 
    carpetas en las cual se guardaran los respaldos de las bases de datos, si el 
    nombre del proyecto tiene un espacio en su nombre ejemplo "Apis HUB", el 
    objetivo de la funcion es quitarle esos espacios de forma que al momento de 
    crear el directorio lo cree si espacios así "ApisHUB"
    Parametros
    ----------
        nameP: Nombre del proyecto
    Returns
    -------
        nameProject: Es el nombre del proyecto sin espacios
    """
    nameObject = list(nameP.split(" "))
    lengName = len(nameObject)
    if (lengName >= 2):
        concat = ""
        nameProject = (concat.join(nameObject))
        return nameProject
    else:
        nameProject = nameP
        return nameProject

def getDirectory(nameP:str) -> str:
    """
    Esta funcion es empleada para obtener el directorio del ordenador en el que se encuentre 
    ademas de parcearlo para poder obtener la ruta correcta del equipo al momento de establecer
    la ruta en la cual se estan realizando los respaldos de las bases de datos
    Paramestros
    -----------
        nameP: Se espera el nombre de la base de datos
    Returns
    --------
        pathC: Es el directorio completo en el cual se estaran realizando los respaldos
    """
    nameObject = list(nameP.split(" "))
    lengName = len(nameObject)
    if (lengName >= 2):
        concat = ""
        nameProject = (concat.join(nameObject))
    else:
        nameProject = nameP

    lo = os.getcwd()
    # print(lo)
    if platform == 'linux' or platform == 'linux2':
        li = list(lo.split("/"))
        var1 = li[0]
        var2 = li[1]
        var3 = li[2]
        pathC = ("{0}/{1}/{2}/Documents/Respaldos/{3}").format(var1, var2, var3, nameProject)
        return pathC
    elif platform == 'darwin':
        li = list(lo.split("/"))
        var1 = li[0] 
        var2 = li[1]
        var3 = li[2]
        pathC = ("{0}/{1}/{2}/Documents/Respaldos/{3}").format(var1, var2, var3, nameProject)
        return pathC
    elif platform == 'win32': 
        li = list(lo.split("\\"))
        var1 = li[0]
        var2 = li[1]
        var3 = li[2]
        pathC = ("{0}/{1}/{2}/Documents/Respaldos/{3}").format(var1, var2, var3, nameProject)
        return pathC

def deleteBackupLogs(directory:str, typeFile:str) -> str:
    """
    Esta funcion es empleada para eliminar el log de los respaldos de las bases de datos
    de forma que unicamente se tendran los ultimos tres respaldos de las bases de datos
    Parametros
    ----------
        directory: Directorio al cual entrara y eliminara los respaldos restantes 
        typeFile: Tipo de archivo que eliminara ya sea sql, zip o carpeta
    Returns
    -------
        Retorna el mensaje de eliminación de los respaldos
    """
    os.chdir(directory)
    files = os.listdir()

    if typeFile == 'mysql':
        for i in range(len(files) - 3):
            os.remove(files[i])

    elif typeFile == 'mongodb':
        for i in range(len(files) - 3):
            shutil.rmtree(files[i])
            
    elif typeFile == 'jenkins':
        for i in range(len(files) - 3):
            os.remove(files[i])