import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';


// components
import Home from './home/home';
import HomeRoute from './home/homeRoute';
import Intro from './home/intro';
import Table from './semaphore/tablePagination';
import Logs from './logsBackup/logs';
import Cards from './cardDB/cardsDB';
import IndividualInfo from './runBackup/individualInfo';
import Form from './form/form';
import Run from './runBackup/runBackup';
import RunIndividual from './runBackup/runIndividualBackup';
import Admin from './settings/administrator'
import Admin2 from './settings/administrator2'
import TableLogs from './runBackup/logs-table'
import addComponent from './addBD/index';
// import Loader from './loader/loader'


const Router = () => (
  <BrowserRouter>
    <Switch>
      <HomeRoute
        exact
        path="/"
      />
      <Home>
        <Route
          component={() => (
            <div className="App">
              <Switch>
                <Route exact path="/home" component={Intro} />
                <Route path="/backup_record" component={Table} />
                <Route path="/databases" component={Cards} />
                <Route path="/users" component={Form} />
                <Route path="/logs" component={Logs} />
                <Route path="/running-backup" component={Run} />
                <Route path="/running-individual-backup" component={RunIndividual} />
                <Route path="/project-backup/:idproject"  component={IndividualInfo} />
                <Route path="/admin-panel" component={Admin} />
                <Route path ="/admin-panel2" component={Admin2}/>
                <Route path="/tablelogs" component={TableLogs}/>
                <Route path="/add" component={addComponent}/>
                {/* <Route path="/loader" component={Loader}/> */}
              </Switch>
            </div>
          )}
        />
      </Home>
    </Switch>
  </BrowserRouter>
);
export default Router;
