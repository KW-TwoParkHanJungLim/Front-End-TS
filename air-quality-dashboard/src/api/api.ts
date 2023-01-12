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

export function fetchGraph() {
  return fetch("/graph", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test",
      body: "I amd test",
      collection: "axr-inducwon",
      logtime: "2020-05-07",
      sensors: ["D865950434A0"],
      airData: "temp",
    }),
  }).then((res) => console.log(res));
}
