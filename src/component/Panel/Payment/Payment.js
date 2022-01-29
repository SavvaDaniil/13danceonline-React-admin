import React, {Component} from "react";
import {Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";


class Payment extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                <td>
                    {this.props.id}
                </td>
                <td>
                    {this.props.date_of_add}
                </td>
                <td>
                    (id{this.props.user.id}) {this.props.user.username} - {this.props.user.fio}
                </td>
                <td>
                    {this.props.summa}
                </td>
            </tr>
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
)(Payment);