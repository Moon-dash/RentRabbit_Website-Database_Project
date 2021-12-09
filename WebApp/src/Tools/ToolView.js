import React, { useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import './Toolview.css';
import Expand from 'react-expand-animated';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Fav from './Fav';

const ToolView =  ({ ID, Type, Name, UserID, CompanyID, Price}) => {

    // refs for days
    let days = React.createRef();

    // Needed Variables, clicked is used for the drop down, toolSpecifics is used for the info in the drop down
    const [clicked, setClicked] = useState(false);
    const [toolSpecifics, setToolSpecifics] = useState('');

    let navigate = useNavigate();

    const displayToolData = (id) => {
        setClicked(!clicked);

        // Gets the tools from the route
        axios.get(`http://localhost:5000/tools/${ID}`)
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

    // Called when the buy tool button is clicked
    const buyTool = (id) => {
        // tell user to log in if they are not
        if (!Cookies.get('user')) {
            alert('Need to be Logged in to do that!');
            return;
        }

        const data = {
            username: Cookies.get('user'),
            toolID: id
        }

        axios.post(`http://localhost:5000/buy`, data)
            .then(({ data }) => {
                if (!data.success) {
                    console.log('redirecting...');
                    alert(data.message);
                    navigate('/App');
                    return;
                }
                else{
                    alert(data.message)
                    return;
                }

                // display success message
            })
            .catch((err) => {
                throw err;
            });

            // buyTool(data, setErrMsg, navigate);

    }

    const rentTool = (id) => {
        // tell user to log in if they are not
        if (!Cookies.get('user')) {
            alert('Need to be Logged in to do that!');
            return;
        }

        const data = {
            username: Cookies.get('user'),
            toolID: id,
            days: days.value || 10
        }

        console.log(data);

        axios.post(`http://localhost:5000/rent`, data)
            .then(({ data }) => {
                if (!data.success) {
                    console.log('redirecting...');
                    alert(data.message);
                    navigate('/App');
                    return;
                }
                else{
                    alert(data.message)
                    return;
                }

                // display success message
            })
            .catch((err) => {
                throw err;
            });

    }

    // Renders the info in the drop down
    function renderInfo({ Username, ForSale, ForRent, Address })  {
        return(
        <div key={ID} className="tool-expanded">
            <div className="left-div">
                <label>Owner: {Username}</label>
                <label>Address: {Address}</label>

            </div>
            <div className="mid-div">
                <label>For Rent: {ForRent? 'Yes' : 'No'}</label>
                <label>For Sale: {ForSale? 'Yes' : 'No'}</label>
            </div>
            <div className="right-div">
                    <button className="buy-btn" onClick={() => buyTool(ID)}>Buy Tool</button>
                    <button className="rent-btn" onClick={() => rentTool(ID)}>Rent Tool</button>
                    Days for rent:
                    <input type="number" ref={d => (days = d)} placeholder="10"/>
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
                <Fav ID={ID} />
                <FaChevronCircleDown className="icon-chevron" onClick={() => displayToolData(ID)}/>
            </div>

            <Expand className="expand" open={clicked}>
                <div className="expandDiv">
                    {renderInfo(toolSpecifics)}
                </div>
            </Expand>

        </div>
    );
    }

export default ToolView;
