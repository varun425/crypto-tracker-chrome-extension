import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import './Popup.css';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Popup = () => {
  const [prices, setPrices] = useState({ BTC: null, ETH: null });
  const [priceHistory, setPriceHistory] = useState({ BTC: [], ETH: [] });
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      const data = await response.json();
      setPrices({
        BTC: data.bitcoin.usd,
        ETH: data.ethereum.usd,
      });
    } catch (error) {
      console.error('Error fetching current prices:', error);
    }
    setLoading(false);
  };

  const fetchPriceHistory = async () => {
    try {
      const btcResponse = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7');
      const btcData = await btcResponse.json();

      const ethResponse = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7');
      const ethData = await ethResponse.json();

      setPriceHistory({
        BTC: btcData.prices.map(([timestamp, price]) => ({ timestamp, price })),
        ETH: ethData.prices.map(([timestamp, price]) => ({ timestamp, price })),
      });
    } catch (error) {
      console.error('Error fetching price history:', error);
    }
  };

  useEffect(() => {
    fetchPrices();
    fetchPriceHistory();
  }, []);

  const prepareChartData = (data) => {
    return {
      labels: data.map(item => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: 'Price (USD)',
          data: data.map(item => item.price),
          borderColor: '#00C853', 
          backgroundColor: 'rgba(0, 200, 83, 0.1)',
          fill: true,
          tension: 0.4, 
          borderWidth: 2,
          pointRadius: 4, 
          pointBackgroundColor: '#fff',
          pointBorderColor: '#00C853',
          pointBorderWidth: 2,
          hoverBackgroundColor: '#00C853',
          hoverBorderColor: '#fff',
        },
      ],
    };
  };

  return (
    <div className="popup-container">
      <h1 className="popup-title">Crypto Price Tracker</h1>

      {loading ? (
        <div className="loading-container">
          <div className="loading">Loading...</div>
        </div>
      ) : (
        <>
          <div className="prices">
            <div className="price-item">
              <h3>Bitcoin (BTC)</h3>
              <p>${prices.BTC}</p>
            </div>
            <div className="price-item">
              <h3>Ethereum (ETH)</h3>
              <p>${prices.ETH}</p>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Price Trend (7 Days)</h3>
            <div className="chart">
              <Line data={prepareChartData(priceHistory.BTC)} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="chart">
              <Line data={prepareChartData(priceHistory.ETH)} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <button className="refresh-btn" onClick={() => { fetchPrices(); fetchPriceHistory(); }}>
            Refresh
          </button>
        </>
      )}
    </div>
  );
};

export default Popup;
