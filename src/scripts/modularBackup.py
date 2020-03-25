#!/usr/bin/python

import os
import csv 
import sys
import time
import json
#import getID
import dbtools
import pymongo 
import sshtools
import paramiko
import mongotools
import functionstools
import urllib.request
from datetime import datetime
from mongotools import Backler
from pymongo import MongoClient
import module

def getID():
    id = str(sys.argv[1])
    #print("El id que entro es: "+id)
    return id
projectID = getID()


ENV = os.environ["IP_API"]
uri = "http://{0}/backler/api/projects/project/{1}".format(ENV, projectID)
reader = urllib.request.urlopen(uri)
data = json.loads(reader.read().decode())
#Variables server
idjson = data["Projects"]["_id"]
servername = data["Projects"]["serverName"]
serverhost = data["Projects"]["serverHost"]
serverport = data["Projects"]["serverPort"]
serverpassword = data["Projects"]["serverPassword"]
#If exist ssh key
ssh = data["Projects"]["sshConnection"]
sshpath = data["Projects"]["sshPath"]
remotepath = data["Projects"]["remotePath"]
#Variables database
localpath = data["Projects"]["localPath"]#functionstools.getDirectory(data["Projects"]["projectName"])
dbip = data["Projects"]["dbIp"]
dbtype = data["Projects"]["dbType"]
dbport = data["Projects"]["dbPort"]
dbuser = data["Projects"]["dbUser"]
dbpassword = data["Projects"]["dbPassword"]
dbname = data["Projects"]["dbName"]
dbstatus = "success"
dbtimestamp = functionstools.formatDATE() #time.asctime()
projectName = data["Projects"]["projectName"]

#IF EXIST FOLDER DUMP, IF NOT EXIST CREATE FOLDER AND THEN DUMP
if os.path.exists(localpath): 
    print("----------{ Existe }----------")
    print(projectName)
else: 
    print('----------{ Fue Creado }----------')
    os.makedirs(localpath)
    print(projectName)

#SSH BACKUP
if ssh == True: 
    try:
        #MySQL Dump for SSH connection
        if dbtype == "mysql":
            os.chdir(localpath)
            if os.path.exists("latest.sql"):
                dbtools.renameFile_MySQL("latest.sql")
                module.mysqlDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbuser, dbpassword, dbname, dbtimestamp, projectName)
            else: 
                module.mysqlDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbuser, dbpassword, dbname, dbtimestamp, projectName)
        #Mongo Dump for SSH connection
        if dbtype == "mongodb": 
            os.chdir(localpath)
            if os.path.exists("latest"):
                dbtools.renameFile_MongoDB("latest")
                module.mongoDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)
            else: 
                module.mongoDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)
        #Jenkins Backup SSH connection
        if dbtype == "jenkins":
            os.chdir(localpath)
            if os.path.exists("latest"):
                dbtools.renameFile_Jenkins("latest")
                module.jenkins_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbtype, dbname, dbtimestamp, projectName)
            else: 
                module.jenkins_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbtype, dbname, dbtimestamp, projectName)
        
    except OSError as e:
        sys.stderr.write("{0}".format(e))
#TELNET BACKUP
else: 
    #MYSQL Backup
    if dbtype == "mysql":
        if dbuser =="" or dbpassword =="" or dbip =="" or  dbname =="": 
            MESSAGE = "Warnin: se encontraron campos vacios para respaldar la base de datos: {0} !".format(dbname)
            DB_STATUS = "warning"
            #Connection to Mongodb and save Log
            logs = mongotools.JSON_SCHEMA(dbname, dbtype, dbtimestamp, dbip, DB_STATUS, localpath, MESSAGE, ssh)
            mongoClient = MongoClient("localhost", 27017)
            db = mongoClient.Backler
            collection = db.Logs
            for log in logs:
                collection.insert_one(log.toDBCollection())
            mongoClient.close()
        else: 
            try:
                flag = str(dbtools.testConnectingDB_MYSQL(dbuser,dbpassword,dbip, dbname))
                
            except Exception as e:
                MESSAGE = "Error en la conexion a la base de datos: {0} !".format(dbname)
                DB_STATUS = "error"
                #Connection to Mongodb and save Log
                logs = mongotools.JSON_SCHEMA(dbname, dbtype, dbtimestamp, dbip, DB_STATUS, localpath, MESSAGE, ssh)
                mongoClient = MongoClient("localhost", 27017)
                db = mongoClient.Backler
                collection = db.Logs
                for log in logs:
                    collection.insert_one(log.toDBCollection())
                mongoClient.close()
            else:
                if flag =="1":
                    os.chdir(localpath)
                    if os.path.exists("latest.sql"):    
                        dbtools.renameFile_MySQL("latest.sql")
                        module.mysqlDump_Module(ssh, localpath, dbip, dbtype, dbuser, dbpassword, dbname, dbtimestamp, projectName)
                    else: 
                        module.mysqlDump_Module(ssh, localpath, dbip, dbtype, dbuser, dbpassword, dbname, dbtimestamp, projectName)
                else:
                    print("Revisa tu conexion a la base de datos")
    #mongodb Backup 
    if dbtype =="mongodb":
        os.chdir(localpath)
        if os.path.exists("latest"): 
            dbtools.renameFile_MongoDB("latest")
            module.mongoDump_Module(ssh, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)
        else: 
            module.mongoDump_Module(ssh, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)