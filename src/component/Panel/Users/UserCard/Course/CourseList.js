import React, {Component} from "react";
import UserCardCourse from "../UserCardCourse";

import {connect} from "react-redux";


class CourseList extends Component {
    constructor(props){
        super();
        this.state = {
            loading : 0,
            id_of_user : props.id_of_user,
            contentArray : [],
            content : "course"
        }
    }

    componentDidMount(){
        this.loading();
    }
    loading(){
        fetch(this.props.store1["url"] + "/restadmin/user/content",
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
                "content" : this.state.content
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    loading : 1,
                    contentArray : result.content
                });
            },
            (error) => {
                this.setState({
                    loading : -1
                });
            }
        )
    }

    render(){
        var listOfCourses = this.state.contentArray.map((content,index) => {
            return <UserCardCourse
            key={index}
            id_of_user={this.props.id_of_user}
            id_of_content={content.id}
            name={content.name}
            content={this.state.content}
            />
        });

        if(this.state.loading === -1){
            return(
                <div>
                    Ошибка при получении id пользователя
                </div>
            )
        } else if(this.state.loading === 0){
            return(
                <div>
                    Подождите пожалуйста, идет загрузка...
                </div>
            )
        } else {
            return(
                <div className="row userCardCourses">
                    {listOfCourses}
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
      logoutToken:(v) => {
        dispatch({ type:"logout"});
      }
    })
)(CourseList);