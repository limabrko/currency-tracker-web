import React, {Component} from 'react';

import TrackItem from './TrackItem';

class TrackList extends Component {
  render() {
    const {data} = this.props;

    return (
      <ul className="track-list">
        {
          data.map((trackData) => <TrackItem data={trackData} key={trackData.id} />)
        }
      </ul>
    );
  }
}

export default TrackList;
