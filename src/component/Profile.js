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
                      warning : "?????????????? ??????????????????"
                    });
                } else if(result.answer === "error" && result.error === "username_already_exist"){
                    this.setState({
                      warning : "???????????? ?????????? ?????? ???????? ?? ????????"
                    });
                } else {
                    this.setState({
                      warning : "?????????????????????? ???????????? ???? ??????????????"
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
                    <h5>??????????????</h5>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>??????????</Form.Label>
                            <Form.Control type="email" placeholder="??????????" maxLength="216" defaultValue={this.state.login} 
                            onChange={this.profileUsername}
                            />
                            <Form.Text className="text-muted">
                                
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>??????????????????</Form.Label>
                            <Form.Control type="text" placeholder="??????????????????" maxLength="216" defaultValue={this.state.position}
                            onChange={this.profilePosition}
                            />
                        </Form.Group>

                        <hr />

                        <Form.Group controlId="formNewPassword">
                            <Form.Label>?????????? ????????????</Form.Label>
                            <Form.Control type="password" placeholder="?????????? ????????????" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>?????????????? ????????????</Form.Label>
                            <Form.Control type="password" placeholder="?????????????? ????????????" />
                        </Form.Group>



                        <Button variant="success" type="button" onClick={this.save}>
                            ??????????????????
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