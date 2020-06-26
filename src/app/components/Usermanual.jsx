import React, { Component } from 'react';
import './css/Usermanual.css';
import {Link} from 'react-router-dom';

export class Usermanual extends Component {

    render() {
        return (
            <div>
                <div style={{ marginTop: "0px" }} class="nav">
                    <ul class="menu">
                        <li><Link to="/dashboard"><h2>Dashboard</h2></Link></li>
                        <li><Link class="nav-link" to="/usermanual"><h2>Usermanual</h2></Link></li>

                        <li id="leftist"><Link to="/"><h2>Logout</h2></Link></li>


                        {/* <li name="abc"><a href="http://localhost:3001/Home">Log-Out </a></li>  s*/}
                    </ul>
                </div>

                <div><h1>Excel-Upload</h1>
                    <ul>
                        <li class="abc">In this page user have to upload an excel file which has to be analysed.</li>
                        <li class="abc">Excel files should follow the exact convetion as showed in this image.</li>
                        <li class="abc">First you have browse from your computer,as soon as you select the file the preview of the file is shown below.</li>
                        <li class="abc">You have to click upload button to upload data into database.</li>
                    </ul>
                </div>

                <div><h1>Registered-Student-Data</h1>
                    <ul>
                        <li class="abc">The data of the Students who filled this form(https://kjsieit-nptel.herokuapp.com) is shown in this tab. </li>

                        <li class="abc">You can filter the data according to department, class and year.</li>
                    </ul>
                </div>
                <div><h1>Analysed-Data</h1>
                    <ul><li class="abc">The data uploaded from the excel is analysed and its summary is presented here.</li>
                        <li class="abc">One can filter data based on certificate type and year. </li>

                    </ul>


                </div>
                <div><h1>Total-Analysis</h1>
                    <ul>
                        <li class="abc">In this tab the user can view analysed data in the form of Pie chart.</li>
                        <li class="abc">The Pie can be selected for all years or a particular year.</li>

                    </ul>
                </div>
            </div>
        )
    }
};