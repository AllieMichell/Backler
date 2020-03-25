#!/usr/bin/python

import os
import csv 
import sys
import time
import json
import pipes
import module
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

ENV = os.environ["IP_API"]
uri = "http://{0}/backler/api/directory/dirList".format(ENV)
reader = urllib.request.urlopen(uri)
data = json.loads(reader.read().decode())
newData = data[0]['projects']
directoryPath = data[0]['directoryPath']
#DYNAMIC BACKUP OF DATABASES 
for i in range(len(newData)): 
    idjson = newData[i]["_id"]
    servername = newData[i]["serverName"]
    serverhost = newData[i]["serverHost"]
    serverport = newData[i]["serverPort"]
    serverpassword = newData[i]["serverPassword"]
    ssh = newData[i]["sshConnection"]
    sshpath = newData[i]["sshPath"]
    remotepath = newData[i]["remotePath"]
    localpath = ("{0}/{1}").format(directoryPath ,functionstools.formatName(newData[i]["projectName"])) #newData[i]["localPath"] #functionstools.getDirectory(newData[i]["projectName"])
    dbip = newData[i]["dbIp"]
    dbtype = newData[i]["dbType"]
    dbport = newData[i]["dbPort"]
    dbuser = newData[i]["dbUser"]
    dbpassword = newData[i]["dbPassword"]
    dbname = newData[i]["dbName"]
    dbtimestamp = functionstools.formatDATE()
    projectName = newData[i]["projectName"]
    
    #IF EXIST FOLDER DUMP, IF NOT EXIST CREATE FOLDER AND THEN DUMP
    if os.path.exists(localpath): 
        print("----------{ Existe }----------")
        print(projectName)
        print(dbtype)
        print(dbtimestamp)
    else: 
        print('----------{ Fue Creado }----------')
        os.makedirs(localpath)
        print(projectName)
        print(dbtimestamp)
    
    #If Exist ssh Connection
    #ssh BACKUP
    if ssh == True: 
        try:
            #MySQL Dump for ssh connection
            if dbtype == "mysql":
                mongotools.update(projectName, localpath)
                os.chdir(localpath)
                if os.path.exists("latest.sql"):
                    dbtools.renameFile_MySQL("latest.sql")
                    module.mysqlDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbuser, dbpassword, dbname, dbtimestamp, projectName)
                else: 
                    module.mysqlDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbuser, dbpassword, dbname, dbtimestamp, projectName)
            #Mongo Dump for ssh connection
            if dbtype == "mongodb": 
                mongotools.update(projectName, localpath)
                os.chdir(localpath)
                if os.path.exists("latest"):
                    dbtools.renameFile_MongoDB("latest")
                    module.mongoDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)
                else: 
                    module.mongoDump_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)
            #Jenkins Backup ssh connection
            
            if dbtype == "jenkins":
                mongotools.update(projectName, localpath)
                os.chdir(localpath)
                if os.path.exists("latest.zip"):
                    dbtools.renameFile_Jenkins("latest.zip")
                    module.jenkins_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbtype, dbname, dbtimestamp, projectName)
                else: 
                    module.jenkins_SSH(servername, serverhost, serverport, serverpassword, ssh, sshpath, remotepath, localpath, dbtype, dbname, dbtimestamp, projectName)
            
        except OSError as e:
            sys.stderr.write("{0}".format(e))
    #TELNET BACKUP
    else: 
        #MYSQL Backup
        if dbtype == "mysql":
            mongotools.update(projectName, localpath)
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
                    print(flag)
                    
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
            mongotools.update(projectName, localpath)
            os.chdir(localpath)
            if os.path.exists("latest"): 
                dbtools.renameFile_MongoDB("latest")
                module.mongoDump_Module(ssh, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)
            else: 
                module.mongoDump_Module(ssh, localpath, dbip, dbtype, dbport, dbname, dbtimestamp, projectName)
