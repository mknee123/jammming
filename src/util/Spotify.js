
const clientID = '7ead6d26750a4543b772766a43ee84e7';
const redirectURI = 'http://localhost:3000/';
//const redirectURI = 'http://mk_jammming.surge.sh';

let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if(urlAccessToken && urlExpirationTime){
      accessToken = urlAccessToken[1];
      expiresIn = urlExpirationTime[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null,
    '/');
      return accessToken;
    }
  },

  search(term) {
    let accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks)   {
            return [];
          }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
      });
  },

  savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs.length) {
        return;
    }
    let accessToken = this.getAccessToken();
    let headers = { Authorization: 'Bearer ${accessToken}'};
    let userID;

    return fetch('https://api.spotify.com/v1/me', {
      headers: headers,
    }).then(response => response.json()
  ).then(jsonResponse => {
    userID = jsonResponse.id;
    return fetch('https://api.spotify.com/v1/users/${userID}/playlists', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    }).then(response => response.json()
  ).then(jsonResponse => {
    const playlistID = jsonResponse.id;
    return fetch('https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({URIs : trackURIs})
    });
  });
});
  }

};

export default Spotify;
