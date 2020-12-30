import React, { useEffect, useState } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const LIMIT = 50;

const AlbumImporter = ({ spotifyApi, images, setImages }) => {

  const [source, setSource] = useState('top');
  const [topTimeRange, setTopTimeRange] = useState('long_term');
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [offset, setOffset] = useState(0);
  const [moreSongs, setMoreSongs] = useState(false);

  useEffect(() => {
    const getPlaylists = async () => {
      const playlistsResponse = await spotifyApi.getUserPlaylists();
      const formattedPlaylists = playlistsResponse.items.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });
      setPlaylists(formattedPlaylists);
      setPlaylist(formattedPlaylists[0].id);
    };
    getPlaylists();
  }, []);

  const filterAndFormatAlbums = (albums) => albums.filter(item => {
    const albumImage = item.images.find(image => image.height === 640 && image.width === 640);
    if (!albumImage) {
      console.log('No image found for album with id ' + item.id + ' and name ' + item.name);
      return false;
    } else {
      return true;
    }
  }).map(item => {
    const albumImage = item.images.find(image => image.height === 640 && image.width === 640);
    return {
      id: item.id,
      url: albumImage.url
    }
  });

  const uniqueAlbums = (albums) => albums.reduce(
    (uniqueAlbums, item) => {
      return uniqueAlbums.some(album => album.id === item.id) ? uniqueAlbums : [...uniqueAlbums, item]
    },
    [],
  );

  const getAlbums = async (newOffset) => {
    let albums;
    let response;
    switch (source) {
      case 'top':
        response = await spotifyApi.getMyTopTracks({ time_range: topTimeRange, limit: LIMIT, offset: newOffset });
        albums = response.items.map(track => track.album);
        break;
      case 'saved':
        response = await spotifyApi.getMySavedTracks({ limit: LIMIT, offset: newOffset });
        albums = response.items.map(track => track.track.album);
        break;
      case 'playlist':
        response = await spotifyApi.getPlaylistTracks(playlist, { limit: LIMIT, offset: newOffset });
        albums = response.items.map(track => track.track.album);
        break;
      default:
        break;
    }
    setOffset(newOffset);
    setMoreSongs(response.next !== null);
    return albums;
  }

  useEffect(() => {
    const asyncEffect = async () => {
      const albums = await getAlbums(0);
      setImages(uniqueAlbums(filterAndFormatAlbums(albums)));
    };
    asyncEffect();
  }, [source, topTimeRange, playlist]);

  const loadMoreAlbums = async () => {
    const albums = await getAlbums(offset + 50);
    setImages(uniqueAlbums([...images, ...filterAndFormatAlbums(albums)]));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <RadioGroup value={source} onChange={event => setSource(event.target.value)} >
          <FormControlLabel
            value="top"
            control={<Radio color="primary" />}
            label="Top Songs"
          />
          <FormControlLabel
            value="saved"
            control={<Radio color="primary" />}
            label="Liked Songs"
          />
          <FormControlLabel
            value="playlist"
            control={<Radio color="primary" />}
            label="Playlist"
          />
        </RadioGroup>
      </Grid>

      { source === 'top' && (
        <Grid item xs={12} md={6}>
          <RadioGroup value={topTimeRange} onChange={event => setTopTimeRange(event.target.value)} >
            <FormControlLabel
              value="short_term"
              control={<Radio color="primary" style={{ width: 'auto' }} />}
              label="Recent"
            />
            <FormControlLabel
              value="medium_term"
              control={<Radio color="primary" style={{ width: 'auto' }} />}
              label="Last Six Months"
            />
            <FormControlLabel
              value="long_term"
              control={<Radio color="primary" style={{ width: 'auto' }} />}
              label="All Time"
            />
          </RadioGroup>
        </Grid>
      )}

      { source === 'playlist' && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <Select
              value={playlist}
              onChange={event => setPlaylist(event.target.value)}
            >
              {playlists.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      { moreSongs && (
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={loadMoreAlbums}>
            Load more songs
          </Button>
          <Typography variant="caption" display="block">
            Only 50 songs are loaded at once.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default AlbumImporter;