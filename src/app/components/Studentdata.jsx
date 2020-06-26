import React, { Component } from 'react'
import './css/Studentdata.css';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
const url = process.env.NODE_ENV == `production` ? `` : "http://localhost:3000";

export class Studentdata extends Component {
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
      students: [],
      columns: [
        {
          dataField: "Name",
          text: 'Name'
        },
        {
          dataField: "Lastname",
          text: 'Lastname'
        },
        {
          dataField: "DOB",
          text: 'DOB'
        },
        {
          dataField: "Rollno",
          text: 'Rollno'
        },
        {
          dataField: "Caste",
          text: 'Caste'
        },
        {
          dataField: "Gender",
          text: 'Gender'
        },
        {
          dataField: "Email",
          text: 'Email'
        },
        {
          dataField: "Phone",
          text: 'Phone'
        },
        {
          dataField: "Year",
          text: 'Year'
        },
        {
          dataField: "Branch",
          text: 'Branch'
        },
        {
          dataField: "StudentFaculty",
          text: 'StudentFaculty'
        },
        {
          dataField: "Coursename",
          text: 'Coursename'
        },



      ]
    }
    this.handleSubmit4 = this.handleSubmit4.bind(this);
  }

  download() {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: url + '/downstd',
      };
      // server sent the url to the file!
      // now, let's download:
      // window.location.href = response.file;
      // you could also do:
      window.open(response.file);
    }, 100);
  }




  handleSubmit4(event) {
    var that = this;
    var null1 = 1;
    var dep = document.getElementById("dep").value;
    var class1 = document.getElementById("category").value;
    var year = document.getElementById("year").value;
    if (dep === 'Select Department' && class1 === 'Select Class' && year === 'Select Year') {
      null1 = 0;
    }
    fetch(url + '/studentdata', {
      method: 'POST',

      body: JSON.stringify({ dep: dep, class1: class1, year: year, null1: null1 }), // data can be `string` or {object}!

      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(function (body) {
        that.setState({ students: body.results });
        console.log("Inside promise")
        console.log(that.state.students);
      });

    event.preventDefault();
  }
  componentDidMount() {
    var that = this;
   
    console.log('in here');
    fetch(url + '/selectstd')
      .then(res => res.json())
      //.then(students=>this.setState({students}));
      .then(function (body) {
        that.setState({ students: body.results });
        console.log(that.state.students);
      });
    //      that.state.array =Object.keys(this.state.updatestud);

    // //that.state.array =Object.entries(that.state.updatestud);
    // that.state.array = Object.values(that.state.students);
    // console.log(that.state.array)
    this.handleSubmit4;
  }

  render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
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


        <div class="row11">
          <div class="col11" >

            <h1></h1>
            <div class="select">
              <select name="slct" id="dep">
                <option selected>Select Department</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
                <option value="Electronics and Telecommunication">Electronics and Telecommunication</option>
                <option value="Computer">Computer</option>
              </select>
            </div>
          </div>
          <div class="col11">

            <h1></h1>
            <div class="select">
              <select name="slct" id="category">
                <option selected >Select Class</option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>

            </div>
            <button class="button button2" onClick={this.handleSubmit4}>Go</button>
          </div>
          <div class="col11">

            <h1></h1>
            <div class="select">
              <select name="slct" id="year">
                <option selected>Select Year</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <button class="button button2" onClick={this.download}>Excel-Download</button>

          </div>
        </div>
        <p id="demo"></p>
        <div class="center-col">
          <BootstrapTable wrapperClasses="boo" keyField="Name" data={this.state.students} columns={this.state.columns} />
        </div>
      </div>
    )
  }
}