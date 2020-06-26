import React, { Component } from 'react'
import './Dashboard.css';
import { history } from '../store/history';
import {Link} from 'react-router-dom';
import {FileHandle} from './FileHandle';

export class Dashboard extends Component {

    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            students: [

            ]
        }
    }

    handleSubmit(event) {

        history.push('/filehandle')
        event.preventDefault();
    }

    handleSubmit1(event) {
        history.push('/studentdata');
        event.preventDefault();
    }

    handleSubmit2(event) {

        //window.location.href = "http://localhost:3001/filter";
        history.push('/filter')

        event.preventDefault();
    }

    handleSubmit3(event) {

        //   window.location.href = "http://localhost:3001/total";
        history.push('/total')

        event.preventDefault();
    }



    render() {
        return (

            <div>
                <ul class="menu">
                <li><Link to="/dashboard"><h2>Dashboard</h2></Link></li>
                 <li><Link class="nav-link" to="/usermanual"><h2>Usermanual</h2></Link></li>
          
                    <li id="leftist"><Link to="/"><h2>Logout</h2></Link></li>
               
                    {/* <li name="abc"><a href="http://localhost:3001/Home">Log-Out </a></li>  */}
                </ul>


                <div class="row1">


                    <div class="column">
                        <div class="box-2">
                            <div class="btn1 btn1-two">
                                <span onClick={this.handleSubmit}>Excel-Upload</span>
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <div class="box-2">
                            <div class="btn1 btn1-two">
                                <span onClick={this.handleSubmit1}>Registered-Student-Data</span>
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <div class="box-2">
                            <div class="btn1 btn1-two">
                                <span onClick={this.handleSubmit2}>Analysed-Data</span>
                            </div>
                        </div>


                    </div><div class="column">
                        <div class="box-2">
                            <div class="btn1 btn1-two">
                                <span onClick={this.handleSubmit3}>Total-Analysis</span>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
            
        )
    };
}

