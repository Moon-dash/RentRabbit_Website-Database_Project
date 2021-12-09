import React, { Component } from 'react';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import PersonalTableView from './PersonalTools/PersonalTableView';
import FavTable from './FavoriteTable/FavTable';
import './Profile.css';

class Profile extends Component {

    // State to get the username from the cookie
    state = {User: Cookies.get('user')};
    render() {
        return(
            <div className="profile-page">
                <Header />
                {/* Welcome message to the user */}
                
                <div>
                    <div>
                        <h1>
                            Welcome, {this.state.User}
                        </h1>
                    </div>
    
                    <div className="info-container">
                        <div className="user-tools">
                            <PersonalTableView/>
                        </div>
                        <div className="fav-tools">
                            <FavTable/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Profile;