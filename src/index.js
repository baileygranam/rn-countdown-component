import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import ProgressCircle from 'react-native-progress-circle'
import PropTypes from 'prop-types'

class CountDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: props.seconds,
      play: props.play,
    }

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
    if (play && timer > 0) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
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

CountDown.propTypes = {
  seconds: PropTypes.number.isRequired,
  play: PropTypes.bool,
  format: PropTypes.instanceOf(Array),
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  radius: PropTypes.number,
}

CountDown.defaultProps = {
  play: true,
  format: ['hours', 'minutes', 'seconds'],
  strokeColor: 'black',
  strokeWidth: 5,
  radius: 75,
}

export default CountDown
