import React, {Component} from 'react';
import moment from 'moment';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/track-form.css';

import currencies from '../helpers/currencies';
import utils from '../helpers/utils';
import api from '../helpers/api';

const currenciesOptions = currencies.map((currency) => {
  return {
    value: currency.cc,
    label: `${currency.cc} - ${currency.name}`
  };
});

let isFetching = false;

class TrackForm extends Component {
  constructor(props) {
    super(props);

    const oneMonthAfter = moment().add(1, 'month');

    this.state = {
      fromCurrency: currenciesOptions.find((currency) => currency.value === 'BRL'),
      toCurrency: currenciesOptions.find((currency) => currency.value === 'KRW'),
      fromPrice: '1',
      toPrice: '1,000',
      until: oneMonthAfter.toDate(),
      email: '',
      isSelecting: null,
      showCalendar: false
    };

    this.selectRefs = {
      from: null,
      to: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();
    
    if(isFetching) {
      return;
    }

    const {
      fromCurrency,
      toCurrency,
      fromPrice,
      toPrice,
      until,
      email
    } = this.state;

    const trackData = {
      fromCurrency: fromCurrency.value,
      toCurrency: toCurrency.value,
      fromPrice: parseInt(fromPrice, 10),
      toPrice: parseInt(toPrice, 10),
      until: until.toISOString(),
      email
    };
    
    isFetching = true;
    api.storeTrack(trackData).then(() => {
      isFetching = false;
      this.props.onStoreTrack();
    });
  }

  onChange(inputName, newValue) {
    this.setState({ 
      [inputName]: newValue,
      isSelecting: false,
      showCalendar: false
    });
  }

  onClickCurrencyCover(origin) {
    this.setState({isSelecting: origin});
    setTimeout(() => {
      this.selectRefs[origin].focus();
    });
  }

  render() {
    const {
      fromCurrency,
      toCurrency,
      fromPrice,
      toPrice,
      until,
      isSelecting,
      showCalendar,
      email
    } = this.state;

    const fromWrapClasses = ['input-wrap'];
    if(isSelecting === 'from') {
      fromWrapClasses.push('selecting');
    }

    const toWrapClasses = ['input-wrap'];
    if(isSelecting === 'to') {
      toWrapClasses.push('selecting');
    }

    return (
      <form className="track-form" onSubmit={this.onSubmit}>
        <div className="currency-group">
          <label htmlFor="fromPrice">When</label>
          <div className={fromWrapClasses.join(' ')}>
            <input 
              id="fromPrice"
              type="text" 
              className="input-price"
              value={fromPrice} 
              onChange={(evt) => this.onChange('fromPrice', utils.formatNumber(evt.currentTarget.value))}
              />
            <button 
              type="button"
              onClick={() => this.onClickCurrencyCover('from')}
              className="btn-currency__cover">
              {fromCurrency.value}
              <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" fill="#fff"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </button>
            <Select 
              ref={ref => {
                this.selectRefs.from = ref;
              }}
              onBlur={() => this.setState({isSelecting: null})}
              menuIsOpen={true}
              value={fromCurrency}
              className="input-currency"
              classNamePrefix="input-currency"
              onChange={(value) => this.onChange('fromCurrency', value)}
              options={currenciesOptions} 
              />
          </div>
        </div>
        <div className="currency-divider" />
        <div className="currency-group currency-group__to">
          <label htmlFor="toPrice">has exchange rate of</label>
          <div className={toWrapClasses.join(' ')}>
            <input 
              id="toPrice"
              type="text" 
              className="input-price"
              value={toPrice} 
              onChange={(evt) => this.onChange('toPrice', utils.formatNumber(evt.currentTarget.value))}
              />
            <button 
              type="button"
              onClick={() => this.onClickCurrencyCover('to')}
              className="btn-currency__cover">
              {toCurrency.value}
              <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" fill="#fff"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </button>
            <Select 
              ref={ref => {
                this.selectRefs.to = ref;
              }}
              menuIsOpen={true}
              onBlur={() => this.setState({isSelecting: null})}
              value={toCurrency}
              className="input-currency"
              classNamePrefix="input-currency"
              onChange={(value) => this.onChange('toCurrency', value)}
              options={currenciesOptions} 
              />
          </div>
        </div>
        <div className="input-group">
          <label>Track until</label>
          <button
            className="input-control"
            type="button"
            onClick={() => this.setState({showCalendar: !showCalendar})}>
              {until.toDateString()}
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" className="svg-inline--fa fa-calendar fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z"></path></svg>
          </button>
          <div
            className="calendar-wrap"
            style={{display: showCalendar ? '' : 'none'}}>
            <Calendar
              calendarType="US"
              onChange={(date) => this.onChange('until', date)}
              value={until}
              />
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            className="input-control"
            type="email"
            value={email}
            required
            onChange={(evt) => this.setState({email: evt.currentTarget.value})} />
        </div>
        <div className="input-group">
          <button className="btn">Save</button>
        </div>
      </form>
    );
  }
}

export default TrackForm;
