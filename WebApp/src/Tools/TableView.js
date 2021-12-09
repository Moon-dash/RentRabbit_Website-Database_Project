import React, { useState, useEffect, Component } from 'react'
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import $ from "jquery";
import './tableview.css'
import axios from 'axios';
import ToolView from './ToolView';
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import Paginate from 'react-paginate';

// Used for the search bar at the top, makes it expand if a user clicks on it
$(function()    {
        $(".icon").click(function() {
            $(".input").toggleClass("active");
        });
});

// Three titles in the sorting combo box
const comboboxData = [ "ToolName", "Price", "ToolType", "ToolID" ];

class TableView extends Component {

    // Needed states
    state = {
        column: "ToolID",
        tools: [],
        perPage: 10,
        currentPage: 0,
        offset: 0,
        search: ''
    }

    componentDidMount() {
        this.getTools();
    }

    // Gets all the available tools from the route
    getTools = () => {
        const { column, search } = this.state;

        axios.get(`http://localhost:5000/tools/order/${column}`)
            .then(({data}) => {
                let slice;
                let pagesData;
                if (search.length > 0) {
                    const rows = data.data;
                    slice = rows.filter((row) => {
                        return row.ToolName.toLowerCase().includes(search.toLowerCase());
                    });
                    pagesData = [...slice];
                } else {
                    slice = data.data;
                    pagesData = data.data;
                }
                slice = slice.slice(this.state.offset, this.state.offset + this.state.perPage);
                this.setState({
                    tools: slice,
                    pageCount: Math.ceil(pagesData.length / this.state.perPage)
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getTools();
        });
    }


    // Changes how the filter is sorting the tools
    handleFilterChange(e) {
        this.setState({ column: e, currentPage: 0 });
        this.getTools();
    }

    // Render a tool
    renderTool = ({ ToolID, ToolName, Price, ToolType, UserID, ForSale, ForRent }) => 
                    <ToolView key={ToolID} ID={ToolID} Name={ToolName} Price={Price} 
                    Type={ToolType} UserID={UserID} isForRent={ForRent} isForSale={ForSale}/>

    // Calls the filterTools function when the user clicks the search button
    handleToolSearch = (e) => {
        const value = e.target.value;
        this.setState({ search: value, currentPage: 0 });
        this.handlePageClick({ selected: 0 });
        this.getTools();
    }

    // Rendering all the available tools, search bar, and combo-box filter
    render()    {
        const { tools } = this.state;
        return (
            <div>
                <div className="filter-div">
                    <div className="search-div">
                        <label className="icon" class="icon">
                            <FaSearch/>
                        </label>
                        <form>
                            <input className="input" class="input" type="search" placeholder="search" onChange={this.handleToolSearch}></input>
                        </form>
                    </div>

                    <div className="sort-div">
                        <div classname="sort-label">
                            <label>Sort By:</label>
                        </div>

                        <ComboBox id="combo-box" class="combo-box" options={comboboxData} onOptionsChange={this.handleFilterChange.bind(this)} enableAutocomplete/>
                    </div>
                </div>

                <div>
                    {tools.map(this.renderTool)}
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


export default TableView;
