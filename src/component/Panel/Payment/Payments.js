import React, {Component} from "react";
import {Form, Button, Table} from 'react-bootstrap';
import Payment from "./Payment";

import {connect} from "react-redux";

class Payments extends Component {

    constructor(){
        super();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        const dataStart = yyyy + "-" + mm + "-" + dd;

        this.state = {
            contentArray : [],
            alreadyLaunch : false,
            years : [],
            summa : 0,
            resultError : "resultError",

            dateStart : dataStart,
            dayStart : 0,
            monthStart : 0,
            yearStart : 0,
            
            dayEnd : 0,
            monthEnd : 0,
            yearEnd : 0
        }
        this.ref_dateStart = React.createRef();

        this.launch = this.launch.bind(this);
        this.search = this.search.bind(this);

        this.resultErrorShow = this.resultErrorShow.bind(this);
        this.resultErrorHide = this.resultErrorHide.bind(this);

        this.changeDayStart = this.changeDayStart.bind(this);
        this.changeMonthStart = this.changeMonthStart.bind(this);
        this.changeYearStart = this.changeYearStart.bind(this);
        this.changeDayEnd = this.changeDayEnd.bind(this);
        this.changeMonthEnd = this.changeMonthEnd.bind(this);
        this.changeYearEnd = this.changeYearEnd.bind(this);

    }
    
    componentDidMount(){
        this.launch();
    }
    
    launch(){
        if(this.state.alreadyLaunch)return;

        fetch(this.props.store1["url"] + "/restadmin/payments",
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
                        alreadyLaunch : true,
                        dayStart : result.dayStart,
                        monthStart : result.monthStart,
                        yearStart : result.yearStart,
                        
                        dayEnd : result.dayEnd,
                        monthEnd : result.monthEnd,
                        yearEnd : result.yearEnd,

                        years : result.years
                    });
                }
            },
            (error) => {
                alert("Ошибка связи с сервером");
            }
        )
    }

    search(){
        fetch(this.props.store1["url"] + "/restadmin/paymentssearch",
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
                "dayStart" : this.state.dayStart,
                "monthStart" : this.state.monthStart,
                "yearStart" : this.state.yearStart,
                "dayEnd" : this.state.dayEnd,
                "monthEnd" : this.state.monthEnd,
                "yearEnd" : this.state.yearEnd
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.answer === "success"){
                    this.setState({
                        contentArray : result.payments,
                        summa : result.summaAll
                    });
                } else {
                    this.resultErrorShow();
                }
            },
            (error) => {
                alert("Ошибка связи с сервером");
            }
        )
    }

    changeDayStart(event){this.setState({"dayStart" : event.target.value});}
    changeMonthStart(event){this.setState({"monthStart" : event.target.value});}
    changeYearStart(event){this.setState({"yearStart" : event.target.value});}
    changeDayEnd(event){this.setState({"dayEnd" : event.target.value});}
    changeMonthEnd(event){this.setState({"monthEnd" : event.target.value});}
    changeYearEnd(event){this.setState({"yearEnd" : event.target.value});}
    
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

    searchSubmit(e){
        e.preventDefault();
        this.search();
    }
    isNoValue(value){
        if(value === "0" || value === 0){
            return "Не указано";
        }
        return value; 
    }
    


    render(){
        
        const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        const months = [
            "Не указано",
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ];
        
        const daysOptions = days.map((day, key) =>
            <option value={day} key={key}>{this.isNoValue(day)}</option>
        );
        const monthsOptions = months.map((month, id) =>
            <option value={id} key={id}>{month}</option>
        );
        const yearsOptions = this.state.years.map((year, key) => 
            <option value={year} key={key}>{this.isNoValue(year)}</option>
        );

        const payments = this.state.contentArray.map((payment, key) => {
            return <Payment
                key = {key}
                id={payment.id}
                date_of_add={payment.date_of_add}
                user={payment.user}
                summa={payment.summa}
            />
        });
        var messagePaymentsEmpty;
        if(payments === "" || payments.length === 0){
            messagePaymentsEmpty = <div className="col-12"><p className="notFoundlist">- платежей не найдено -</p></div>;
        }

        const summaAll = <p><b>Итого: {this.state.summa}</b></p>;

        return(
            <div className="row clients">
                <div className={this.state.resultError}>
                    Ошибка запроса
                </div>

                <div className="col-12 row">
                    <div className="col-12">
                        <h5>Платежи</h5>
                    </div>

                    <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                        <Form>
                            <Form.Group>
                                <Form.Label>День с</Form.Label>
                                <Form.Control as="select" value={this.state.dayStart} onChange={this.changeDayStart}>
                                    {daysOptions}
                                </Form.Control>
                                <br />

                                <Form.Label>Месяц с</Form.Label>
                                <Form.Control as="select" value={this.state.monthStart} onChange={this.changeMonthStart}>
                                    {monthsOptions}
                                </Form.Control>
                                <br />

                                <Form.Label>Год с</Form.Label>
                                <Form.Control as="select" value={this.state.yearStart} onChange={this.changeYearStart}>
                                    {yearsOptions}
                                </Form.Control>

                            </Form.Group>
                        </Form>
                    </div>

                    <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                        <Form>
                            <Form.Group>
                                <Form.Label>День по</Form.Label>
                                <Form.Control as="select" value={this.state.dayEnd} onChange={this.changeDayEnd}>
                                    {daysOptions}
                                </Form.Control>
                                <br />

                                <Form.Label>Месяц по</Form.Label>
                                <Form.Control as="select" value={this.state.monthEnd} onChange={this.changeMonthEnd}>
                                    {monthsOptions}
                                </Form.Control>
                                <br />

                                <Form.Label>Год по</Form.Label>
                                <Form.Control as="select" value={this.state.yearEnd} onChange={this.changeYearEnd}>
                                    {yearsOptions}
                                </Form.Control>

                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-12">
                        <Button variant="info" size="sm" onClick={this.search}>
                            Выполнить запрос
                        </Button>
                    </div>


                </div>

                <div className="col-12 paymentsDiv">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Дата</th>
                                <th>Пользователь</th>
                                <th>Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments}
                        </tbody>
                    </Table>

                </div>

                {messagePaymentsEmpty}

                {summaAll}

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
)(Payments);