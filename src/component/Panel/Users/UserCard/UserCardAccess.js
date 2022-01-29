import React, {Component} from "react";
import {Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";


class UserCardAccess extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalDeleteShow : false,
            id : props.id,
            id_of_content : props.id_of_content,
            is_back : props.is_back,
            days : props.days,

            dayStart : props.dayStart,
            monthStart : props.monthStart,
            yearStart : props.yearStart,
            years : props.years,
            
            dayEnd : props.dayEnd,
            monthEnd : props.monthEnd,
            yearEnd : props.yearEnd,
            status : props.status,
            resultSuccess : "resultSuccess",
            resultError : "resultError"
        }

        this.getClassFromStatus = this.getClassFromStatus.bind(this);
        this.resultSuccessShow = this.resultSuccessShow.bind(this);
        this.resultSuccessHide = this.resultSuccessHide.bind(this);
        this.resultErrorShow = this.resultErrorShow.bind(this);
        this.resultErrorHide = this.resultErrorHide.bind(this);

        this.changeDayStart = this.changeDayStart.bind(this);
        this.changeMonthStart = this.changeMonthStart.bind(this);
        this.changeYearStart = this.changeYearStart.bind(this);
        this.changeDayEnd = this.changeDayEnd.bind(this);
        this.changeMonthEnd = this.changeMonthEnd.bind(this);
        this.changeYearEnd = this.changeYearEnd.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

        this.saveDate = this.saveDate.bind(this);
        this.saveDays = this.saveDays.bind(this);
        this.changeDays = this.changeDays.bind(this);
        this.delete = this.delete.bind(this);
    }

    isNoValue(value){
        if(value === "0" || value === 0){
            return "Не указано";
        }
        return value; 
    }
    getClassFromStatus(){
        if(this.state.v === 1){
            return "success";
        }
        return "danger";
    }
    resultSuccessShow(){
        this.setState({
            resultSuccess : "resultSuccess active"
        });
        setTimeout(() => {
            this.resultSuccessHide();
        }, 1000);
    }
    resultSuccessHide(){
        this.setState({
            resultSuccess : "resultSuccess"
        });
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
    changeDayStart(event){this.setState({"dayStart" : event.target.value});}
    changeMonthStart(event){this.setState({"monthStart" : event.target.value});}
    changeYearStart(event){this.setState({"yearStart" : event.target.value});}
    changeDayEnd(event){this.setState({"dayEnd" : event.target.value});}
    changeMonthEnd(event){this.setState({"monthEnd" : event.target.value});}
    changeYearEnd(event){this.setState({"yearEnd" : event.target.value});}

    changeDays(event){
        this.setState({
            days : event.target.value
        });
    }
    saveDays(){
        fetch(this.props.store1["url"] + "/restadmin/user/accesssavedays",
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
                "id" : this.props.id,
                "days" : this.state.days
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
              if(result.answer === "success"){
                this.resultSuccessShow();
              } else {
                this.resultErrorShow();
              }
            },
            (error) => {
                this.resultErrorShow();
            }
        )
    }
    saveDate(v){
        var day, month, year;
        if(v === "start"){
            day = this.state.dayStart;
            month = this.state.monthStart;
            year = this.state.yearStart;
        } else if(v === "end"){
            day = this.state.dayEnd;
            month = this.state.monthEnd;
            year = this.state.yearEnd;
        }
        fetch(this.props.store1["url"] + "/restadmin/user/accesssavedate",
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
                "id" : this.props.id,
                "v" : v,
                "day" : day,
                "month" : month,
                "year" : year
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
              if(result.answer === "success"){
                this.resultSuccessShow();
              } else {
                this.resultErrorShow();
              }
            },
            (error) => {
                this.resultErrorShow();
            }
        )
    }
    changeStatus(s){
        fetch(this.props.store1["url"] + "/restadmin/user/accesssavestatus",
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
                "id" : this.props.id,
                "s" : s
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
              if(result.answer === "success"){
                  this.setState({
                      status : s
                  });
                this.resultSuccessShow();
              } else {
                this.resultErrorShow();
              }
            },
            (error) => {
                this.resultErrorShow();
            }
        )
    }
    delete(){
        fetch(this.props.store1["url"] + "/restadmin/user/accessdelete",
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
                "id" : this.props.id
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
              if(result.answer === "success"){
                this.props.reLaunch();
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
        var statusBtnText, statusBtnClass, changeStatusTo;
        if(this.state.status === 1){
            statusBtnText = "Активен";
            statusBtnClass = "success";
            changeStatusTo = 0;
        } else {
            statusBtnText = "Не активен";
            statusBtnClass = "danger";
            changeStatusTo = 1;
        }
        var is_backSTR;
        if(this.props.is_back === 1){
            is_backSTR = "Обратная связь";
        } else if(this.props.is_back === 0){
            is_backSTR = "Контент";
        }

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



        return(
            <div className="col-12 row usercardaccess">
                <div className={this.state.resultSuccess}>
                    Успешно сохранено
                </div>
                <div className={this.state.resultError}>
                    Ошибка сохранения
                </div>

                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <p>
                        <b>ID:</b> {this.props.id}<br />
                        <b>Контент/Обратная связь:</b> {is_backSTR}<br />
                        <b>Дата выдачи:</b> {this.props.date_of_add}
                    </p>
                    <Form>
                        <Form.Label>Количество дней:</Form.Label>
                        <Form.Control type="number" defaultValue={this.props.days} onChange={this.changeDays} />
                        <Form.Text className="text-muted">
                            Вводите пожалуйста целые числа больше нуля
                        </Form.Text>
                    </Form>
                    <Button variant="success" size="sm" onClick={this.saveDays}>
                        Сохранить
                    </Button>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <h6>
                        Активация
                    </h6>
                    <Form>
                        <Form.Group>
                            <Form.Label>День</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.dayStart} onChange={this.changeDayStart}>
                                {daysOptions}
                            </Form.Control>
                            <br />

                            <Form.Label>Месяц</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.monthStart} onChange={this.changeMonthStart}>
                                {monthsOptions}
                            </Form.Control>
                            <br />

                            <Form.Label>Год</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.yearStart} onChange={this.changeYearStart}>
                                {yearsOptions}
                            </Form.Control>

                        </Form.Group>
                    </Form>
                    <Button variant="success" size="sm" onClick={() => this.saveDate("start")}>
                        Сохранить
                    </Button>
                </div>

                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <h6>
                        Закончится
                    </h6>
                    <Form>
                        <Form.Group>
                            <Form.Label>День</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.dayEnd} onChange={this.changeDayEnd}>
                                {daysOptions}
                            </Form.Control>
                            <br />

                            <Form.Label>Месяц</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.monthEnd} onChange={this.changeMonthEnd}>
                                {monthsOptions}
                            </Form.Control>
                            <br />

                            <Form.Label>Год</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.yearEnd} onChange={this.changeYearEnd}>
                                {yearsOptions}
                            </Form.Control>

                        </Form.Group>
                    </Form>
                    <Button variant="success" size="sm" onClick={() => this.saveDate("end")}>
                        Сохранить
                    </Button>
                </div>

                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <h6>
                        Управление
                    </h6>
                    
                    <Button variant={statusBtnClass} size="sm" onClick={() => this.changeStatus(changeStatusTo)}>
                        {statusBtnText}
                    </Button>
                    <br />

                    <Button variant="danger" size="sm" onClick={this.delete}>
                        Удалить
                    </Button>
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
)(UserCardAccess);