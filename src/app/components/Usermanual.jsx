import React, { Component } from 'react';
import './css/Usermanual.css';
import { Link } from 'react-router-dom';

export class Usermanual extends Component {

    render() {
        return (
            <div >
                <div style={{ marginTop: "0px" }} class="nav">
                    <ul class="menu">
                        <li><Link to="/dashboard"><h2>Dashboard</h2></Link></li>
                        <li><Link class="nav-link" to="/usermanual"><h2>Usermanual</h2></Link></li>

                        <li id="leftist"><Link to="/"><h2>Logout</h2></Link></li>


                        {/* <li name="abc"><a href="http://localhost:3001/Home">Log-Out </a></li>  s*/}
                    </ul>
                </div>
                <div class="proe">
                    <div><h1></h1>
                    <h2>Excel-Upload</h2>
                        <ul class="abc">
                            <li class="abc">&#8226; In this page user have to upload an excel file which has to be analysed.</li>
                            <li class="abc">&#8226;First you have browse from your computer,as soon as you select the file the preview of the file is shown below.</li>
                            <li class="abc">&#8226;You have to click upload button to upload data into database,and excel files should follow the exact convetion as showed in this image.</li>
                
                        </ul>
                     <h1> </h1>
                        
                        <div>
                            <img src="https://mail.google.com/mail/u/1?ui=2&ik=9ebac8bdc1&attid=0.1&permmsgid=msg-f:1670594090186569289&th=172f24794d6ff649&view=fimg&sz=s0-l75-ft&attbid=ANGjdJ9evxCJoBuLADm41z906vIVLSnQj-fGhwJV_36dtyPDDl12YTH6QvTPcW8uDPbSPeWq1L4ieuyiwRMYFTvYzJeZ4uXMNBARcUmiowMLIdJFLrRsq8WlTvMa67o&disp=emb&realattid=ii_kbwnq8vm0"></img>
                        </div>
                    </div>

                    <div><h2>Registered-Student-Data</h2>
                        <ul class="abc">
                            <li class="abc">&#8226;The data of the Students who filled this form(https://kjsieit-nptel.herokuapp.com) is shown in this tab. </li>

                            <li class="abc">&#8226;You can filter the data according to department, class and year.</li>
                            <li class="abc">&#8226;You can press DELETE option to get new data of students appearing in next semester,all the previous student's would get deleted.</li>
                       
                        </ul>
                    </div>
                    <div><h2>Analysed-Data</h2>
                        <ul class="abc"><li class="abc">&#8226;The data uploaded from the excel is analysed and its summary is presented here.</li>
                            <li class="abc">&#8226;One can filter data based on certificate type and year. </li>
                            <li class="abc">&#8226;You have to press DELETE for analysing new sheet . </li>
                            

                        </ul>


                    </div>
                    <div><h2>Total-Analysis</h2>
                        <ul class="abc">&#8226;
                        <li class="abc">&#8226;In this tab the user can view analysed data in the form of Pie chart.</li>
                            <li class="abc">&#8226;The Pie can be selected for all years or a particular year.</li>
                            <li class="abc">&#8226;You have to press DELETE for analysing new sheet.</li>

                        </ul>
                    </div>

                </div>
            </div>

        )
    }
};