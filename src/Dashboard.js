import { useFetch } from './useFetch';
import React, { useState, useEffect } from 'react';
import paginated_fetch from './fetch';
import { useCallback } from 'react';

function allDownload(content, fileName, contentType) {
  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const Playlists = ({ url, offset, limit, headers }) => {
  const { loading, products } = useFetch(url, headers);
  const [playlists, setPlaylists] = useState([]);

  const fetchAllPlaylists = useCallback(async () => {
    await paginated_fetch(url, offset, headers, products.total).then(
      (products) => {
        let fetchedData = [];
        for (let chunk of products) {
          chunk.items.map((item) => {
            return fetchedData.push({
              name: item.name,
              href: item.tracks.href,
              total: item.tracks.total,
            });
          });
        }

        setPlaylists(fetchedData);
        //return fetchedData;
      }
    );
  }, [products, headers, offset, url]);

  useEffect(() => {
    if (loading === true && products !== null) {
      fetchAllPlaylists();
    }
  }, [loading, products, playlists, fetchAllPlaylists]);

  return (
    <>
      {loading
        ? 'Loading...'
        : playlists.map((item) => {
            return (
              <Tracks
                url={item.href}
                offset={offset}
                limit={limit}
                headers={headers}
                name={item.name}
                total={item.total}
              ></Tracks>
            );
          })}
    </>
  );
};

const Tracks = ({ url, offset, limit, headers, name, total }) => {
  const { loading, products } = useFetch(url, headers);

  const download = async () => {
    if (name === null) {
      name = 'Liked Songs';
    }

    await paginated_fetch(url, offset, headers, total)
      .then((products) => {
        let fetchedData = [];
        for (let chunk of products) {
          chunk.items.map((item) => {
            console.log(item);
            let fetchedArtists = [];
            item.track.artists.map((item) => {
              return fetchedArtists.push(item.name);
            });

            return fetchedData.push({
              name: item.track.name,
              album: item.track.album.name,
              artists: fetchedArtists
                .toLocaleString()
                .replace(/,/g, ', ')
                .trim(),
              isrc: item.track.external_ids.isrc,
            });
          });
        }
        return fetchedData;
      })
      .then((fetchedData) => {
        allDownload(JSON.stringify(fetchedData), `${name}.json`, 'text/plain');
      });
  };

  return (
    <>
      <h2>
        {loading ? (
          'Loading...'
        ) : (
          <article>
            <h2>{name || 'Liked Songs'}</h2>
            <h4>{(total || products.total) + ' tracks found'}</h4>
            <button className="button" type="button" onClick={download}>
              Download
            </button>
          </article>
        )}
      </h2>
    </>
  );
};

const Dashboard = ({ code }) => {
  const authBearer = `Bearer ${code}`;

  const offset = 0;
  const limit = 50;
  //const maxSongs = 10000;

  const urlPlaylists = 'https://api.spotify.com/v1/me/playlists';
  const urlTracks = 'https://api.spotify.com/v1/me/tracks';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: authBearer,
  };

  return (
    <>
      <Tracks
        url={urlTracks}
        offset={offset}
        limit={limit}
        headers={headers}
        name={null}
        total={null}
      ></Tracks>

      <Playlists
        url={urlPlaylists}
        offset={offset}
        limit={limit}
        headers={headers}
      ></Playlists>
      <article>
        <h3>
          You might want to signout of{' '}
          <a href="https://www.spotify.com">Spotify</a> after you finish your
          downloads. <br />
          The access token for this application automatically expires after a
          short duration
        </h3>
      </article>
    </>
  );
};

export default Dashboard;
