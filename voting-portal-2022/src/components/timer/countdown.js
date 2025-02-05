import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Countdown = () => (
  <CountdownCircleTimer
    isPlaying
    duration={15}
    colors={'#218739'}
    size={60}
    strokeWidth={8}
    onComplete={()=> window.location.reload()}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
)

export default Countdown;