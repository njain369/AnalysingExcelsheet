import React, { Component } from 'react';
import './Users.css';
import  {history} from '../store/history';
export class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '',
                       value1: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
    
        if(event.target.name==="t1"){
          this.setState({value: event.target.value});
        }else{
          this.setState({value1: event.target.value});
        }
       
       
       }
    handleSubmit(event) {
        if(this.state.value==='kjsieit' && this.state.value1==='1234'){
           //  window.localStorage.setItem("logged","yes");
             //window.location.href = "http://localhost:8080/dashboard";
             console.log("You passed");
          history.push('/dashboard'); 
        event.preventDefault();
        }else
        alert('please enter right credentials !')
      }
    render() {
        return (
            <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <div class="login100-pic js-tilt" data-tilt>
                        <img src="../public/img-01.png" alt="IMG"/>
                    </div>
    
                    <form class="login100-form validate-form" onSubmit={this.handleSubmit}>
                        <span class="login100-form-title">
                            Member Login
                        </span>
    
                        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input class="input100" type="text"name="t1"value={this.state.value} onChange={this.handleChange} placeholder="Username:"/>
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
    
                        <div class="wrap-input100 validate-input" data-validate = "Password is required">
                            <input class="input100" type="password" name="p1"value={this.state.value1} onChange={this.handleChange} placeholder="Password" />
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn">
                                Login
                            </button>
                        </div>
    

                    </form>
                </div>
            </div>
        </div>
        
        
           )}
}