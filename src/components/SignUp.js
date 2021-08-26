import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import classes from './SignUp.module.css';

function SignUp(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
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

    function firstnameHandler(event){
        setFirstName(event.target.value);
    }

    function lastnameHandler(event){
        setLastName(event.target.value);
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
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
        }
        else if(!validUsername){
            alert("Username not available");
        }
        else if(!validPassword){
            alert("Password must be 8 characters long and must have 1 uppercase, 1 lowercase and 1 number");
        }
    }



    // return (<form onSubmit={signUpHandler}> 
    //     <p>First Name</p>
    //     <input type="text" id="firstname" value={firstName} onChange={firstnameHandler} required/>
    //     <p>Last Name</p>
    //     <input type="text" id="lastname" value={lastName} onChange={lastnameHandler} required/>
    //     <p>User name</p>
    //     <input type="text" value={username} id="uername" onChange={usernameHandler} required/>
    //     <p>Password</p>
    //     <input type="password" value={password} id="password" onChange={passwordHandler} required/>
    //     <br></br>
    //     <button type="submit">Sign Up</button>
    // </form>)

    return (
            <Card className={classes.formCard}>
                <Card.Body>
                    <h3 className={classes.formHeader}>SignUp Form</h3>
                    <Form onSubmit={signUpHandler}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className={classes.labelLeft}>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter firstname" id="firstname" value={firstName} onChange={firstnameHandler} required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className={classes.labelLeft}>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter lastname" id="lastname" value={lastName} onChange={lastnameHandler} required/>
                            </Form.Group>
                        </Col>                        
                    </Row>
                

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={classes.labelLeft}>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} id="uername" onChange={usernameHandler} required/>
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className={classes.labelLeft}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your Password" value={password} id="password" onChange={passwordHandler} required/>
                    </Form.Group>
                
                    <Button variant="primary" type="submit" className={classes.labelLeft}>
                    Submit
                    </Button>
            </Form></Card.Body>
            </Card>
    
            )

}

export default SignUp