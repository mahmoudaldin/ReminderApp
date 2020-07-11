import React,{Component } from "react";
import { connect } from "react-redux";
import { add_Reminder , remove_Reminder, clear_Reminder,load_Reminders} from "../actions";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from './Reminders-icon.png'
import Login from "./Login";
import firebase, { todosRef , databaseRef} from "./firebaset";
import _ from 'lodash';
import axios from 'axios';

class App extends Component {
    state =
    {
        text:'',
        date:new Date()
        ,id:null
        ,load:{}
    }

    render_Reminders = () => {
        const {reminders} = this.props
        if(!reminders[0])
        {
            return (
            <div className="d-flex justify-content-center">
            <div className="spinner-grow spinner-grow-sm text-danger loading-Divs" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-danger loading-Divs" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-danger loading-Divs" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-danger loading-Divs" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-danger loading-Divs" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          )            
        }
        
        return (
            
            <ul className="list-group">
                {
                    reminders.map(
                        reminder => {
                            return(
                                <li key={reminder.id} className="list-group-item">
                                    <div>{reminder.text}</div>
                                    <div>{moment(new Date(reminder.date)).fromNow()}</div>
                                    <div className="closeIcon remove btn btn-danger" onClick = {()=> this.props.remove_Reminder(reminder.key)}>X</div>
                                </li>
                            )
                        }
                    )
                }

            </ul>
        )
    }

    render_RemindersFB = () => {
        return (
            <ul className="list-group">
                {
         _.map(this.state.load, (value, key) =>  {
            return(
                <li key={value.id} className="list-group-item">
                    <div>{value.text}</div>
                    <div>{moment(new Date(value.date)).fromNow()}</div>
                    <div className="closeIcon remove btn btn-danger" onClick = {()=> this.props.remove_Reminder(value.id)}>X</div>
                </li>
            )
        })
       
    }

    </ul>
)
        
    }


/*     bakeLoad = () => {
        bake_cookie('drones',this.state.load);
        this.props.load_Reminders();
    } */
     load = () => {
        const fetchData = async () => {

            if(firebase.auth().currentUser){debugger   
                var userId=firebase.auth().currentUser.uid;
                var dbtodo = firebase.database().ref('/users/' + userId).child("todos");
                dbtodo.on("value", snapshot => {debugger
                    //this.setState({load:_.map(snapshot.val(), (value, key) => ({ ...value ,key:key}))});
                    this.props.load_Reminders(_.map(snapshot.val(), (value, key) => ({ ...value ,key:key})));
                  });
            }
            else
            todosRef.on("value", snapshot => {debugger
      //this.setState({load:_.map(snapshot.val(), (value, key) => ({ ...value ,key:key}))});
      this.props.load_Reminders(_.map(snapshot.val(), (value, key) => ({ ...value ,key:key})));
    });
          
        };
    
        fetchData();
    }
     componentWillMount(){this.load()} 
     componentDidMount(){
        firebase.auth().onAuthStateChanged( user  => {
           // this.setState({isSingedIn:!!user})
            console.log("userApp",user)  
            this.load()
        })
    }

     formSubmit = event => {
         debugger
        event.preventDefault();
        this.props.add_Reminder(this.state.text,this.state.date)
        axios.post("/api/sendMail",this.state)
        this.setState({
            text:'', date:''
        })
      };


    render(){
        console.log(this.props)
        let  withouySingIntry ="";
        if(firebase.auth().currentUser){
            withouySingIntry="";
    } else{
        withouySingIntry="Try without sign in!";
    }
        return(
            <div> 
             <div className="Login-Div"> <Login/></div>
             <br/> <br/> <br/> 
               <form onSubmit={this.formSubmit}>
            <div className="App">
            {/* <App2/> */}
    
                <img src={logo}/>
                <div className="reminder-title">
                    <h2>What should you do</h2>
                    <h4>{withouySingIntry}</h4>
                </div>
                <input className="form-control" type="text" placeholder="Enter what you think ... ?"
                value={this.state.text}
                onChange={(e)=>this.setState({text: e.target.value})}
                />
               {/*  <input className="form-control" type="datetime-local"
                value={this.state.date}
                onChange={(e)=>this.setState({date: e.target.value})}
                /> */}

                <DatePicker className="form-control" placeholderText="Task Date"
                value={this.state.date}
                    selected={this.state.date}
                    onChange={date => this.setState({date})}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    />

                <button  type="submit" className="btn btn-primary btn-block">Add</button>
                
                {this.render_Reminders()}
                <button type="button" className="btn btn-danger btn-block" onClick = {()=> this.props.clear_Reminder()}
                >Clear reminders</button>
            </div>
            </form>
            </div>
        )
        }
}

/* function mapDispatchToProps (dispatch){
    return{
        add_Reminder : () => dispatch(add_Reminder())
    }
}
export default connect(null,mapDispatchToProps)(App); */

/* function mapStateToProps (state) {
 return {
     reminders: state
 }
} */

export default connect(state => {
    return {
        reminders: state
    }},{add_Reminder,remove_Reminder,clear_Reminder,load_Reminders})(App);