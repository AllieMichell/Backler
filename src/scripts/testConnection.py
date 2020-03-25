#!/usr/bin/python

import os
import sys
import json
import dbtools
import pymysql
import sshtools
import moduleTesting
import functionstools
import urllib.request

def getID():
    id = str(sys.argv[1])
    return id
projectID = getID()


ENV = os.environ["IP_API"]
uri = "http://{0}/Backler/api/projects/project/{1}".format(ENV, projectID)
reader = urllib.request.urlopen(uri)
data = json.loads(reader.read().decode())

servername = data["Projects"]["serverName"]
serverhost = data["Projects"]["serverHost"]
serverport = data["Projects"]["serverPort"]
ssh = data["Projects"]["sshConnection"]
sshpath = data["Projects"]["sshPath"]
remotepath = data["Projects"]["remotePath"]
localpath = data["Projects"]["localPath"]
dbip = data["Projects"]["dbIp"]
dbtype = data["Projects"]["dbType"]
dbport = data["Projects"]["dbPort"]
dbuser = data["Projects"]["dbUser"]
dbpassword = data["Projects"]["dbPassword"]
dbname = data["Projects"]["dbName"]
projectName = data["Projects"]["projectName"]

#SSH CONNECTION
if ssh == True:
    try:
        if dbtype == "mysql": 
            status = moduleTesting.mysqlTestConnection_SSH(servername, serverhost, serverport, sshpath, dbip, dbuser, dbpassword, dbname)
            if(status == True):
                print('Success Connection')
            else:
                print('Connection Failed')
        elif dbtype == "mongodb":
            status = moduleTesting.mongoTestConnection_SSH(servername, serverhost, serverport, sshpath, dbip, dbport, dbname)
            if(status == True):
                print('Success Connection')
            else: 
                print('Connection Failed')
        elif dbtype == "jenkins":
            status = moduleTesting.jenkinsTestConnection_SSH(servername, serverhost, serverport, sshpath, remotepath)
            if(status == True):
                print('Success Connection')
            else: 
                print('Connection Failed')
    except OSError as err:
        print(err)
#TELNET CONNECTION
elif ssh == False:
    try:
        if dbtype == "mysql":
            status = moduleTesting.mysqlTestConnection(localpath, dbip, dbuser, dbpassword, dbname)
            if(status == True):
                print('Success connection')
            else: 
                print('Connection Failed')
        elif dbtype == "mongodb":
            status = moduleTesting.mongoTestConnection(localpath, dbip, dbport, dbname)
            if(status == True):
                print('Success connection')
            else:
                print('Connection Failed')
        elif dbtype == "jenkins":
            print('Jenkins')
            pass
    except OSError as err:
        print(err)
    