import React,{Component } from 'react';
import firebase from "../components/firebaset"

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// const config = {
  //  apiKey: "AIzaSyCHevsMkGkxkKCMGwxOayDLP-iq8KMvvmI",
  //  authDomain: "fir-auth-react-ef385.firebaseapp.com"
 // };
 // firebase.initializeApp(config);
  

class Login extends Component{
    state = {
        isSingedIn:false
    }

     uiConfig = {
        signInFlow: 'popup',
        
        signInSuccessUrl: '/signedIn',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
        ,
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
      };
      
      componentDidMount = () => {
       
          firebase.auth().onAuthStateChanged( user  => {
            this.setState({isSingedIn:!!user})
            console.log("user",user)  
        })
      }

      componentWillUnmount() {
        this.unregisterAuthObserver();
      }

     render (){
         console.log("auuuth",firebase.auth())
      return (
        <div>
            {
                this.state.isSingedIn ? 
               <span> 
            <nav className="navbar navbar-light bg-primary ">
            <span className="navbar-brand mb-0 h3 reminder-title">Welcome {firebase.auth().currentUser.displayName}!</span>
            <button className="btn btn-danger " onClick={() => firebase.auth().signOut()}>Logout</button>
           </nav>  
                
                </span>
                : 
                <StyledFirebaseAuth
                uiConfig = {this.uiConfig}
                firebaseAuth ={firebase.auth()}
                />
            }
        </div>
      );
    }}
    
    export default Login;


