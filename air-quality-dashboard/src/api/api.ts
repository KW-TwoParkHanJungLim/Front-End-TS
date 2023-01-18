import Axios from "axios";
import { responseInterceptor } from "http-proxy-middleware";

export function fetchCoins() {
  return fetch(`https://api.coinpaprika.com/v1/coins`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(
    (response) => response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(
    (response) => response.json()
  );
}

//2020-05-07
export function fetchSensorAvg(date: string) {
  return fetch(
    `/details?userId=axr-inducwon&date=${date}&id=D865950434A0`
  ).then((response) => {
    if (response.status !== 200) return undefined;
    else return response.json();
  });
}

export function fetchGraph(
  collection: string,
  logTime: string,
  sensorIds: string[],
  attr: string
) {
  let url = `/graph?collection=${collection}&logTime=${logTime}`;
  for (let x of sensorIds) {
    url += `&sensors=${x}`;
  }
  url += `&airData=${attr}`;

  return fetch(url).then((res) => {
    if (res.status !== 200) return undefined;
    else return res.json();
  });
}

export function fetchGraphSensorList(userId: string) {
  return fetch(`/graph/sensors?userId=${userId}`).then((res) => {
    console.log(res);
    return res.json();
  });
}
