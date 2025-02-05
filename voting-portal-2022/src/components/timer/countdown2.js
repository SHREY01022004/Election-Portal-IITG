import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Countdown = () => (
  <CountdownCircleTimer
    isPlaying
    duration={5}
    colors={["#0eed42", "#0ec939", "#0cb032", "#04661b"]}
    colorsTime={[10, 6, 3, 0]}
    size={60}
    strokeWidth={8}
    onComplete={() => window.location.replace("/voting_portal")}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

export default Countdown;
