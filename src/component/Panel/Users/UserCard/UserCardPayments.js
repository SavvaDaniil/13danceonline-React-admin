import React, {Component} from "react";
import UserCardPayment from "./UserCardPayment";
import {connect} from "react-redux";

class UserCardPayments extends Component {

    constructor(props){
        super(props);
        this.state = {
            id_of_user : props.id_of_user,
            alreadyLaunch : false,
            payments : [],
            summaAll : ""
        }
    }
    componentDidMount(){
      this.launch();
    }

    launch(){
      if(this.state.alreadyLaunch)return;

      fetch(this.props.store1["url"] + "/restadmin/user/payments",
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
            if(result.answer === "success"){
              this.setState({
                payments : result.content,
                summaAll : result.summaAll,
                alreadyLaunch : true
              });
            }
          },
          (error) => {
            
          }
      )
    }

    render(){
        const list = this.state.payments.map((payment,key) => {
                return <UserCardPayment
                    key = {key}
                    id_of_user={this.props.id_of_user}
                    id_of_payment={payment.id}
                    summa={payment.summa}
                    date={payment.date_of_add}
                    list_courses = {payment.list_courses}
                    list_tutorials = {payment.list_tutorials}
                    

                />
            }
        );

        var summaAllPrint;
        if(this.state.summaAll !== ""){
            summaAllPrint = <p><b>Итого: {this.state.summaAll}</b></p>
        }

        if(list.length === 0 || list === 0){
            return(
                <div className="col-12"><p className="notFoundlist">- Платежей не найдено -</p></div>
            )
        }

        return(
            <div className="row userCardPayments">
                {list}
                {summaAllPrint}
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
)(UserCardPayments);