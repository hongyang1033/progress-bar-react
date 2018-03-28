import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Button, ProgressBar, FormGroup, FormControl, ButtonGroup } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      bars: [],
      limit: ''
    }
  }
  componentDidMount() {
    axios.get(`http://pb-api.herokuapp.com/bars`)
      .then(({ data }) => {
        this.setState({
          buttons: data.buttons,
          bars: data.bars,
          limit: data.limit,
          active: 0
        })
      })
  }

  onPick(e) {
    this.setState({ active: this.inputEl.value });
  }

  changeProgress(item) {
    const bars = [...this.state.bars];
    if(bars[this.state.active] + item <= 0) {
      bars[this.state.active] = 0
    } else {
      bars[this.state.active] = bars[this.state.active] + item
    }

    this.setState({
      bars
    })
  }

  render() {
    const { buttons, bars, limit } = this.state
    return (
      <div className="App container">
        <h1 className="text-center">Limit: {limit}</h1>
        {
          bars.map((item, index) => {
            return (
              <div key={index}>
                <div className="text-center">{item}%</div>
                <ProgressBar bsStyle={item <  limit ? `info` : `danger`} key={index} now={item} />
              </div>
            )
          })
        }
        <FormGroup controlId="formControlsSelect">
          <FormControl componentClass="select" placeholder="select" onChange={this.onPick.bind(this)} inputRef={el => this.inputEl = el}>
            {
              bars.map((item, index) => {
                return <option key={index} value={index}>{`Progress Bar ${index + 1}`}</option>
              })
            }
          </FormControl>
        </FormGroup>
        <ButtonGroup>
        {
          buttons.map((item, index) => {
            return <Button bsSize="large" bsStyle={item > 0 ? `primary` : `warning`} key={index} onClick={this.changeProgress.bind(this, item)}>{item}</Button>
          })
        }
        </ButtonGroup>
      </div>
    );
  }
}

export default App;
