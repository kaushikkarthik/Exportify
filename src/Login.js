import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  login: {
    display: 'grid',
    placeItems: 'center',
    // height: '20vh',
    backgroundColor: 'black',
    borderRadius: '10px',
    padding: '2rem',
    marginLeft: '2rem',
    marginRight: '2rem',

    '& img': {
      width: '50%',
    },

    '& a': {
      padding: '20px',
      borderRadius: '99px',
      backgroundColor: '#1db954',
      fontWeight: 'bolder',
      color: 'white',
      textDecoration: 'none',
    },

    '& a:hover': {
      backgroundColor: ' white',
      borderColor: '#1db954',
      color: '#1db954',
    },
  },
});

const generateRandomString = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

function Login() {
  const classes = useStyles();

  var client_id = process.env.REACT_APP_CL_ID;

  var redirect_uri = 'https://exportify.netlify.app/';
  //var redirect_uri = 'http://localhost:3000/';
  var stateKey = 'spotify_auth_state';

  var state = generateRandomString(16);

  localStorage.setItem(stateKey, state);
  var scope =
    'playlist-read-private playlist-read-collaborative user-library-read';

  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  return (
    <>
      <div className={classes.login}>
        {/* <img
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="Spotify-Logo"
        /> */}
        <article>
          <h3>
            Exportify is a third-party React application that helps you export
            Track Name, Album Name,
            <br />
            Artists and ISRC fields from all your playlists as JSON/text
          </h3>
        </article>
        <a href={url}>LOGIN WITH SPOTIFY</a>
      </div>
      <br />
    </>
  );
}

export default Login;
