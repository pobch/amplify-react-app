import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import './App.css'

function App(props) {
  const [input, setInput] = useState({ limit: 5, start: 0 })

  function updateInputValues(type, value) {
    setInput({ ...input, [type]: value })
  }

  const [coins, setCoins] = useState([])

  async function fetchCoins() {
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
    setCoins(data.coins)
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      {coins.map((coin, index) => {
        return (
          <div key={index}>
            <h2>
              {coin.name} - {coin.symbol}
            </h2>
            <h5>${coin.price_usd}</h5>
          </div>
        )
      })}
      <input placeholder="limit" onChange={(e) => updateInputValues('limit', e.target.value)} />
      <input placeholder="start" onChange={(e) => updateInputValues('start', e.target.value)} />
      <button onClick={fetchCoins}>Fetch Coins</button>
    </div>
  )
}

export default App
