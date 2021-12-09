import React, { useState, useEffect, Component } from 'react'
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import $ from "jquery";
import './UserView.css'
import axios from 'axios';
import UserView from './UserView';
import Paginate from 'react-paginate';


class UserTableView extends Component {

    // States for displaying users
    state = {
        users: [],
        perPage: 10,
        currentPage: 0,
        offset: 0,
        search: ''
    }

    componentDidMount() {
        this.getUsers();
    }

    // Getting users from the below route
    getUsers = _ => {

        const { column, search } = this.state;

        axios.get('http://localhost:5000/users')
            .then(({data}) => {
                let slice;
                let pagesData;
                if (search.length > 0) {
                    const rows = data.data;
                    slice = rows.filter((row) => {
                        return row.Username.toLowerCase().includes(search.toLowerCase());
                    });
                    pagesData = [...slice];
                } else {
                    slice = data.data;
                    pagesData = data.data;
                }
                slice = slice.slice(this.state.offset, this.state.offset + this.state.perPage);
                this.setState({
                    users: slice,
                    pageCount: Math.ceil(pagesData.length / this.state.perPage)
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // Renders a User
    renderUsers = ({ UserID, Username, Rating, Address}) => <UserView key={UserID} ID={UserID} Username={Username} Rating={Rating} Address={Address}></UserView>

    // Calls the filterUsers function when the user clicks on the search bar
    hangleUsersSearch = (e) => {
        const value = e.target.value;
        this.setState({ search: value, currentPage: 0 });
        this.handlePageClick({ selected: 0 });
        this.getUsers();
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getUsers();
        });
    }

    // Renders the list of users
    render()    {
        const { users } = this.state;
        return (        
            <div>
                <div className="search-div">
                    <label className="icon-search" class="icon">
                        <FaSearch/>
                    </label>
                    <form>
                        <input className="input" class="input" type="search" placeholder="search" onChange={this.hangleUsersSearch}></input>
                    </form> 
                </div>

                <div>
                    {users.map(this.renderUsers)}
                    <Paginate
                        previousLabel={<FaArrowLeft style={{ color: 'var(--header)' }}/>}
                        nextLabel={<FaArrowRight style={{ color: 'var(--header)' }} />}
                        breakLabel={"..."}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"pg-active"}
                    />
                </div>
            </div>
        );
    }
}


export default UserTableView;
