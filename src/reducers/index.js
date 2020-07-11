import { ADD_REMINDER, REMOVE_REMINDER, CLEAR_REMINDER, LOAD_REMINDERS } from "../types";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import { todosRef } from "../components/firebaset";

const reminders =(state=[],action) => {
    let reminders = [] ;
    if(!state[0])
    {state=[]}
    /* state = read_cookie('spells')
    debugger;
    if(!state[0])
     {state=[]}
     */ 

    if (action.type === ADD_REMINDER)
    {
        debugger;
        if(action.text !== '' && action.date !== '')
        { 

 /*         addFun =  () => {debugger
                const add = async () => {
        todosRef.push().set({text:action.text, date:action.date.toLocaleString(),id:Math.random()});    
    };
    
    add();
} */
       
        //debugger;
   /*     // reminders = read_cookie('spells')
        // reminders = [...state, {text:action.text, date:action.date,id:Math.random()}]
        //bake_cookie('reminders',reminders)
       // console.log("from add reducer", reminders,JSON.stringify(reminders))
       // return reminders; */
    }
    }

    else if (action.type === REMOVE_REMINDER)
    {

       /*  let toBeRemoved = state.filter(reminder => reminder.id == action.id)[0];
        debugger;
        todosRef.child(toBeRemoved.key).remove()
         */
       /*  reminders = state.filter(reminder => reminder.id !== action.id);
        bake_cookie('reminders',reminders)
        */ //console.log("from remove reducer", reminders)
      //  return reminders;
    }
    else if (action.type === CLEAR_REMINDER)
    {
       // state.map(reminder => {todosRef.child(reminder.key).remove()})
        //reminders = [];
        //bake_cookie('reminders',reminders)
       // return reminders;
    }
    else if (action.type === LOAD_REMINDERS)
    {
        debugger
        reminders = action.payload
      //  bake_cookie('reminders',reminders);
        if(!reminders[0])
        {reminders=[]}
       
        return reminders;
    }
  //  debugger;
return state;
}

export default reminders;