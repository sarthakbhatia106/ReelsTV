import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Avatar from "@material-ui/core/Avatar";
import { AuthContext } from '../Context/AuthProvider';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'black',
    fontFamily: 'Cursive',
  },
  appb: {
    backgroundColor: 'white',
    padding: '0 10% 0 10%'
  },
  icon: {
    color: 'black',
    margin: '0 20% 0 20%'
  },
  symbol: {
    width: '15%',
    height: '100%',
    fontSize: '10px',
    cursor: 'pointer',
    display:'flex'
  },
  profile: {
    color: 'black',
    margin: '0 20% 0 20%',
    height: '4vh',
    width: '4vh',
    border: '0.5px solid'
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '5%',
    cursor: 'pointer'
  },
  i:{
    margin:'12%',
  }

}));

export default function NavBar(props) {
  console.log(props);
  const classes = useStyles();

  const history = useHistory();
  const { logOut } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleProfile = () => {
    setAnchorEl(null);
    history.push('/profile');
  };
  const handleLogOut = async () => {
    setAnchorEl(null);
    await logOut();
    history.push('/login');
    window.location.reload();
  }
  const handleHome = () => {
    history.push('/');
  }

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appb}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <div className={classes.symbol} onClick={handleHome}>
              <SlowMotionVideoIcon className={classes.i}/>
              <h1>Reels TV</h1>
            </div>
          </Typography>
          <div className={classes.icons}>
            <HomeIcon style={{ fontSize: 28 }} className={classes.icon} onClick={handleHome} />
            <ExitToAppIcon className={classes.icon} onClick={handleLogOut} />

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar className={classes.profile} onClick={handleProfile} alt="Remy Sharp" src={props.userData.profileUrl} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
