import React, {Component} from "react";
import {Tabs, Tab, Button, Form} from 'react-bootstrap';
import CourseList from "./Course/CourseList";
import TutorialList from "./Course/TutorialList";
import UserCardPayments from "./UserCardPayments";

import {connect} from "react-redux";


class UserCard extends Component {

    constructor(){
        super();
        this.state = {
            statusUserCard : 0,

            username : "",
            fio : "",
            status : 0
        }
        /*
        -1 ошибка
        0 загрузка
        1 загрузка успешна
        */
       this.getUser = this.getUser.bind(this);
    }
    componentDidMount(){
        if(this.props.id_of_user === 0 || this.props.id_of_user === null || this.props.id_of_user === "0"){
            this.setState({
                statusUserCard : -1
            });
        } else {
            this.getUser();
        }
    }
    getUser(){
        fetch(this.props.store1["url"] + "/restadmin/user/opencard",
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
                "id_of_user" : this.props.id_of_user
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    statusUserCard : 1,
                    username : result.user.username,
                    fio : result.user.fio,
                    status : result.user.status
                });
            },
            (error) => {
                this.setState({
                    statusUserCard : -1
                });
            }
        )
        //здесь ajax

    }

    render(){
        if(this.state.statusUserCard === -1){
            return(
                <div>
                    Ошибка при получении id пользователя
                </div>
            )
        } else if(this.state.statusUserCard === 0){
            return(
                <div>
                    Подождите пожалуйста, идет загрузка...
                </div>
            )
        } else {
            
            return(
                <Tabs
                defaultActiveKey="userCardProfile"
                transition={false}
                id="uncontrolled-tab-example">
                    <Tab eventKey="userCardProfile" title="Профиль">
                        <div className="row userCardProfile">
                            <div className="col-12">

                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Логин</Form.Label>
                                        <Form.Control type="email" placeholder="Логин" maxLength="216" defaultValue={this.state.username} />
                                        <Form.Text className="text-muted">
                                            
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPosition">
                                        <Form.Label>ФИО</Form.Label>
                                        <Form.Control type="text" placeholder="ФИО" maxLength="216" defaultValue={this.state.fio} />
                                    </Form.Group>

                                    <hr />

                                    <Form.Group controlId="formNewPassword">
                                        <Form.Label>Новый пароль</Form.Label>
                                        <Form.Control type="password" placeholder="Новый пароль" />
                                    </Form.Group>

                                    <Button variant="success" type="button">
                                        Сохранить
                                    </Button>
                                    
                                </Form>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="userCardCourses" title="Доступы к курсам">
                        <CourseList
                        id_of_user={this.props.id_of_user}
                        />
                    </Tab>
                    <Tab eventKey="userCardTutorials" title="Доступы к Туториалам">
                        <TutorialList
                        id_of_user={this.props.id_of_user}
                        />
                    </Tab>
                    <Tab eventKey="userCardPayments" title="Платежи">
                        <UserCardPayments
                        id_of_user={this.props.id_of_user}
                        />
                    </Tab>
                </Tabs>
            )
        }
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
)(UserCard);