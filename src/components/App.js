
import React, { useState } from 'react';
import queryString from 'query-string';
import SpotifyWebApi from 'spotify-web-api-js';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Poster from './Poster';
import Settings from './Settings';
import Export from './Export';
import AlbumImporter from './AlbumImporter';

const App = (props) => {
  const spotifyAccessToken = queryString.parse(props.location.hash).access_token;
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(spotifyAccessToken);

  const [images, setImages] = useState([]);
  const [cols, setCols] = useState(5);
  const [spacing, setSpacing] = useState(4);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [posterWidthInches, setPosterWidthInches] = useState(18);
  const [posterHeightInches, setPosterHeightInches] = useState(24);
  const [takingPicture, setTakingPicture] = useState(false);
  const [pictureScale, setPictureScale] = useState(null);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} style={{ padding: 10 }} >
          <Link href='/' color="inherit" underline="none">
            <Typography variant="h3" component="h1" gutterBottom>
              Spotify Posters
            </Typography>
          </Link>

          <Paper elevation={3} style={{ marginBottom: 10, padding: 20 }}>
            <AlbumImporter
              spotifyApi={spotifyApi}
              images={images}
              setImages={setImages}
            />
          </Paper>

          <Paper elevation={3} style={{ marginBottom: 10, padding: 20 }}>
            <Settings
              posterWidthInches={posterWidthInches}
              setPosterWidthInches={setPosterWidthInches}
              posterHeightInches={posterHeightInches}
              setPosterHeightInches={setPosterHeightInches}
              cols={cols}
              setColsInput={setCols}
              spacing={spacing}
              setSpacing={setSpacing}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
            />
          </Paper>

          <Export
            takingPicture={takingPicture}
            setTakingPicture={setTakingPicture}
            pictureScale={pictureScale}
            setPictureScale={setPictureScale}
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <Paper elevation={3} style={{ margin: 10, padding: 10 }}>
            <Poster
              backgroundColor={backgroundColor}
              images={images}
              spacing={spacing}
              cols={cols}
              posterWidthInches={posterWidthInches}
              posterHeightInches={posterHeightInches}
              takingPicture={takingPicture}
              pictureScale={pictureScale}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
