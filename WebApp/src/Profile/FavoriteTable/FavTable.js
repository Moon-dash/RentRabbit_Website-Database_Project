import axios from 'axios';
import React, { Component } from 'react'
import Cookies from 'js-cookie'
import './FavTable.css'
import FavTableView from './FavTableView';

class FavTable extends Component {

    state = {
        username: Cookies.get('user'),
        favTools: [],
    }

    componentDidMount() {
        this.getFavTools();  
    }

    getFavTools = () =>    {
        const{ username } = this.state;
        axios.get(`http://localhost:5000/fav/${username}`)
            .then(({data}) =>   {
                console.log(data);
                this.setState({favTools: data.data});
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //renders tool
    renderFavTool = ({ UserID, ToolID, ToolType, ToolName, Price}) => <FavTableView key={UserID} ID={UserID} ToolID={ToolID} Type={ToolType} Name={ToolName} Price={Price}></FavTableView>

    render()    {
        const { favTools } = this.state;
        return (
            <div className="favTools">
                <label class="fav-title">
                    Favorited Tools
                </label>
                {favTools.map(this.renderFavTool)}
            </div>
        );
    }
    
}


export default FavTable;