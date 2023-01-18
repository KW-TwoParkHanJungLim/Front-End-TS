export function getStatus(score: number) {
  const ret = {
    state: [""],
    color: [""],
  };
  if (score >= 85) {
    ret.state = ["매우좋음"];
    ret.color = ["#00a8ff"];
  } else if (score >= 70) {
    ret.state = ["좋음"];
    ret.color = ["#4cd137"];
  } else if (score >= 50) {
    ret.state = ["보통"];
    ret.color = ["#F4CD43"];
  } else if (score >= 40) {
    ret.state = ["나쁨"];
    ret.color = ["#ED6C21"];
  } else {
    ret.state = ["매우나쁨"];
    ret.color = ["#DF3F3E"];
  }

  return ret;
}
