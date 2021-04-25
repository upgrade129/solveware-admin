import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));



export default function Cart() {
  const classes = useStyles();
 
   const [title, setTitle] = useState('');
   const [des, setDes] = useState('');
   const [price, setPrice] = useState(0);
   

const handlesave = (e) => {
    
  e.preventDefault();
  
  const productdetail = {
      "title" : title,
      "description" : des,
      "price" : price
  };
  axios.post(`http://localhost:4200/products`,productdetail)
  .then(response => {
     console.log("add product",response.data)
  });
  setTitle("");
  setDes(""); 
  setPrice(0);
}

  return (
      <React.Fragment>
          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>

            <nav>
            <Link variant="button" color="textPrimary" href="/home" className={classes.link}>
              Back to Home
            </Link>
          </nav>
        
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">

        <div className={classes.paper}>

        <form className={classes.form} noValidate onSubmit={handlesave}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Product Name"
                autoFocus
                onChange = {(e) => setTitle(e.target.value)} value = {title}
              />
            </Grid>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Product Description"
                name="description"
                onChange = {(e) => setDes(e.target.value)} value = {des}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                onChange = {(e) => setPrice(e.target.value)} value = {price}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Product
          </Button>
         
        </form>
        </div>
        </Container>
      </React.Fragment>

  );
}