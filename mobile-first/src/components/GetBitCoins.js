import React, { Component } from 'react'
import {Dimmer,Loader,} from 'semantic-ui-react';

class GetBitCoins extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      bitCoinDes: "",
      bitCoinUsd: "",
      isLoaded: false,
    }
  }

  async search() {
    try {
        let bitCoinVal = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`)
        .then(result => result.json())
        this.setState({
            bitCoinDes: bitCoinVal.disclaimer,
            bitCoinUsd: bitCoinVal.bpi.USD.rate,
            isLoaded: true,
          })
    } 
    catch(error) {
        console.warn(`We have an error here: ${error}`)
    }
  };
  
  componentDidMount() {
      this.search();
    } 

  render() {
    if(!this.state.isLoaded) {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </div>
        )
    } else {
      return (
        <React.Fragment>
          <h1>{this.state.bitCoinDes}</h1>
          <h1>
            <span>&#36;</span>{this.state.bitCoinUsd}
          </h1>
        </React.Fragment>
      )
    }
  }
}

export default GetBitCoins