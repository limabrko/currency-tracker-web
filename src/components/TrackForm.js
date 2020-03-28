import React, {Component} from 'react';
import moment from 'moment';

class TrackForm extends Component {
  constructor(props) {
    super(props);

    const oneMonthAfter = moment().add(1, 'month');

    this.state = {
      fromCurrency: '',
      toCurrency: '',
      fromPrice: 1,
      toPrice: 1000,
      until: oneMonthAfter
    };
  }

  render() {
    const {
      fromCurrency,
      toCurrency,
      fromPrice,
      toPrice,
      until
    } = this.state;

    return (
      <form className="track-list">
        <div>
          <label>From Currency</label>
          <input type="text" value={fromCurrency} /> 
        </div>
        <div>
          <label>Price</label>
          <input type="text" value={fromPrice} /> 
        </div>
        <div>
          <label>To Currency</label>
          <input type="text" value={toCurrency} /> 
        </div>
        <div>
          <label>Price</label>
          <input type="text" value={toPrice} /> 
        </div>
        <div>
          <label>Limit Date</label>
          <input type="text" value={until} /> 
        </div>
      </form>
    );
  }
}

export default TrackForm;
