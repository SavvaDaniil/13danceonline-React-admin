import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import UserCardListAccess from "./UserCardListAccess";

import {connect} from "react-redux";

class UserCardCourse extends Component {

    constructor(props){
        super();
        this.state = {
            id_of_content : props.id_of_content,
            id_of_user : props.id_of_user,
            name : props.name,
            IsActive_usercardaccessListOfCourse : false,
            usercardaccessListOfCourseClass : "row col-12 usercardaccessListOfCourse",
            launchUserCardListAccess : false
        }

        this.changeClassListOfAccessOfCourse = this.changeClassListOfAccessOfCourse.bind(this);
    }
    
    changeClassListOfAccessOfCourse(){
        if(this.state.IsActive_usercardaccessListOfCourse){
            this.setState({
                IsActive_usercardaccessListOfCourse : false,
                usercardaccessListOfCourseClass : "row col-12 usercardaccessListOfCourse"
            });
        } else {
            this.setState({
                IsActive_usercardaccessListOfCourse : true,
                launchUserCardListAccess : true,
                usercardaccessListOfCourseClass : "col-12 usercardaccessListOfCourse active"
            });
        }
    }

    render(){
        var srcPoster = this.props.store1["url"] + "/images/"+this.props.content+"/" + this.props.id_of_content +".jpg";

        return(
            <div className="col-12 row userCardCourse">
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <img src={srcPoster} alt="Постер" className="img-fluid" />
                </div>
                <div className="col-12 col-lg-6 col-md-6 col-xs-12">
                    <p>
                        (id{this.props.id_of_content}) {this.props.name}
                    </p>
                </div>
                <div className="col-12 col-lg-4 col-md-4 col-xs-12">
                    <Button variant="info" size="sm" onClick={this.changeClassListOfAccessOfCourse}>
                        развернуть/свернуть
                    </Button>
                </div>
                <div className={this.state.usercardaccessListOfCourseClass}>
                    <UserCardListAccess
                    id_of_content={this.props.id_of_content}
                    id_of_user={this.props.id_of_user}
                    launch={this.state.launchUserCardListAccess}
                    content={this.props.content}
                    />
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
)(UserCardCourse);