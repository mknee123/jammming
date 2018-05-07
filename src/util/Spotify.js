
const clientID = 'xxx';
const redirectURI = 'http://localhost:3000/';
//const redirectURI = 'http://mk_jammming.surge.sh';

let accessToken;
let expiresIn;
//let spotifyURL = 'https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}';


const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if(urlAccessToken && urlExpirationTime){
      accessToken = urlAccessToken[1];
      let expiration = urlExpirationTime;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null,
    '/');
      return accessToken;
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }}
        )}
        else {
          return [];
        }
      });
  },

  savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs) {
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
    return fetch('https://api.spotify.com/v1/users/${user_id}/playlists', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    }).then(response => response.json()
  ).then(jsonResponse => {
    const playlistID = jsonResponse.id;
    return fetch('https://api.spotify.com/users/${user_id}/playlists/${playlist_id}/tracks', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({URIs : trackURIs})
    });
  });
});
  }

}

export default Spotify;
