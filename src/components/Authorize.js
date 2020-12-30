import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

class Authorize extends Component {
  base = 'https://accounts.spotify.com/authorize';
  clientId = '991c58b57222446bb0f61dcf3530deb5';
  // redirectUri = 'http:%2F%2Flocalhost:3000%2Fapp';
  redirectUri = 'https:%2F%2Fspotify-posters.surge.sh%2Fapp';
  scope = 'playlist-read-private playlist-read-collaborative user-top-read user-library-read';
  queryParams = `client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}&response_type=token`;

  authenticationUrl = `${this.base}?${this.queryParams}`;

  render() {
    return (
      <Container>
        <Paper elevation={3} style={{ marginTop: 20, padding: 20, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Spotify Posters
          </Typography>
          <Typography variant="body1" gutterBottom>
            Create posters using albums you listen to.
          </Typography>
          <Link variant="body1" href={this.authenticationUrl}>Log in with Spotify</Link>
        </Paper>
        <Link variant="body1" href={'https://github.com/Peter-Lavigne/Spotify-Posters'} style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          textAlign: 'center'
        }}>
          Github
        </Link>
      </Container>
    );
  }
}

export default Authorize;
