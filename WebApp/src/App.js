import React, { Component } from 'react';
import Header from './Header/Header'
import './App.css';
import TableView from './Tools/TableView';
import Login from './Login/Login';
import PopUsersTable from './popRenters/popUsersTable';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

// Main page displaying the tools and popular users
// Including a header to navigate to different pages
class App extends Component {
  render()  {
    return (
      <div className="App">
        <Header/>

        <div className="app-body">
            {/* Call the table view for the tools */}
            <div className="table-View">
              <TableView/>
            </div>

            {/* Call the table view for the popular users */}
            <div className="pop-users-view">
              <h1>Popular Users Near You</h1>
              <PopUsersTable/>
            </div>

        </div>

      </div>
    );
  }
}

export default App;
