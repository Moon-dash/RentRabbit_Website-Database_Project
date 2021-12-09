import React from 'react'
import './UsersView.css'


const UsersView = ({ UserId, UserName, Rating, TransDone, TransactionDate}) =>{
    
    // Retuns a box with all the below info prinited in it
    return (
        <div className="user-container">
            <div className="user-div">
                <label>{UserId}</label>
                <label>{UserName}</label>
                <label>{Rating}</label>
                <label>Transactions Done: {TransDone}</label>
                <label>{TransactionDate} </label>
            </div>
        </div>
    ); 
}

export default UsersView;

