import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import '../styles/track-container.css';

import api from '../helpers/api';
import TrackForm from '../components/TrackForm';
import TrackList from '../components/TrackList';

class TrackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStoredTrack: false,
      list: []
    };

    this.onStoreTrack = this.onStoreTrack.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    api.getTrackList().then((tracks) => {
      this.setState({list: tracks});
    });
  }

  onStoreTrack() {
    this.setState({hasStoredTrack: true});
    this.fetchList();
    NotificationManager.success('Track registered');
  }

  renderTrackForm() {
    const {hasStoredTrack} = this.state;

    if(hasStoredTrack) {
      return (
        <div className="alert alert-success">Track successfully registered</div>
      );
    }

    return (
      <div>
        <h2>Register a Track</h2>
        <TrackForm onStoreTrack={this.onStoreTrack} />
      </div>
    );
  }

  onDeleteItem(id) {
    api.deleteTrack(id).then(() => {
      NotificationManager.info('Track deleted');
      this.fetchList();
    });
  }

  render() {
    const {list} = this.state;

    return (
      <div className="track-container">
        <section>
          {this.renderTrackForm()}
        </section>
        <section>
          <h2>Tracks</h2>
          <TrackList onDeleteItem={this.onDeleteItem} data={list} />
        </section>
        <NotificationContainer />
      </div>
    );
  }
}

export default TrackContainer;
