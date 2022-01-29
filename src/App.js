import React, {Component} from "react";
import Logo from './images/logo.png';
import './dist/css/bootstrap.min.css';
import "./dist/css/main.css";
import "./dist/css/main_mobile.css";
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Profile from "./component/Profile";
import Users from "./component/Panel/Users/Users";
import Payments from "./component/Panel/Payment/Payments";
import {Button, Nav, Navbar} from 'react-bootstrap';

/*
import {Provider} from "react-redux";
import {createStore} from "redux";

function authorization(state = [], action){

}

const store = createStore(authorization)
*/
import {connect} from "react-redux";


class App extends Component {

  constructor(props){
    super();
    this.state = {
      status : 1,
      /*
      0 идет загрузка
      -1 ошибка на сервере
      1 - гость
      2 - пользователь
      */
      alreadyLaunch: false,
      warning : "",
      login : "",
      password : "",
      loginClass : "form-control",
      passwordClass : "form-control"
    }
    this.formLogin = this.formLogin.bind(this);
    this.formPassword = this.formPassword.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.loginTest = this.loginTest.bind(this);
  }

  componentDidMount(){
    this.launch();
  }

  launch(){
    if(this.state.alreadyLaunch)return;
    /*
    this.setState({
      status : 2
    });
    */
   //console.log(this.props.state1["token"]);
    
    fetch(this.props.store1["url"] + "/restadmin",
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "token" : "123"
      })
    })
    .then(res => res.json())
    .then(
        (result) => {

        },
        (error) => {

        }
    )
    
    
  }
  formLogin(event){
    this.setState({
      loginClass : "form-control",
      login : event.target.value
    });
  }
  formPassword(event){
    this.setState({
      passwordClass : "form-control",
      password : event.target.value
    });
  }

  login(){
    if(this.state.login === ""){
      this.setState({
        loginClass : "form-control not_filled"
      });
      return;
    }
    if(this.state.password === ""){
      this.setState({
        passwordClass : "form-control not_filled"
      });
      return;
    }
    this.setState({
      warning : ""
    });
    fetch(this.props.store1["url"] + "/restadmin/login",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          "username" : this.state.login,
          "password" : this.state.password
        })
      }
    )
    .then(res => res.json())
    .then(
        (result) => {
          if(result.answer === "success" && result.jwt !== ""){
            //window.location.reload();
            this.props.loginToken(result.jwt);
            this.setState({
              status : 2
            });
          } else if(result.answer === "error" && result.error === "wrong"){
            this.setState({
              warning : "Неправильно введен логин или пароль"
            });
          } else {
            this.setState({
              warning : "Неизвестная ошибка на сервере"
            });
          }
        },
        (error) => {
          this.setState({
            warning : "Неизвестная ошибка на сервере"
          });
        }
    )

  }
  logout(){
    /*
    this.props.loginToken("");
    this.setState({
      status : 1
    });
    */
      fetch(this.props.store1["url"] + "/restadmin/logout",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          "jwt" : this.props.store1["token"]
        })
      }
      )
      .then(res => res.json())
      .then(
          (result) => {
            this.props.loginToken("");
            this.setState({
              status : 1
            });
          },
          (error) => {
            
          }
      )
  }

  loginTest(){
    this.props.loginToken("123");
    console.log(this.props.store1["token"]);
  }

  render(){
    if(this.state.status === 0) {
        return (
            <div className="row">
                <div className="col-2 col-lg-4 col-md-4 col-xs-2"></div>
                <div className="col-8 col-lg-4 col-md-4 col-xs-8 loading">
                    <img src={Logo} alt="Лого" className="img-fluid" />
                    <p>Подождите пожалуйста, идет загрузка...</p>
                </div>
            </div>
        )
    } else if(this.props.store1["token"] === "") {
        return (
          <div className="row">
              <div className="col-1 col-lg-4 col-md-4 col-xs-1"></div>
              <div className="col-10 col-lg-4 col-md-4 col-xs-10 login">
                  <img src={Logo} alt="Лого" className="img-fluid" />
                  <p>{this.state.warning}</p>
                  <form>
                    <input type="text" placeholder="Логин" className={this.state.loginClass} maxLength="216" onChange={this.formLogin} />

                    <input type="password" placeholder="Пароль" className={this.state.passwordClass} maxLength="216" onChange={this.formPassword} />

                    <Button variant="primary" type="button" block onClick={this.login}>
                      Войти
                    </Button>
                  </form>
              </div>
          </div>
        )
    } else if(this.props.store1["token"] !== "") {
      return (
        <BrowserRouter>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

              <Navbar.Brand >13 Dance Online</Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                  <Nav.Link href="#deets" onClick={this.logout}>Выйти</Nav.Link>
                </Nav>
              </Navbar.Collapse>

            </Navbar>

            <div className="row main">
              <div className="col-12 col-lg-2 col-md-2 col-xs-12">
                
                <Nav variant="pills" className="flex-column" defaultActiveKey="profile">
                  <Nav.Item>
                    <Nav.Link eventKey="profile" as={Link} to="/">Профиль</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="users" as={Link} to="/users">База клиентов</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payments" as={Link} to="/payments">Платежи</Nav.Link>
                  </Nav.Item>
                </Nav>
                
              </div>
              <div className="col-12 col-lg-10 col-md-10 col-xs-12">
                <Route exact path="/" component={Profile} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/payments" component={Payments} />
              </div>
            </div>

        </BrowserRouter>
      )
    } else {
      return (
          <div className="row">
            <div className="col-2 col-lg-4 col-md-4 col-xs-2"></div>
            <div className="col-8 col-lg-4 col-md-4 col-xs-8 launchError">
                <img src={Logo} alt="Лого" className="img-fluid" />
                <p>Извините, на стороне сервера произошла ошибка</p>
            </div>
          </div>
      )
    }
  }

}



export default connect(
  state => ({
    store1: state
  }),
  dispatch => ({
    loginToken:(v) => {
      dispatch({ type:"login", value:v});
    }
  })
)(App);