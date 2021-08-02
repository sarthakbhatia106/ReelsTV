import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Video from './Video';
import { database } from '../firebase';
import SinglePost from './SinglePost';
import './singleVideo.css';

const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '0px'
    },
    heading:{
        font:'monospace',
        margin:'5%'
    }

});
function PostsProfile({ userData = null }) {
    const classes = useStyles();
    const [posts, setPosts] = useState(null);
    const [openId, setOpenId] = useState(null);
    const handleClickOpen = (id) => {
        setOpenId(id);
    }
    const handleClose = () => {
        setOpenId(null);
    }
    useEffect(() => {
        //   console.log(userData.userId);
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            parr = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().userId == userData.userId) {
                    // console.log(doc.data().userId);
                    let data = { ...doc.data(), postId: doc.id }
                    parr.push(data)
                }

            })
            setPosts(parr);

        })
        // return unsub;
    }
        , [])

    return (
        <>
            <div className='place'>
            </div>
            {posts == null ? <CircularProgress className={classes.loader} color="secondary" /> : posts.length==0? <h1 className={classes.heading}>No Posts To Show</h1>
            :
                <>
                    {
                        posts.map((post) => (
                            <React.Fragment key={post.postId}>
                                <div className='vid-post'>
                                    {/* <Video source={post.pUrl} id={post.pId} /> */}
                                    <SinglePost postData={post} ></SinglePost>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </>
      }

        </>
    )
}

export default PostsProfile