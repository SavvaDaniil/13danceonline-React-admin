import React, {Component} from "react";
import {Button, Form, Col, Modal} from 'react-bootstrap';
import UserCard from "./UserCard/UserCard";
import UserPreCard from "./UserPreCard";

import {connect} from "react-redux";

class Users extends Component {

    constructor(){
        super();
        this.state = {
            contentArray : [],
            search : "",
            modalShowCardUser : false,
            id_of_user_modal : null,
            searchCount : 0
        }
        this.changeSearch = this.changeSearch.bind(this);
        this.modalCardUserHandleOpen = this.modalCardUserHandleOpen.bind(this);
        this.modalCardUserHandleClose = this.modalCardUserHandleClose.bind(this);
        this.search = this.search.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
    }
    changeSearch(event){
        this.setState({
            search : event.target.value
        });
    }
    modalCardUserHandleClose(){
        this.setState({
            modalShowCardUser : false
        });
    }
    openCardUser = (id_of_user) => {
        
        this.setState({
            id_of_user_modal : id_of_user
        });

        this.modalCardUserHandleOpen();
    }
    modalCardUserHandleOpen(){
        this.setState({
            modalShowCardUser : true
        });
    }


    
    componentDidMount(){
        this.search();
    }

    search(){
        fetch(this.props.store1["url"] + "/restadmin/user/search",
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
                "search" : this.state.search
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    contentArray : result.users,
                    searchCount : result.users.length
                });
            },
            (error) => {
                alert("Ошибка связи с сервером");
            }
        )
    }
    searchSubmit(e){
        e.preventDefault();
        this.search();
    }



    render(){
        const contentList = this.state.contentArray.map((content,index)=>{
            return <UserPreCard
            key={index}
            id={content.id}
            login={content.username}
            fio={content.fio}
            status={content.status}
            date_of_add={content.date_of_add}
            openCardUser={this.openCardUser}
             />
        })


        return(
            <div className="row clients">
                <div className="col-12">
                    <h5>База клиентов</h5>
                    <Form onSubmit={this.searchSubmit}>
                        <Form.Row className="align-items-center">
                            <Col sm={8} xs={8} className="my-1">
                                <Form.Label htmlFor="inlineFormInputName" srOnly >
                                    Поиск
                                </Form.Label>
                                <Form.Control id="inlineFormInputName" placeholder="Поиск" onChange={this.changeSearch} />
                            </Col>

                            <Col xs={4} sm={4} className="my-1">
                                <Button type="button" onClick={this.search}>Поиск</Button>
                            </Col>
                        </Form.Row>
                    </Form>

                    <Modal
                    show={this.state.modalShowCardUser}
                    onHide={this.modalCardUserHandleClose}
                    animation={false}
                    size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Карточка пользователя</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <UserCard
                            id_of_user={this.state.id_of_user_modal}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalCardUserHandleClose}>
                                Закрыть окно
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="col-12 row">
                        <div className="col-12">
                            <p>Найдено: {this.state.searchCount} записей</p>
                        </div>
                        {contentList}
                    </div>

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
)(Users);