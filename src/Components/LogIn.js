import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SignUp from './SignUp';
import Alert from '@material-ui/lab/Alert';
import image from './landing.jpg';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            height: '100%'
        },
    },
    input: {
        display: 'none',
    },
    main: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    inner: {
        width: '50%',
        height: '80%',
        borderRadius: '20px',
        boxShadow: '0px 0px 4px 4px grey',
        alignItems: 'center',
        margin: '0 auto',
        marginLeft: '40%',
        display: 'flex'
    },
    heading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8%',
        marginBottom: '0',
        fontFamily: 'BillabongemFont',
        fontSize: '60px',
        fontFamily: 'Cursive'
    },
    heading1: {
        fontFamily: 'BillabongemFont',
        fontSize: '40px',
        fontFamily: 'Cursive',
        // transform: 'translateX(-50%)',
    },
    submit: {
        backgroundColor: '#3700B3',
        color: 'white',
        '&:hover': {
            color: "white",
            background: "#BB86FC",
        },
    },
    actualForm: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            height: '100%'
        },
        position: 'relative',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
    },
    tagline: {
        marginLeft: '10%',
        fontFamily: 'Cursive',
        fontSize:'18px'
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'white'
    },
    title:{
        width:'50%',

    },
    signUpContent:{
        width:'40%'
    },
    icon:{
        width:'30%',
        height:'30%',
        position:'relative',
        left:'33%',
        top:'20%'
    }
}));

function LogIn() {
    const classes = useStyles();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Error, setError] = useState('');
    const [Loading, setLoading] = useState(false);
    const { logIn, currentUser } = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (e) => {
        console.log('h1');
        e.preventDefault();
        try {
            console.log('Logging in user');
            setLoading(true);
            await logIn(Email, Password);
            setLoading(false);
            console.log('successful login');
            history.push('/');
        }
        catch {
            setError("error occured");
            setTimeout(() => setError(''), 2000);
            setLoading(false);
        }
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        history.push('/signup');
    }
    useEffect(() => {
        if (currentUser) {
            history.push('/');
        }
    }, []);

    return (
        <div className={classes.main} style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
            <div className={classes.inner}>

                <div className={classes.title}>
                    <SlowMotionVideoIcon className={classes.icon}/>
                    <h1 className={classes.heading}> Reels TV</h1>
                    <span className={classes.tagline}>Social media app for sharing moments</span>
                    <br/>
                </div>
                <div className={classes.signUpContent}>
                    <div className={classes.actualForm}>
                        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                            <div><h1 className={classes.heading1}> Log In</h1></div>
                            <div>
                                <TextField type="email" id="outlined-basic" variant="outlined" label="E-Mail" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div>
                                <TextField type="password" id="outlined-basic" variant="outlined" label="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Button className={classes.submit} variant="outlined" type='submit' disabled={Loading}>
                                Log In
                            </Button>
                            <br />
                            <span>Not yet signed up?</span>
                            <br />
                            <Link onClick={handleSignUp} className={classes.link}>
                                Click here
                            </Link>

                            {
                                Error ? <Alert severity="error" style={{ background: 'transparent', fontSize: '15px' }}>{Error}</Alert> : <></>
                            }
                        </form>
                    </div >
                </div>
            </div>
        </div>
    )
}

export default LogIn
