import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import './addComment.css';
import {database} from '../firebase'

const useStyles = makeStyles({
    cbtn:{
        marginRight:'1%',
        marginTop:'4%'
    }
});

function AddComment({userData=null, postData=null}) {
    const classes = useStyles();
    const [Text, setText] = useState('');
    const manageText=(e)=>{
        let comment =e.target.value;
        setText(comment);
    }
    const handleOnEnter=()=>{
        let obj={
            text:Text,
            uName:userData.username,
            uUrl:userData.profileUrl
        }
        // console.log(obj);

        database.comments.add(obj).then(docRef=>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,docRef.id]
            })
            // setText('');
        }).then(()=>{
            setText('');
        }).catch(e=>{
            console.log(e+" ");
        })

    }

    return (
        <div className='emojibox'>
            <TextField fullWidth={true} label="Add Comment" onChange={manageText} value={Text} />
            <Button onClick={handleOnEnter} disabled={Text==''?true:false} className={classes.cbtn} color='primary'>Post</Button>
        </div>
    )
}

export default AddComment
