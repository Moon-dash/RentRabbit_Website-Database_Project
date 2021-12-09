import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Cookies from 'js-cookie';
import Header from '../Header/Header';
import { InsertTool } from '../Axios/Axios';



function InsertTools() {

  // Constants/functions to determine if the checkbox is clicked
  const [isSaleChecked, setIsSaleChecked] = useState(false);

  const [isRentChecked, setIsRentChecked] = useState(false);

  // Handle change of state of the checkboxes
  const handleSaleOnChange = () => {
    setIsSaleChecked(!isSaleChecked);
  };

  const handleRentOnChange = () => {
    setIsRentChecked(!isRentChecked);
  };

    // inserting new tool refs
    let toolnameReg = React.createRef();
    let toolpriceReg = React.createRef();
    let tooltypeReg = React.createRef();

    let navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    // Insert the tool with the given information into the table
    const insertTool = () => {
        // JSON of all the values to be inserted
        const data = {
            toolname: toolnameReg.value,
            toolprice: toolpriceReg.value,
            tooltype: tooltypeReg.value,
            username: Cookies.get('user'),
            sale: isSaleChecked,
            rent: isRentChecked
        }

        console.log(data);

        // Use axios to post the data into the table
        InsertTool(data, setErrMsg, navigate);

    }

    return (
      <div className="App">
        <Header/>
          <div className="login-container">

            <div className="login">

              <label style={{ fontSize: 40, fontWeight: 700, }}>Insert a New Tool</label>

              {/* Box to contain all the inputs needed to create a new tool */}
              <div className="input-box">
                <div className="inputs">
                  <label style={{ fontSize: 14, }}>
                    Tool Name:
                  </label>
                  <input type="text" placeholder="toolname" ref={tn => (toolnameReg = tn)} style={{ marginLeft: 20}}></input>
                </div>

                <div className="inputs">
                  <label style={{ fontSize: 14}}>
                      Tool Price:
                  </label>
                  <input type="text" placeholder="toolprice" ref={tp => (toolpriceReg = tp)} style={{ marginLeft: 25}}></input>
                </div>

                <div className="inputs">
                  <label style={{ fontSize: 14}}>
                      Tool Type:
                  </label>
                  <input type="text" placeholder="tooltype" ref={tt => (tooltypeReg = tt)} style={{ marginLeft: 25}}></input>
                </div>

                <div className="forsale">
                  <input
                    type="checkbox"
                    id="forsale"
                    name="forsale"
                    value="ForSale"
                    checked={isSaleChecked}
                    onChange={handleSaleOnChange}
                  />
                  For Sale
                </div>

                <div className="forrent">
                  <input
                    type="checkbox"
                    id="forrent"
                    name="forrent"
                    value="ForRent"
                    checked={isRentChecked}
                    onChange={handleRentOnChange}
                  />
                  For Rent
                </div>

              </div>
              <button style={{marginTop:50}} onClick={insertTool}>Submit</button>
            </div>
            {/* {errMsg ? alert(errMsg) : undefined} */}
          </div>
        </div>
    );
}

export default InsertTools;
