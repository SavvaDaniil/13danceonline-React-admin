import React, {Component} from "react";

export default class UserCardPayment extends Component {

    constructor(props){
        super();
        this.state = {
            id_of_user : 0
        }
    }

    render(){

        const list_courses = this.props.list_courses.map((content,key) => {
            return <p key={key}>- {content}</p>
        });
        const list_tutorials = this.props.list_tutorials.map((content,key) => {
            return <p key={key}>- {content}</p>
        });

        return(
            <div className="col-12 row userCardPayment">
                <div className="col-12 col-lg-4 col-md-4 col-sm-12">
                    <p><b>Платеж</b> id{this.props.id_of_payment}</p>
                    <p>Сумма: {this.props.summa} р</p>
                    <p>Дата: {this.props.date}</p>
                </div>
                <div className="col-12 col-lg-8 col-md-8 col-sm-12 courses">
                    <h6>Полученные доступы:</h6>
                    {list_courses}
                    {list_tutorials}
                </div>
            </div>
        )
    }
}