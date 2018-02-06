import React, { Component } from 'react';
import axios from 'axios';

export default class Products extends Component {

  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  handleSubmit(event) {
    const url = "http://localhost:3000/api/v1/sessions/login";
    const data = { email: this.state.email, password: this.state.password }
    axios.post(url, data)
    .then( response => response.data ).then( data => console.log(data))
    .catch(function (error_response) {
      if (error_response.response){
        console.log(error_response.response.data.error )
      }else{
        console.log(error_response.message)
      }
    });
  }

  login_form(){
    let { email, password } = this.state;

    return(
      <div className="card-body">
        <form className="form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-0"
              name="email"
              value={email}
              onChange={(e) => this.handleInput('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-0"
              name="password"
              value={password}
              onChange={(e) => this.handleInput('password', e.target.value)} />
          </div>

          <input
            type="Login"
            className="btn btn-success btn-lg float-right"
            value="Submit"
            onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center text-white mb-4">Login</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <span className="anchor"></span>
                <div className="card rounded-0">
                  <div className="card-header">
                    <h3 className="mb-0">Login</h3>
                  </div>
                  { this.login_form() }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


