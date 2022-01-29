import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCalendarDay, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export default class Profile extends Component {

    constructor(props){
        super();
        this.state = {
            id : props.id,
            login : props.login,
            fio : props.fio,
            status : props.status,
            date_of_add : props.date_of_add
        }
    }

    render(){

        var labelAccess;
        if(this.props.status === 1){
            labelAccess = <font className="granted">Доступ разрешен</font>
        } else {
            labelAccess = <font className="denied">Доступ запрещён</font>
        }

        return(
            <div className="col-12 precard" onClick={() => this.props.openCardUser(this.props.id)}>
                <h5>
                    {this.props.fio}
                </h5>
                <p>
                    <FontAwesomeIcon icon={faEnvelope} /> Логин: {this.props.login}
                </p>
                <p>
                    <FontAwesomeIcon icon={faCalendarDay} /> Дата регистрации: {this.props.date_of_add}
                </p>
                <p>
                    <FontAwesomeIcon icon={faSignInAlt} /> {labelAccess}
                </p>
            </div>
        )
    }

}