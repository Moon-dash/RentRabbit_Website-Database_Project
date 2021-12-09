import React, { useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import Expand from 'react-expand-animated';
import axios from 'axios';


const FavTableView =  ({ ID, ToolID, Type, Name, UserID, CompanyID, Price}) => {
    // Needed Variables, clicked is used for the drop down, toolSpecifics is used for the info in the drop down
    const [clicked, setClicked] = useState(false);
    const [toolSpecifics, setToolSpecifics] = useState('');

    const displayFavTool= (id) => {
        setClicked(!clicked);

        console.log(ID);
        // Gets the tools from the route
        axios.get(`http://localhost:5000/tools/${ToolID}`)
            .then(({data}) => {
                if (data.row) {
                    setToolSpecifics(data.row);
                    console.log(data.row);
                }
            })
            .catch((err) => {
                // setToolSpecifics(err.message);
                console.error(err);
            });
    }

    // Renders the info in the drop down 
    function renderInfo({ Username, ForSale, ForRent, Address })  {
        return(
        <div key={ID} className="tool-expanded">
            <div className="left-div">
                <label>Owner: {Username}</label>   
                <label>For Rent: {ForRent? 'Yes' : 'No'}</label>
            </div>
            <div className="right-div">
                <label>Address: {Address}</label>
                <label>For Sale: {ForSale? 'Yes' : 'No'}</label>
            </div>

            <div>
                <label>ID: {ID}</label>
            </div>
            
        </div>
        );   
    }

    // Renders a tool
    return (
        <div className="tool-container">
            <div className="tool-div">
                <label className="name">Name: {Name}</label>
                <label className="price">${Price}</label>
                <label className="type">Type: {Type}</label>
                <FaChevronCircleDown className="icon-chevron" onClick={() => displayFavTool(ID)}/>
            </div>

            <Expand className="expand" open={clicked}>
                <div className="expandDiv">
                    {renderInfo(toolSpecifics)}
                </div>
            </Expand>

        </div>
    );
}

export default FavTableView;
