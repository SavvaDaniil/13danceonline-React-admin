import React, {Component} from "react";
import { Button } from "react-bootstrap";
import {connect} from "react-redux";
import UserCardAccess from "./UserCardAccess";


class UserCardListAccess extends Component {

    constructor(props){
        super(props);
        this.state = {
          content : props.content,
          id_of_content : props.id_of_content,
          id_of_user : props.id_of_user,
          launch : props.launch,
          alreadyLaunch : false,
          listOfUserCardAccess : [],
          years : [],
          resultSuccess : "resultSuccess",
          resultError : "resultError"
        }
        this.launch = this.launch.bind(this);
        this.reLaunch = this.reLaunch.bind(this);
        this.addAccess = this.addAccess.bind(this);
        this.resultErrorShow = this.resultErrorShow.bind(this);
        this.resultErrorHide = this.resultErrorHide.bind(this);
    }

    componentDidMount(){
      if(this.props.launch)this.launch();
    }
    componentDidUpdate(){
      if(this.props.launch)this.launch();
    }
    reLaunch(){
      this.setState({
        alreadyLaunch : false,
        launch : false
      });
    }
    launch(){
      if(this.state.alreadyLaunch)return;

      fetch(this.props.store1["url"] + "/restadmin/user/listofaccessesbyidofcontent",
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
              "id_of_user" : this.props.id_of_user,
              "course_or_tutorial" : this.props.content,
              "id_of_content" : this.props.id_of_content
          })
      })
      .then(res => res.json())
      .then(
          (result) => {
            if(result.answer === "success"){
              this.setState({
                alreadyLaunch : true,
                listOfUserCardAccess : result.list,
                years : result.years
              });
            }
          },
          (error) => {
            
          }
      )
    }
    
    resultErrorShow(){
      this.setState({
          resultError : "resultError active"
      });
      setTimeout(() => {
          this.resultErrorHide();
      }, 1000);
    }
    resultErrorHide(){
        this.setState({
            resultError : "resultError"
        });
    }
    addAccess(course_or_tutorial, content_or_back){
      fetch(this.props.store1["url"] + "/restadmin/user/accessadd",
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
              "id_of_user" : this.props.id_of_user,
              "id_of_content" :  this.props.id_of_content,
              "course_or_tutorial" : this.props.content,
              "content_or_back" : content_or_back
          })
      })
      .then(res => res.json())
      .then(
          (result) => {
            if(result.answer === "success"){
              this.reLaunch();
            } else {
              this.resultErrorShow();
            }
          },
          (error) => {
              this.resultErrorShow();
          }
      )
    }

    render(){
        if(!this.props.launch || !this.state.alreadyLaunch){
          return(
            <div className="col-12"><p className="noAccesses">Идет загрузка...</p></div>
          )
        }
        const listOfUserCardAccess = this.state.listOfUserCardAccess.map((access,key) => {

            return <UserCardAccess
            key = {key}
            content={this.props.content}
            id_of_content={this.props.id_of_content}
            id_of_user={this.props.id_of_user}

            id = {access.id}
            is_back = {access.is_back}
            status = {access.status}
            kind = {access.kind}
            days = {access.days}
            date_of_add = {access.date_of_add}
            date_of_activation = {access.date_of_activation}
            date_must_be_used = {access.date_must_be_used}
            years = {this.state.years}
            dayStart = {access.dayStart}
            monthStart = {access.monthStart}
            yearStart = {access.yearStart}

            dayEnd = {access.dayEnd}
            monthEnd = {access.monthEnd}
            yearEnd = {access.yearEnd}

            operation = {access.operation}

            reLaunch={this.reLaunch}
            />
          });

        var messageAboutEmptyListOfUserCardAccess;
        if(listOfUserCardAccess === "" || listOfUserCardAccess.length === 0){
          messageAboutEmptyListOfUserCardAccess = <div className="col-12"><p className="noAccesses">- доступов не найдено -</p></div>;
        }

        return(
            <div className="col-12 row">
              <div className={this.state.resultSuccess}>
                  Успешно сохранено
              </div>
              <div className={this.state.resultError}>
                  Ошибка сохранения
              </div>

              <div className="col-12">
                <Button
                variant="secondary"
                size="sm"
                onClick={() => this.addAccess(this.props.content,"content")}
                >
                  Добавить доступ к контенту
                </Button>

                <Button
                variant="secondary"
                size="sm"
                onClick={() => this.addAccess(this.props.content,"back")}
                >
                  Добавить доступ к обратной связи
                </Button>
              </div>
              {listOfUserCardAccess}

              {messageAboutEmptyListOfUserCardAccess}
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
)(UserCardListAccess);