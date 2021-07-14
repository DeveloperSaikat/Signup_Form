import React, { useEffect, useState } from 'react';

function SignUp(){

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect( async() => {
        console.log(username);
        const response = await checkUsernameAvailability();
        const myData = await response.json();
        console.log(myData);
        setValidUsername(myData);
        checkFormValidity();
    }, [username]);

    function checkUsernameAvailability(){
        return fetch(`https://www.reddit.com/api/username_available.json?user=${username}`);
    }

    function usernameHandler(event){
        setUsername(event.target.value);
    }

    function passwordHandler(event){
        setPassword(event.target.value);
        console.log(event.target.value);
        checkPasswordValidity();
    }

    function checkPasswordValidity(){
        if(password.length >=8 && password.match("^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$")){            
            setValidPassword(true);
        } 
        checkFormValidity();        
    }

    function checkFormValidity(){
        if(validUsername && validPassword){
            setFormIsValid(true);
        }
    }

    function signUpHandler(event){
        event.preventDefault();
        if(formIsValid){
            alert("Signup successful");
            setFormIsValid(false);
        }
        else if(!validUsername){
            alert("Username not available");
        }
        else if(!validPassword){
            alert("Password must be 8 characters long and must have 1 uppercase, 1 lowercase and 1 number");
        }
    }



    return (<form onSubmit={signUpHandler}> 
        <p>First Name</p>
        <input type="text" id="firstname" required/>
        <p>Last Name</p>
        <input type="text" id="lastname" required/>
        <p>User name</p>
        <input type="text" id="uername" onChange={usernameHandler} required/>
        <p>Password</p>
        <input type="password" id="password" onChange={passwordHandler} required/>
        <br></br>
        <button type="submit">Sign Up</button>
    </form>)

}

export default SignUp