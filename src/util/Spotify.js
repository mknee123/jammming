
/*client id and redirect uri variables to be used multiple times */
const clientID = '7ead6d26750a4543b772766a43ee84e7';
const redirectURI = 'http://localhost:3000/';
//const redirectURI = 'http://mk_jammming.surge.sh';
/*User accessToken variable to be used mutliple times */
let accessToken;
let expiresIn;

//const url = window.location.href;


const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = expiresInMatch[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}&response_type=token`;
      window.location = accessUrl;
    }
  },

  search(term) {
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=20&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();

    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      } else {
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    }
    })
  },
  savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs.length) {
    return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userID;

    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => {
      if(response.ok) {
        return response.json();
      }}
    ).then(jsonResponse => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: playlistName})
          }).then(response => {
              if (response.ok) {
                  return response.json();
              } else {
              console.log('FAILING!');
          }
          }).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris : trackURIs })
            });
          });
        });
      }
}

export default Spotify;
