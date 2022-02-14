import { RiCelsiusFill as Celsius } from "react-icons/ri";
import { RiFahrenheitFill as Fahrenheit } from "react-icons/ri";

export default function Units({ units }) {
  if (units === "metric") return "°C";
  return "°F";
}
