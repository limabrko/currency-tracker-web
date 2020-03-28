import React, {Component} from 'react';

import api from '../helpers/api';
import TrackForm from '../components/TrackForm';
import TrackList from '../components/TrackList';

class TrackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentDidMount() {
    api.getTrackList().then((data) => {
      this.setState({list: data.tracks});
    });
  }

  render() {
    const {list} = this.state;

    return (
      <div>
        <h2>Register a Track</h2>
        <TrackForm />
        <h2>Tracks</h2>
        <TrackList data={list} />
      </div>
    );
  }
}

export default TrackContainer;
