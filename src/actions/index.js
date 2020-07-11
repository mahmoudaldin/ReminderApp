import { ADD_REMINDER, REMOVE_REMINDER, CLEAR_REMINDER, LOAD_REMINDERS } from "../types";
import firebase, { todosRef , databaseRef} from "../components/firebaset";



export const add_Reminder =  (text,date) =>  async dispatch => {
    /*  const action = {
        type:ADD_REMINDER,
        text,
        date
    }
    //console.log("Add",action)
    return action; */
    if(firebase.auth().currentUser){   
        var userId=firebase.auth().currentUser.uid;
        var dbtodo = firebase.database().ref('/users/' + userId).child("todos");
        dbtodo.push().set({text, date:date.toLocaleString(),id:Math.random()});
    }
    else
    todosRef.push().set({text, date:date.toLocaleString(),id:Math.random()});    

    };

export const remove_Reminder =(key) =>  async dispatch => {
  /*   const action = {
        type:REMOVE_REMINDER,
        id
    }
    console.log("Remove",action)
    return action; */
    if(firebase.auth().currentUser){   
        var userId=firebase.auth().currentUser.uid;
        var dbtodo = firebase.database().ref('/users/' + userId).child("todos");
        dbtodo.child(key).remove()
    }
    else
    todosRef.child(key).remove()

    };    

    export const clear_Reminder =() =>  async dispatch => {
        /* const action = {
            type:CLEAR_REMINDER
        }
        return action; */
        if(firebase.auth().currentUser){   
            var userId=firebase.auth().currentUser.uid;
            var dbtodo = firebase.database().ref('/users/' + userId).child("todos");
            dbtodo.remove()
        }
        else
    todosRef.remove()

        }; 

        export const load_Reminders =(payload) => {
            const action = {
                type:LOAD_REMINDERS,
                payload
            }
            return action;
            }; 