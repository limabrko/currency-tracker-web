import { request } from 'graphql-request'

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

  return request(API_URL, query);
}

export default {
  getTrackList
};
