import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { storage, database } from '../firebase';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    profile: {
        '&:hover': {
            color: "white",
            background: "#BB86FC",
        },
        background: '#3700B3',
        color: 'white'
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
        fontSize: '18px'
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'white'
    },
    title: {
        width: '50%',

    },
    signUpContent: {
        width: '40%'
    },
    icon: {
        width: '30%',
        height: '30%',
        position: 'relative',
        left: '33%',
        top: '20%'
    }

}));

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const history = useHistory();

    const { signUp, currentUser } = useContext(AuthContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signUp(email, password);
            let uid = res.user.uid;
            console.log(uid);

            //this gives us the way to store a file or data at a particular location in database
            //ref---Returns a reference for the given path in the default bucket.
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                //snapshot gives the snapshots of the file to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is' + progress + "% done");
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('');
                }, 2000);
                setLoading(false);
            }

            async function fn3() {
                //this gives the url of the uploaded image
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);

                //seeting items in database
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: [],
                })
            }

            setLoading(false);
            console.log('user has Signed up');
            history.push('/');
        }
        catch (err) {
            setError(err);
            setTimeout(() => setError(''), 2000);
            setLoading(false);
        }
    }

    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file != null) {
            setFile(file);
        }
    }
    const handleLogIn = (e) => {
        e.preventDefault();
        history.push('/login');
    }

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        }
    })
    const classes = useStyles();

    return (
        <div className={classes.main} style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
            <div className={classes.inner}>

                <div className={classes.title}>
                    <SlowMotionVideoIcon className={classes.icon} />

                    <h1 className={classes.heading}> Reels TV</h1>
                    <span className={classes.tagline}>Social media app for sharing moments</span>
                </div>
                <div className={classes.signUpContent}>
                    <div className={classes.actualForm}>
                        <form onSubmit={handleSignUp} className={classes.root} noValidate autoComplete="off">
                            <div>
                                <h1 className={classes.heading1}>Sign Up</h1>
                            </div>
                            <div>
                                <TextField id="outlined-basic" variant="outlined" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div>
                                <TextField type="email" id="outlined-basic" variant="outlined" label="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div>
                                <TextField type="password" id="outlined-basic" variant="outlined" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" onChange={handleFileSubmit} />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" className={classes.profile} component="span">
                                        Profile Picture
                                    </Button>
                                </label>
                            </div>

                            <Button className={classes.submit} variant="outlined" type='submit' disabled={loading}>
                                Sign Up
                            </Button>
                            <Link onClick={handleLogIn} className={classes.link}>
                                Login here
                            </Link>

                            {
                                error ? <Alert severity="error" style={{ background: 'transparent', fontSize: '15px' }}>{error}</Alert> : <></>
                            }
                        </form>
                    </div >
                </div>

            </div>
        </div>
    )
}

export default SignUp