import React, { Component } from 'react';
import './FileHandle.css';

import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback, Container, Card
} from 'reactstrap';
import { history } from '../store/history';
import { Link } from 'react-router-dom';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
const url=process.env.NODE_ENV==`production`?``:"http://localhost:3000";
export class FileHandle extends Component {
  constructor(props) {
    super(props);
    // if(window.localStorage.getItem("logged") !== "yes"){
    //   window.location.href = "http://localhost:3001/";
    // }
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.sqlupload = this.sqlupload.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
  }

  sqlupload = (event) => {
    this.setState({
      rows: event.target.value
    });

    console.log("Done");
    console.log(this.state.rows.length);
    var i = 1, k = 0;
    var n = this.state.rows.length;
    var year = '20'.concat(this.state.rows[2][3].substring(5, 7));
    var coursename = [];
    var elite = [];
    var elitesilver = [];
    var elitegold = [];
    var successComp = [];
    var below40 = [];

    for (i = 0; i < 50; i++) {
      elite[i] = 0;
      below40[i] = 0;
      successComp[i] = 0;
      elitegold[i] = 0;
      elitesilver[i] = 0;
    }

    coursename[0] = this.state.rows[1][2];
    console.log(this.state.rows[1][14]);
    if (this.state.rows[1][14] === "Successfully completed") {
      console.log("suceessfully completed");
      if (!successComp[k]) {
        successComp[k] = 0;
      }
      successComp[k]++;
    }
    else if (this.state.rows[1][14] === "Elite+Silver") {
      console.log("Ellitesilver");
      if (!elitesilver[k]) {
        elitesilver[k] = 0;
      }
      elitesilver[k]++;
    }
    else if (this.state.rows[1][14] === "Elite") {
      console.log("Ellite");
      if (!elite[k]) {
        elite[k] = 0;
      }
      elite[k]++;
    }
    else if (this.state.rows[1][14] === "Elite+gold") {
      console.log("Ellitegold");
      if (!elitegold[k]) {
        elitegold[k] = 0;
      }
      elitegold[k]++;
    }
    else if (this.state.rows[1][14] === "No Certificate") {
      console.log("No certificate");
      if (!below40[k]) {
        below40[k] = 0;
      }
      below40[k]++;
    }


    for (i = 1; i < n; i++) {
      if (this.state.rows[i][2] !== coursename[k]) {
        k++;
        coursename[k] = this.state.rows[i][2];
      }
      if (this.state.rows[i][14] === "Successfully completed") {
        console.log("suceessfully completed");
        if (!successComp[k]) {
          successComp[k] = 0;
        }
        successComp[k]++;
      }
      else if (this.state.rows[i][14] === "Elite+Silver") {
        console.log("Ellitesilver");
        if (!elitesilver[k]) {
          elitesilver[k] = 0;
        }
        elitesilver[k]++;
      }
      else if (this.state.rows[i][14] === "Elite") {
        console.log("Ellite");
        if (!elite[k]) {
          elite[k] = 0;
        }
        elite[k]++;
      }
      else if (this.state.rows[i][14] === "Elite+gold") {
        console.log("Ellitegold");
        if (!elitegold[k]) {
          elitegold[k] = 0;
        }
        elitegold[k]++;
      }
      else if (this.state.rows[i][14] === "No Certificate") {
        console.log("No certificate");
        if (!below40[k]) {
          below40[k] = 0;
        }
        below40[k]++;
      }
    }
    var elitesum = 0, successCompsum = 0, elitesilversum = 0, elitegoldsum = 0, below40sum = 0;
    for (i = 0; i < n; i++) {
      if (elite[i])
        elitesum = elitesum + elite[i];
      if (successComp[i])
        successCompsum = successComp[i] + successCompsum;
      if (elitesilver[i])
        elitesilversum = elitesilversum + elitesilver[i];
      if (elitegold[i])
        elitegoldsum = elitegoldsum + elitegold[i];
      if (below40[i])
        below40sum = below40sum + below40[i];
    }

    console.log("elite performance");
    console.log(elite)
    console.log(coursename);
    console.log(elitegoldsum);
    console.log(successCompsum);
    console.log(elitesilversum);
    console.log(elitegold);
    console.log("Successful completion");
    console.log(successComp);
    console.log(elitesilversum);
    console.log(this.state.roll);
    //    const data = { roll:this.state.roll,name:this.state.name , lastname:this.state.lastname }
    // axios.post(url+'/send',{
    //   method: 'POST',

    //   body: JSON.stringify({
    //     rows: this.state.rows, coursename: coursename,
    //     elite: elite, elitesum: elitesum,
    //     elitegold: elitegold, elitegoldsum: elitegoldsum,
    //     elitesilver: elitesilver, elitesilversum: elitesilversum,
    //     successComp: successComp, successCompsum: successCompsum,
    //     below40: below40, below40sum: below40sum, year: year
    //   }), // data can be `string` or {object}!

    //   headers: { 'Content-Type': 'application/json' }
    // })
    
    fetch(url+'/send', {
      method: 'POST',
      body: JSON.stringify({
        rows: this.state.rows, coursename: coursename,
        elite: elite, elitesum: elitesum,
        elitegold: elitegold, elitegoldsum: elitegoldsum,
        elitesilver: elitesilver, elitesilversum: elitesilversum,
        successComp: successComp, successCompsum: successCompsum,
        below40: below40, below40sum: below40sum, year: year
      }), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    //window.location.href = "http://localhost:3001/dashboard";
    history.push('/dashboard');
    event.preventDefault();
  }

  renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  }

  fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;


      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }
      else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }
  render() {
    return (
      <div>
      
       <div style={{marginTop:"0px"}} class="nav">
         <ul class="menu"> 
                 <li><Link to="/dashboard"><h1>Dashboard</h1></Link></li>
                    <li><Link to="/"><h1>Logout</h1></Link></li>
                    {/* <li name="abc"><a href="http://localhost:3001/Home">Log-Out </a></li>  s*/}
             </ul>  
      </div>
        <div style={{ marginTop: "0px" }}>

          <Container style={{marginTop:"100px"}}>
            <form>
              <FormGroup row>
                <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">Upload</Label>
                <Col xs={4} sm={8} lg={10}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Button color="info" style={{ color: "white", zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Browse&hellip;</Button>
                      <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                    </InputGroupAddon>
                    <Input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />
                    <FormFeedback>
                      <Fade in={this.state.isFormInvalid} tag="h6" style={{ fontStyle: "italic" }}>
                        Please select a .xlsx file only !
                  </Fade>
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>
            </form>

            {this.state.dataLoaded &&
              <div class="jumbotron-background">
                <Card body outline color="secondary" className="restrict-card">
                  <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
                </Card>
              </div>}
            <Button color="info" style={{ color: "white", zIndex: 0, margin: "auto", marginTop: "30px", display: "block" }} onClick={this.sqlupload.bind(this)} value={this.state.renderFile}><i className="cui-file"></i> Upload</Button>

          </Container>
        </div>
      </div>
    );
  }
}
