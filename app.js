require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node')

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

// retrieve access token

spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error))

// Our routes go here:

app.get('/index', (req, res) => {
    res.render('index')
});

app.get('/artist-search', (req, res) => {
    // something the app receives from the 
    // form in the browser, that connects to:

    spotifyApi
        .searchArtists(/*'HERE GOES THE QUERY ARTIST */)
        .then(data =>('The received data from the API: ', data.body))
            res.render(artist-search-result, {data: data})
        .catch(err => console.log('The error while searching artists occured: ', err))
});

app.get('/albums/:artistId', (req, res, next) => {
    
    spotifyApi
        .getArtistAlbums()
            .then()
            .catch(err, console.log('An error ocurred while displaying the required albums', err))

})


app.get('tracks', (req, res, next) => {

    spotifyApi
        .getAlbumTracks()
        .then()
        .catch(err, console.log('An error ocurred while displaying the required tracks', err))
})




app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
