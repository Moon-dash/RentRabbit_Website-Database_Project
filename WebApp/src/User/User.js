import React, { Component } from 'react';
import Header from '../Header/Header';
import './User.css';
import Cookies from 'js-cookie';
import UserTableView from '../User/UserPage/UserTableView';

// Display the list of all users
class User extends Component {

    render() {
        //console.log(this.state.User);
        return(
            <div className="users-page">
                <Header />
                {/* Display the users table the same way as the tools table */}
                <div className="app-body">
                    <div className="table-View">
                        <UserTableView/>
                     </div>

                </div>
            </div>
        );
    }
}

export default User;