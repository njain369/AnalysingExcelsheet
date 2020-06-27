import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import './css/filter.css';
import { Link } from 'react-router-dom';
const url = process.env.NODE_ENV == `production` ? `` : "http://localhost:3000";
export class Filter extends Component {
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor

    this.state = { //state is by default an object
      dataLoaded: false,
      students: [

      ],
      updatestud: [],
      columns: [
        {
          dataField: 'c_name',
          text: "Course Name"
        },
        {
          dataField: 'elite_performance',
          text: 'Elite Performance'
        }, {
          dataField: 'elitegold',
          text: 'Elite Gold'
        }, {
          dataField: 'success_completed',
          text: 'Course Completed'
        },
        {
          dataField: 'below40',
          text: 'Below 40'
        },
        {
          dataField: 'elitesilver',
          text: 'Elite Silver'
        },
        {
          dataField: 'year',
          text: 'Year'
        }]

    }
    this.handleSubmitfilter = this.handleSubmitfilter.bind(this);
    this.truncatetable1 = this.truncatetable1.bind(this);
  }

  handleSubmitfilter(event) {

    var null1 = 1;
    var class1 = document.getElementById("certificate").value;
    var year = document.getElementById("year").value;
    if (class1 === 'Certificate-Type' && year === 'Select Year') {
      null1 = 0;
    }
    const that = this;

    fetch(url + '/filterdata', {
      method: 'POST',

      body: JSON.stringify({ class1: class1, year: year, null1: null1 }), // data can be `string` or {object}!

      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(function (body) {
        that.setState({ updatestud: Object.values(body.results) })
      });


    event.preventDefault();
  }

  componentDidMount() {
    const that = this;
    var null1 = 0;
    var class1 = 'Certificate-Type';
    var year = 'Select Year';


    console.log('in here');
    fetch(url + '/filterdata', {
      method: 'POST',

      body: JSON.stringify({ class1: class1, year: year, null1: null1 }), // data can be `string` or {object}!

      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      //.then(students=>this.setState({students}));
      .then(function (body) {
        that.setState({ students: body });
        console.log('in here students');
        console.log(that.state.students);
        console.log("refined data is here")
        if (true) {
          that.setState({ updatestud: body.results })
        }
        //    console.log(that.state.updatestud);
        //   console.log("This is new data")
        //        that.setState({updatestud:Object.values(body.results)})
        //      console.log(that.state.updatestud);
      });
    //      that.state.array =Object.keys(this.state.updatestud);

    // //that.state.array =Object.entries(that.state.updatestud);
    // that.state.array = Object.values(that.state.students);
    // console.log(that.state.array)
    //this.handleSubmitfilter;
  }
  download() {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: url + '/analysisreport',
      };
      // server sent the url to the file!
      // now, let's download:
      window.location.href = response.file;
      // you could also do:
      // window.open(response.file);
    }, 100);
  }

  truncatetable1() {
    console.log("Inside Truncate Filter")
    var that = this;
    fetch(url +'/truncatefilter',{
      method: 'POST',

      body: JSON.stringify({class:"TE"}), // data can be `string` or {object}!

      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json)

  }


  render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <div class="aditya">
        <div style={{ marginTop: "0px" }} class="nav">
          <ul class="menu">
            <li><Link to="/dashboard"><h2>Dashboard</h2></Link></li>
            <li><Link class="nav-link" to="/usermanual"><h2>Usermanual</h2></Link></li>

            <li id="leftist"><Link to="/"><h2>Logout</h2></Link></li>

            {/* <li name="abc"><a href="http://localhost:3001/Home">Log-Out </a></li>  s*/}
          </ul>
        </div>
        <div class="row11">
          <div class="col11">



          </div>

          <div class="col11" style={{ marginLeft: "300px", float: "center" }}>

            <h1></h1>
            <div class="select">
              <select name="slct" id="certificate">
                <option selected>Certificate-Type</option>
                <option value="elitegold">Elite+Gold</option>
                <option value="elitesilver">Elite+Silver</option>
                <option value="elite_performance">Elite</option>
                <option value="success_completed">Successfully-Completed</option>
                <option value="below40">Below-40</option>
              </select>

            </div>
            <button class="button button2" style={{ marginLeft: "96px", float: "center" }} onClick={this.handleSubmitfilter}>Go</button>

          </div><div class="col11">

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
            <button class="button button2" style={{ marginLeft: "80px", float: "center" }} onClick={this.download}>Excel-Download</button>
            <button class="button button2" style={{ marginLeft: "80px", float: "center" }} onClick={this.truncatetable1}>Delete</button>
          </div>

        </div>
        <p id="demo"></p>
        <div class="center-col">
          <BootstrapTable wrapperClasses="boo" keyField="total_elite" data={this.state.updatestud} columns={this.state.columns} />
        </div>

      </div>
    )
  }
}