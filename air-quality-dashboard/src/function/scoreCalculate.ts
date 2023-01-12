function getSeason(month: number) {
  if (month === 12 || (month >= 1 && month <= 2)) return "겨울";
  else if ((month >= 3 && month <= 5) || (month >= 9 && month <= 11))
    return "봄가을";
  else return "여름";
}

export function scorePM25(avg = 0) {
  let score = 100;
  score -= avg * 0.2;

  if (avg < 15) {
    score -= 0;
  } else if (avg >= 15 && avg <= 35) {
    score -= 10;
  } else if (avg >= 36 && avg <= 75) {
    score -= 40;
  } else {
    score -= 50;
  }
  return Number(score.toFixed(0));
}

export function scorePM10(avg = 0) {
  let score = 100;
  score -= avg * 0.1;

  if (avg < 30) {
    score -= 0;
  } else if (avg >= 30 && avg <= 80) {
    score -= 10;
  } else if (avg >= 81 && avg <= 150) {
    score -= 40;
  } else {
    score -= 50;
  }
  return Number(score.toFixed(0));
}

export function scoreTemp(avg = 0, month: number) {
  let score = 100;
  let bestAvg = 0;

  if (getSeason(month) === "겨울") {
    bestAvg = 20;
  } else if (getSeason(month) === "봄가을") {
    bestAvg = 21;
  } else {
    bestAvg = 25;
  }

  let diff = avg - bestAvg;
  let stk = 2;
  if (diff < 0) diff *= -1;

  for (let i = 0; i < diff; i++) {
    score -= stk;
    stk = score / 10;
  }

  return Number(score.toFixed(0));
}

export function scoreHumi(avg = 0, month: number) {
  let score = 100;
  let bestAvg = 0;

  if (getSeason(month) === "겨울") {
    bestAvg = 40;
  } else if (getSeason(month) === "봄가을") {
    bestAvg = 50;
  } else {
    bestAvg = 60;
  }

  let diff = avg - bestAvg;
  let stk = 1;
  if (diff < 0) diff *= -1;

  for (let i = 0; i < diff; i++) {
    score -= stk;
    stk = score > 50 ? 3 : 1;
  }
  return score;
}

export function scoreCo2(avg = 0) {
  let score = 100;

  if (avg < 350) return score;
  else if (avg >= 350 && avg <= 460) {
    score -= avg * 0.01;
  } else if (avg > 460 && avg <= 700) {
    score -= avg * 0.01 + 10;
  } else if (avg > 700 && avg <= 1000) {
    score -= avg * 0.01 + 18;
  } else if (avg > 1000 && avg <= 2000) {
    score -= avg * 0.01 + 32;
  } else if (avg > 2000 && avg < 5000) {
    score -= avg * 0.01 + 44;
  } else {
    score = 0;
  }

  return Number(score.toFixed(0));
}

export function scoreTvoc(avg = 0) {
  let score = 100;
  score -= avg * 0.01;

  if (avg < 60) return score;
  else if (avg >= 60 && avg <= 200) {
    score -= 10;
  } else if (avg > 200 && avg <= 600) {
    score -= 20;
  } else if (avg > 600 && avg <= 2000) {
    score -= 30;
  } else {
    score -= 40;
  }

  return Number(score.toFixed(0));
}
