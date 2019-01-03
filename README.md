# React Native Countdown Component 
A light-weight countdown component for React Native

* [Getting Started](#getting-started)
* [Motivation](#motivation)
* [Props](#props)
* [License](#license)

## Getting Started

You can install the module via `npm`.

```
npm install rn-countdown-component --save
```

## Motivation

There is currently a lack in effective countdown timers for React Native applications. This module was designed for simplicity and to provide an easy way to implement a countdown component.

### Basic Usage
A very simple and minimal example of how to set up a countdown which counts down from 10 seconds.
```js
import React from 'react';
import ReactDOM from 'react-dom';
import CountDown from 'rn-countdown-component';

ReactDOM.render(
  <CountDown
    seconds={10}
  />,
  document.getElementById('root')
);
```

## Props

|Name|Type|Default|Description|
|:--|:--:|:-----:|:----------|
|[**seconds**](#seconds)|`number`|`required`|Length of countdown timer|
|[**play**](#play)|`boolean`|`true`|Countdown auto-start option|
|[**format**](#format)|`object`|`['hours', 'minutes', 'seconds']`|Format of time displayed on countdown component|
|[**strokeColor**](#strokeColor)|`string`|`black`|Color of stroke around the progress circle|
|[**strokeWidth**](#strokeWidth) |`number`|`5`|The width in pixels of the stroke around the progress circle|
|[**radius**](#radius)|`number`|`75`|Size of the progress circle|

### `seconds`
The `seconds` prop is the only required one and must be a `number`. This determines the time to count down from on the timer.

Valid values can be _(and more)_:
* `'30'` -- 30 seconds
* `'60'` -- 1 Minute
* `'120'` -- 2 Minutes

### `play`
Defines whether the countdown should start automatically or not. Defaults to `true`.

### `format`
The format of the time to display on the timer component. Allowed types are, 'hours', 'minutes', and 'seconds'.

### `strokeColor`
The `strokeColor` prop determines the color of the stroke of the progress circle. A `string` is the type.

Valid values can be _(and more)_:
* `'black'`
* `'#000'`

### `strokeWidth`
The `strokeWidth` prop determines the width of the stroke of the progress circle. A `number` is the type.

### `radius`
The `radius` prop determines the number of the stroke of the progress circle. A `number` is the type.

## License

MIT

[npm]: https://img.shields.io/npm/v/react-countdown-now.svg
[npm-url]: https://npmjs.com/package/react-countdown-now
