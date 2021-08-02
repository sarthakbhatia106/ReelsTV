import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { database } from '../firebase';
import NavBar from './NavBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile';
import './feed.css';
import Posts from './Post';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PostsProfile from './PostsProfile';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginLeft: '8%'
    },
    main: {
        margin: '8%',
    },
    info: {
        display: 'flex',
    },
    name: {
        marginLeft: '8%',
        fontFamily:'monospace',
    },
    posts:{
        display:'flex',
        flexWrap:'wrap'
    }
    
}));

function Profile() {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        })

    }, [currentUser]);

    return (
        <>
            {userData == null ? <div className='loading'>
                <CircularProgress style={{ marginLeft: '40%' }} />
                <br></br>
                <span style={{ color: 'primary', fontSize: '17px', fontFamily: 'cursive' }}>We are getting your profile ready. . .</span>
            </div>
                : <>
                    <NavBar userData={userData} />
                    <div className={classes.main}>
                        <div className={classes.info}>
                            <Avatar alt="Remy Sharp" src={userData.profileUrl} className={classes.large} />
                            <div className={classes.name}>
                                <h1>{userData.username}</h1>
                                <h2>Number of Posts: <span>{userData.postIds.length}</span></h2>
                            </div>
                        </div>
                        <div className={classes.posts}>
                            <PostsProfile userData={userData}/>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default Profile