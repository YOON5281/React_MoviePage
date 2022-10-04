import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const selectCoin = (e) => {
    setSelectedCoin(e.target.value);
    console.log(e.target.value);
  };
  const [input, setInput] = useState("");
  const converter = (e) => setInput(e.target.value);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins List!{` (${coins.length}개)`}</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select onChange={selectCoin}>
          {coins.map((coin, index) => (
            <option key={index} value={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD{" "}
            </option>
          ))}
        </select>
      )}
      <hr />
      <label htmlFor="usd">달러($)</label>
      <input type="number" id="usd" onChange={converter} />
      <br />
      <br />

      {selectedCoin === "" ? null : (
        <span type="number" id="result">
          <span>전환결과 :</span>
          {input / selectedCoin}
          <span>개 구입 가능</span>
        </span>
      )}
    </div>
  );
}
export default App;
