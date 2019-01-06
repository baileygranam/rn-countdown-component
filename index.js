import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import ProgressCircle from 'react-native-progress-circle'
import PropTypes from 'prop-types'

class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: props.seconds,
      play: props.play,
    }

    /**
     * Perform onStart action in the case that the component
     * play prop is set to true.
     */
    if (props.play) {
      props.onStart()
    }

    /* Action Binders. */
    this.tick = this.tick.bind(this)
    this.reset = this.reset.bind(this)
    this.toggle = this.toggle.bind(this)
    this.formatTime = this.formatTime.bind(this)
  }

  /**
   * Method to handle the countdown tick rate.
   */
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  /**
   * Clear the countdown interval.
   */
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  /**
   * Toggle pause/play on the countdown timer.
   */
  toggle() {
    const { play } = this.state
    const { onPause, onStart } = this.props

    /* Action to perform when pausing the countdown. */
    if (play) {
      onPause()
    /* Action to perform when starting/resuming the countdown. */
    } else {
      onStart()
    }

    this.setState(prevState => ({ play: !prevState.play }))
  }

  /**
   * Reset the timer.
   */
  reset() {
    const { seconds } = this.props
    this.setState({ timer: seconds, play: false })
  }

  /**
   * Method to decrement the timer every 1 second.
   */
  tick() {
    const { play, timer } = this.state
    const { onFinish } = this.props
    if (play && timer > 0) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    }

    /* Action to perform when the countdown has finished. */
    if (timer === 0) {
      onFinish()
    }
  }

  formatTime() {
    const { timer } = this.state
    const { format } = this.props
    const hours = Math.floor(timer / (60 * 60))
    const minutesDivisor = timer % (60 * 60)
    const minutes = Math.floor(minutesDivisor / 60)
    const secondsDivisor = minutesDivisor % 60
    const seconds = Math.ceil(secondsDivisor)

    const obj = {
      hours: hours > 9 ? hours : `0${hours}`,
      minutes: minutes > 9 ? minutes : `0${minutes}`,
      seconds: seconds > 9 ? seconds : `0${seconds}`,
    }

    const time = format.map(key => obj[key])

    const result = (
      <Text style={{ fontSize: 20 }}>
        {time.map((value, index) => {
          if (time.length === index + 1) {
            return `${value} `
          }
          return `${value} : `
        })}
      </Text>
    )

    return result
  }

  render() {
    const { timer, play } = this.state
    const {
      strokeWidth, strokeColor, radius, seconds,
    } = this.props
    const time = this.formatTime()

    const PlayButton = props => (
      <Button
        block
        light
        rounded
        onPress={() => { this.toggle() }}
      >
        <Text>
          {(props.isPlaying) ? 'Pause' : 'Play'}
        </Text>
      </Button>
    )

    const ResetButton = () => (
      <Button
        block
        light
        rounded
        onPress={() => { this.reset() }}
      >
        <Text>
          Reset
        </Text>
      </Button>
    )

    return (
      <View>
        <ProgressCircle
          percent={(1 - (timer / seconds)) * 100}
          radius={radius}
          borderWidth={strokeWidth}
          color={strokeColor}
        >
          {time}
        </ProgressCircle>
        <View style={{ marginTop: 10 }}>
          {
            (timer > 0) ? <PlayButton isPlaying={play} /> : <ResetButton />
          }
        </View>
      </View>
    )
  }
}

Countdown.propTypes = {
  seconds: PropTypes.number.isRequired,
  play: PropTypes.bool,
  format: PropTypes.instanceOf(Array),
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  radius: PropTypes.number,
  onFinish: PropTypes.func,
  onPause: PropTypes.func,
  onStart: PropTypes.func,
}

Countdown.defaultProps = {
  play: true,
  format: ['hours', 'minutes', 'seconds'],
  strokeColor: 'black',
  strokeWidth: 5,
  radius: 75,
  onFinish: () => null,
  onPause: () => null,
  onStart: () => null,
}

export default Countdown
