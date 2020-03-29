import { request } from 'graphql-request';
import moment from 'moment';

const API_URL = 'https://api-currency-tracker.herokuapp.com/graphql';

function getTrackList() {
  const query = `{
    tracks {
      id
      fromCurrency
      toCurrency
      fromPrice
      toPrice
      email
      until
    }
  }`;

  return request(API_URL, query).then((data) => {
    return data.tracks.map((track) => {
      track.until = moment(parseInt(track.until, 10));
      return track;
    });
  });
}

/**
 * Delete a track
 * @param {string} id 
 */
function deleteTrack(id) {
  const query = `mutation {
    deleteTrack(
      id: "${id}"
    ) {
      id
    }
  }`;

  return request(API_URL, query).then(({deleteTrack}) => {
    return deleteTrack.id;
  });
}

/**
 * Save a new track
 * @param {object} data 
 */
function storeTrack(data) {
  const query = `mutation {
    createTrack(
      fromCurrency: "${data.fromCurrency}",
      toCurrency: "${data.toCurrency}",
      fromPrice: ${data.fromPrice},
      toPrice: ${data.toPrice},
      email: "${data.email}",
      until: "${data.until}"
    ) {
      id
    }
  }`;

  return request(API_URL, query).then(({createTrack}) => {
    return createTrack.id;
  });
}

export default {
  getTrackList,
  storeTrack,
  deleteTrack
};
