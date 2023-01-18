export function getUnit(attr: string) {
  let unit = "";
  switch (attr) {
    case "temp":
      unit = "°C";
      break;
    case "humi":
      unit = "%";
      break;
    case "co2":
      unit = "ppm";
      break;
    case "pm01":
      unit = "㎍/m³";
      break;
    case "pm10":
      unit = "㎍/m³";
      break;
    case "pm25":
      unit = "㎍/m³";
      break;
    case "tvoc":
      unit = "ppb";
      break;
    default:
      unit = "unit";
      break;
  }

  return unit;
}
