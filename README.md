<h1>Spotify Posters</h1>

Create posters using albums you listen to.

[https://spotify-posters.surge.sh](https://spotify-posters.surge.sh)

<h4>Deploying:</h4>

`npm run build`

`mv build/index.html build/200.html` (see [this article](https://medium.com/@Jeff_Duke_io/how-to-deploy-an-app-using-react-and-react-router4-fe5f02a27a97))

`surge build spotify-posters.surge.sh`

<h4>Developing</h4>

Switch the comments on the variable `redirectUri` in `src/components/Authorize.js`

`npm run start`
