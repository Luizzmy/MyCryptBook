import React, {useEffect, useState} from 'react';
import axios from 'axios'

let baseURL= 'http://rest-sandbox.coinapi.io/v1/ohlcv/GEMINI_SPOT_ETH_USD/latest?period_id=1HRS'

function Eth() {
  const [ethereum, setEthereum]=useState(null)
  
  useEffect(()=>{
    async function getEthereum(){
      const {data}=await axios.get(baseURL, {headers:{'X-CoinAPI-Key':'977F32DF-8B2A-4AB3-B2EC-6997426FE65D'}})
      console.log(data)
      setEthereum(data)
    }
    getEthereum()
  },[])
  return (
    <div>
      <h1>Eth test</h1>
    </div>
  );
}

export default Eth;


// sdfnsdfsdfsdfsdfsd