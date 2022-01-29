import React, {Component} from "react";
import {Button, Form} from 'react-bootstrap';

import {connect} from "react-redux";

class Profile extends Component {

    constructor(props){
        super();
        this.state = {
            login : "",
            position : "",
            warning : ""
        }
        this.profileUsername = this.profileUsername.bind(this);
        this.profilePosition = this.profilePosition.bind(this);
        this.save = this.save.bind(this);
    }
    componentDidMount(){
      this.launch();
    }

    launch(){
      fetch(this.props.store1["url"] + "/restadmin/profile",
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
            "jwt" : this.props.store1["token"]
        })
      })
      .then(res => res.json())
      .then(
          (result) => {
              if(result.answer === "success"){
                  this.setState({
                      login : result.admin.username,
                      position : result.admin.position});
              }
          },
          (error) => {
              
          }
      )
    }

    profileUsername(event){
      this.setState({
        login : event.target.value,
        warning : ""
      });
    }
    profilePosition(event){
      this.setState({
        position : event.target.value,
        warning : ""
      });
    }
    save(){
        fetch(this.props.store1["url"] + "/restadmin/profile/save",
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
            "jwt" : this.props.store1["token"],
            "username" : this.state.login,
            "position" : this.state.position
          })
        }
        )
        .then(res => res.json())
        .then(
            (result) => {
                if(result.answer === "success"){
                    this.setState({
                      warning : "Успешно сохранено"
                    });
                } else if(result.answer === "error" && result.error === "username_already_exist"){
                    this.setState({
                      warning : "данный логин уже есть в базе"
                    });
                } else {
                    this.setState({
                      warning : "Неизвестная ошибка на сервере"
                    });
                }
            },
            (error) => {
              
            }
        )
    }


    render(){
        return(
            <div className="row profile">
                <div className="col-12">
                    <h5>Профиль</h5>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="email" placeholder="Логин" maxLength="216" defaultValue={this.state.login} 
                            onChange={this.profileUsername}
                            />
                            <Form.Text className="text-muted">
                                
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>Должность</Form.Label>
                            <Form.Control type="text" placeholder="Должность" maxLength="216" defaultValue={this.state.position}
                            onChange={this.profilePosition}
                            />
                        </Form.Group>

                        <hr />

                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Новый пароль</Form.Label>
                            <Form.Control type="password" placeholder="Новый пароль" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Текущий пароль</Form.Label>
                            <Form.Control type="password" placeholder="Текущий пароль" />
                        </Form.Group>



                        <Button variant="success" type="button" onClick={this.save}>
                            Сохранить
                        </Button>

                        <p className="warning">{this.state.warning}</p>
                        
                    </Form>
                </div>
            </div>
        )
    }

}

export default connect(
    state => ({
      store1: state
    }),
    dispatch => ({
      logoutToken:(v) => {
        dispatch({ type:"logout"});
      }
    })
  )(Profile);