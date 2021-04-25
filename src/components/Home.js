import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
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




export default function Pricing() {
  const classes = useStyles();

  const [products ,setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
   const [des, setDes] = React.useState('');
   const [price, setPrice] = React.useState(0);
   const [id, setId] = React.useState('');


   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };
  
   const handlesave = (e) => {
    
    e.preventDefault();
    
    const productdetail = {
        "title" : title,
        "description" : des,
        "price" : price
    };
    axios.put(`http://localhost:4200/products/${id}`,productdetail)
    .then(response => {
       console.log("add product",response.data)
    });
    setTitle("");
    setDes(""); 
    setPrice(0);

    axios.get('http://localhost:4200/products')
                    .then(response => {
                      setProducts(response.data);
                      console.log("products",response);
                  });

                  setOpen(false);
  }
  
    useEffect(() => {
      axios.get('http://localhost:4200/products')
      .then(response => {
        setProducts(response.data);
        console.log("products",response);
    });
    }, []);   
   

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Shoe Mart
          </Typography>
          <nav>
          <Link href="/customerdetails" className={classes.link}>
              <Button variant="outlined" onClick={()=>{
                
              }}>
                Customer Details
                </Button>
            </Link>
            <Link href="/orderdetails" className={classes.link}>
              <Button variant="outlined" onClick={()=>{
                
              }}>
                Order Details
                </Button>
            </Link>
            <Link href="/addproduct" className={classes.link}>
              <Button variant="outlined" onClick={()=>{
                
              }}>
                ADD Product
                </Button>
            </Link>
          
          </nav>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}

      {open ? 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit product</DialogTitle>
      <DialogContent>
      <form className={classes.form} noValidate >
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
        </form>
        
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handlesave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
      :
      ""}


      <Container maxWidth="md" component="main">
        <Grid container spacing={1} alignItems="flex-end">

          {products.map((product) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={product.title}

                />
                <CardContent>
                  <div >
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${product.price}
                    </Typography>
                    
                  </div>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center" >
                        {product.description}
                      </Typography>
                    
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary" onClick={()=> {
                     setOpen(true);
                     setTitle(product.title);
                     setDes(product.description);
                     setPrice(product.price);
                     setId(product._id);
                  }} >
                   Edit product
                  </Button>
                  <Button fullWidth variant="contained" color="secondary" onClick={()=> {
                     axios.delete(`http://localhost:4200/products/${product._id}`)
                     .then(response => {
                       console.log("delete",response);
                      
                   });

                   axios.get('http://localhost:4200/products')
                    .then(response => {
                      setProducts(response.data);
                      console.log("products",response);
                  });
                    }} >
                     Delete 
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
     
    </React.Fragment>
  );
}