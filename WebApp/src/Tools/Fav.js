import React, { Component } from 'react';
import { FaHeart } from 'react-icons/fa';
import { InsertFavourite, DeleteFavourite } from '../Axios/Axios';
import Cookies from 'js-cookie';
import axios from 'axios';

// component to like/unlike tools
export default class Fav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fav: false
        }
    }

    checkFavTools = () => {
        axios.get(`http://localhost:5000/fav/${Cookies.get('user')}`)
            .then(({data}) => {
                for (let tool of data.data) {
                    if (tool.ToolID === this.props.ID) {
                        this.setState({ fav: true });
                        return;
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
    }

    handleFav = () => {

        const { fav } = this.state;

        const info = {
            username: Cookies.get('user'),
            toolID: this.props.ID
        }

        this.setState({ fav: !fav });

        if (!fav)   {
            InsertFavourite(info);
        } else  {
            DeleteFavourite(info);
        }
    }

    componentDidMount() {
        this.checkFavTools();
    }

    render() {
        return (
            <FaHeart id="icon-heart" className="icon-heart" class={this.state.fav ? 'icon-heart-active' : 'icon-heart'} onClick={() => {this.handleFav()}}/>
        );
    }
}
