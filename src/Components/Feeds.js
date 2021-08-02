import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { database } from '../firebase';
import NavBar from './NavBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile';
import './feed.css';
import Posts from './Post';

function Feeds() {
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
                <CircularProgress  style={{marginLeft:'40%'}}/>
                <br></br>
                <span style={{color:'primary',fontSize:'17px',fontFamily:'cursive'}}>We are getting your feed ready. . .</span>
            </div>
                : <>
                    <NavBar userData={userData} />
                    <div style={{ height: '9.5vh' }} />
                    <div className='feed-container'>
                        <div className='center'>
                            <UploadFile userData={userData} />
                            <Posts userData={userData} />
                        </div>
                    </div>

                </>}
        </>
    )
}

export default Feeds