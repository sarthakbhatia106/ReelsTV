import './singleVideo.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import './post.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Video from './Video';
import { database, firestore } from '../firebase';
import Likes from './Likes';
import AddComment from './AddComment';
import Comments from './Comments';
import { AuthContext } from '../Context/AuthProvider';
import DeleteIcon from '@material-ui/icons/Delete';
import 'firebase/firestore';
import firebase from 'firebase/app';


const useStyles = makeStyles({
    likes: {
        margin: '5%',
        cursor: 'pointer'
    },
    comments: {
        margin: '5%',
        cursor: 'pointer'

    },
    symbols: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        // left: '0%', 
    },
    delete: {
        margin: '5%',
        cursor: 'pointer'
    },
    loading:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'50%'
    },
    seeComments: {
        height: '54vh',
        overflowY: 'auto'
      },
})

function SinglePost(props) {
    const classes = useStyles();
    const [loding, setLoading] = useState(false);
    const [openId, setOpenId] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        })

    }, [currentUser, userData]);
    const handleClickOpen = (id) => {
        setOpenId(id);
    }
    const handleClose = () => {
        setOpenId(null);
    }
    const handleDelete = () => {
        let user = props.postData.userId;
        let comments = props.postData.comments;
        let postId;

        database.posts.get().then((snap) => {
            snap.forEach((doc) => {
                if (doc.data().pId == props.postData.pId) {
                    postId = doc.id
                }
            })
            setLoading(true);
            database.users.doc(user).update({
                postIds: firebase.firestore.FieldValue.arrayRemove(postId)
            });
            database.posts.doc(postId).delete().then(() => {
                console.log('Deleted successfully');
                setLoading(false);
                // window.location.reload();
            }).catch((e) => {
                console.log(e);
            })
        });

        comments.forEach((c) => {
            database.comments.doc(c).delete().then(() => {
                console.log('comments successfully');
            }).catch((e) => {
                console.log(e);
            })
        })

    }
    return (
        <>
            {
                loding == true ?<div className={classes.loading}><CircularProgress /></div>:
            <div>
                <video className='actual-post' src={props.postData.pUrl} muted='muted' type='video/mp4'></video>
                <div className={classes.symbols}>
                    <div className={classes.likes}> <FavoriteIcon style={{ color: '#e74c3c' }} /> {props.postData.likes.length} </div>
                    <div className={classes.comments}>
                        <ChatBubbleIcon onClick={() => handleClickOpen(props.postData.pId)} />
                        {props.postData.comments.length}
                        <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === props.postData.pId}>
                            <MuiDialogContent>
                                <div className='dcontainer'>
                                    <div className='video-part'>
                                        <video autoPlay={true} className='video-styles2' id={props.postData.id} muted="muted" type="video/mp4" >
                                            <source src={props.postData.pUrl} type="video/webm" />
                                        </video>
                                    </div>
                                    <div className='info-part'>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar src={props.postData?.uProfile} aria-label="recipe" className={classes.avatar}>
                                                    </Avatar>
                                                }
                                                // action={
                                                //     <IconButton aria-label="settings">
                                                //         <MoreVertIcon />
                                                //     </IconButton>
                                                // }
                                                title={props.postData?.uName}
                                            />

                                            <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                            <CardContent className={classes.seeComments}>
                                                <Comments userData={userData} postData={props.postData} />
                                            </CardContent>

                                        </Card>
                                        <div className='extra'>
                                            <div className='likes'>
                                                <Typography className={classes.typo} variant='body2'>Liked By {props.postData.likes.length == 0 ? 'nobody' : `${props.postData.likes.length} others`}</Typography>
                                            </div>
                                            <AddComment userData={userData} postData={props.postData} />
                                        </div>
                                    </div>
                                </div>
                            </MuiDialogContent>
                        </Dialog>
                    </div>
                    <div className={classes.delete} onClick={handleDelete}><DeleteIcon /></div>
                </div>
            </div>
}
        </>
    )
}

export default SinglePost
