import React, { Component } from 'react'
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import {Link}from 'react-router-dom';
import './css/total.css';
const url=process.env.NODE_ENV==`production`?``:"http://localhost:3000";
export class Total extends Component {

    constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
        dataLoaded:false,
         students: [
           
         ],
         elite: 0,
         elitegold:0,
         elitesilver:0,
         success:0,
         below40:0
      }
      this.handleSubmit8 = this.handleSubmit8.bind(this);

   }

   componentDidMount(){
       const that=this;
       var year='Select Year';
       var null1=0;
       console.log('in here');
    fetch(url+'/piedatayear', {
      method: 'POST',

      body: JSON.stringify({year: year, null1: null1 }), // data can be `string` or {object}!

      headers: { 'Content-Type': 'application/json' }
    })
    .then(res=>res.json())
    //.then(students=>this.setState({students}));
    .then(function(body){
        that.setState({students:Object.values(body.results)});
        console.log(body);
        if(true){
        that.setState({elite:parseInt(that.state.students[0].total_elite),
         below40:parseInt(that.state.students[0].below40),elitesilver:parseInt(that.state.students[0].totalelitesilver),
         success:parseInt(that.state.students[0].total_success),elitegold:parseInt(that.state.students[0].total_gold)});
        }
        }); 

   }

   handleSubmit8(event) {

    var null1 = 1;
    const that=this;
    var year = document.getElementById("year").value;
    if (year === 'Select Year') {
      null1 = 0;
    }
    fetch(url+'/piedatayear', {
      method: 'POST',

      body: JSON.stringify({year: year, null1: null1 }), // data can be `string` or {object}!

      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(function(body){
        console.log(body.results);
        if(body.results.length>0){
        that.setState({students:Object.values(body.results)});
        that.setState({elite:parseInt(that.state.students[0].total_elite),
         below40:parseInt(that.state.students[0].below40),elitesilver:parseInt(that.state.students[0].totalelitesilver),
         success:parseInt(that.state.students[0].total_success),elitegold:parseInt(that.state.students[0].total_gold)});
        }
        else{
          that.setState({
            elite: 0,
            elitegold:0,
            elitesilver:0,
            success:0,
            below40:0  
        });
        }
    }); 

    event.preventDefault();
  }

  truncatetable(){
    fetch(url + '/truncatetotal')
    .then(res=>res.json)
    
  }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
          <div>
         <div style={{marginTop:"-10px"}}>
         <ul class="nav menu"> 
         <li><Link to="/dashboard"><h2>Dashboard</h2></Link></li>
                 <li><Link class="nav-link" to="/usermanual"><h2>Usermanual</h2></Link></li>
          
                    <li id="leftist"><Link to="/"><h2>Logout</h2></Link></li>
               
             </ul>  
      </div>  
      <h1>

      </h1>
      
      <div class="select" style={{marginLeft:"580px", float:"center"}}>
      
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
 <button class="button" style={{float:"left",marginLeft:"690px"}} onClick={this.handleSubmit8}>Go</button>


<div className="div1" style={{float:"center",marginTop:"80px"}}>
<button class="button button1">Elite</button>
<button class="button button6">EliteSilver </button>
<button class="button button3">EliteGold</button>
<button class="button button4">SuccessfullyCompleted</button>
<button class="button button5">Below40</button>

<button class="button button2"style={{marginLeft:"80px", float:"center"}} onClick={this.truncatetable}>Delete</button>

</div>
      <div> 
      <ReactMinimalPieChart
  animate={true}
  animationDuration={500}
  animationEasing="ease-out"
  cx={50}
  cy={15}
  data={[
    {
      color: '#87ed18',
      title: 'One',
      value:this.state.elitesilver
    },
    {
      color: '#4ff7d0',
      title: 'Two',
      value: this.state.elite
    },
    {
      color: '#e93df2',
      title: 'Three',
      value: this.state.elitegold
    },
    {
      color:'#f28c0f',
      title:'four',
      value:this.state.success
    },
    {
      color:'#cf3d36',
      title:'five',
      value:this.state.below40
    }
  ]}
  label={true}
  labelPosition={50}
  labelStyle={{
    fill: '#121212',
    fontFamily: 'sans-serif',
    fontSize: '2px'
  }}
  lengthAngle={360}
  lineWidth={100}
  onClick={undefined}
  onMouseOut={undefined}
  onMouseOver={undefined}
  paddingAngle={0}
  radius={12}
  rounded={false}
  startAngle={0}
  viewBoxSize={[
    100,
    100
  ]}
/>
</div>


</div>
    );
  }
}