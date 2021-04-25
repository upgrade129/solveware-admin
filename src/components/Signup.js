import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
    const [firstname, setFirstname] = useState('');
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [confpassword, setConfPassword] = useState('');
    
    const history = useHistory();


    const routeChange = () =>{ 
        let path = `/home`; 
        history.push(path);
      }

  const handleSubmit = (e) => {
    
    e.preventDefault();

    if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {

      if(confpassword == password){
        
              console.log("hello",firstname,"pass",password);
            const userdetail = {
                "username" : firstname,
                "password" : password,
                "email" : email
            };
            localStorage.setItem('username', firstname);
            console.log(firstname);
            axios.post('http://localhost:4200/users', userdetail)
            .then(response => {
                console.log(response.data);
                routeChange();
            });
               

      }
      else{
      alert("Conform Password doesn't match with password");

      }
      
    } 
    else {
      alert("Your password should min 8 characters and atleast on Uppercaes and at least one special character!")

}}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin register
        </Typography>
        <form className={classes.form} onSubmit = {handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="First Name"
                autoFocus
                onChange = {(e) => setFirstname(e.target.value)} value = {firstname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {(e) => setEmail(e.target.value)} value = {email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {(e) => setPassword(e.target.value)} value = {password}
              />
              <span>
              Your password should min 8 characters and atleast on Uppercaes and at least one special character!
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Conform Password"
                type="password"
                id="conform password"
                autoComplete="current-password"
                onChange = {(e) => setConfPassword(e.target.value)} value = {confpassword}
              />
              <span>
                comfrom password should be same as password
              </span>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}