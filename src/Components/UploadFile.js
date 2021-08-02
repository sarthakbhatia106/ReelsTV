import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { storage,database } from '../firebase';
import {v4 as uuidv4} from 'uuid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    uploadDiv:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'1%'
    },
  }));

function UploadFile(props) {

    function LinearProgressWithLabel(props) {
        return (
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }
    const classes=useStyles();
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);
    const [progress, setprogress] = useState(0);
    const types=['video/mp4','video/webm','video/ogg'];
    const onChange=(e)=>{

        const file= e?.target?.files[0];
        console.log(file);
        if(!file){
            setError('Please select a file');
            setTimeout(()=>setError(null),2000);
            return;
        }

        if(types.indexOf(file.type)==-1){
            setError('Please select a video file');
            setTimeout(()=>setError(null),2000);
            return;
        }

        if(file.size/(1024*1024)>100){

            setError('Selectd file is too big');
            setTimeout(()=>setError(null),2000);
            return;
        }

        const id=uuidv4();
        const uploadTask=storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_changed',fn1,fn2,fn3);

        function fn1(snapshot){
            var p=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            if(p!=100){
                setLoading(true);
                setprogress(p);
            }else{
                setLoading(false);
                setprogress(0);
            }
            console.log('Upload is'+p+"% done");
        }

        function fn2(error){
            setError(error);
            setTimeout(() => {
                setError(null);
            }, 2000);
            setLoading(false);
        }
        function fn3(){
            setLoading(true);
            uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                let obj={
                    comments:[],
                    likes:[],
                    pId: id,
                    pUrl:url,
                    uName:props?.userData?.username,
                    uProfile:props?.userData?.profileUrl,
                    userId:props?.userData?.userId,
                    createdAt:database.getCurrentTimeStamp(),
                }
                console.log(obj);
                console.log(props.userData);
                database.posts.add(obj).then(async docRef=>{
                    console.log(docRef);
                    let res=await database.users.doc(props.userData.userId).update({
                        postIds:[...props.userData.postIds,docRef.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }).catch(e=>{
                    setError(e);
                    setTimeout(() => {
                        setError(null);
                    }, 2000);
                    setLoading(false);
                })
            })
        }
    }

    return (
        <>
          {
              Error!=null?<Alert severity="error">{Error}</Alert>:<>
              {
                  Loading?<LinearProgressWithLabel color='primary' position="static" style={{marginTop:'2%',marginBottom:'2%'}} variant="determinate" value={progress} />
                  :<></>
              }
              <div className={classes.uploadDiv}>
              <input color='primary' type='file' onChange={onChange} id='icon-button-file' style={{display:'none'}}/>
              <label htmlFor='icon-button-file'>
                  <Button disabled={Loading} variant='outlined' component='span' className={classes.button} size='medium' color='secondary'>
                      Upload Video
                  </Button>
              </label>
              </div>
              </>
          }  
        </>
    )
}

export default UploadFile
