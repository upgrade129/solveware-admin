import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) =>({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbar: {
    flexWrap: 'wrap',
  }
}));


export default function Userdetails() {
  const classes = useStyles();

   const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4200/users')
        .then(response => {
            console.log(response.data);
            setUsers(response.data);
            
        });
    

}, []);

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
          <Typography component="h1" variant="h5">
          User Details
        </Typography>
          {users.map((user) =>(
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="body1" component="p">
                    USERNAME - {user.username}
                  </Typography>
                  <Typography variant="body2" component="p">
                    EMAIL -  {user.email}
                  </Typography>
                </CardContent>
              </Card>
    
            ))}
            </Container>
      </React.Fragment>

  );
}