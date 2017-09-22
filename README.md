# input-moment 
[![npm](https://img.shields.io/npm/v/input-moment.svg)](https://www.npmjs.com/package/input-moment)
[![Build Status](https://travis-ci.org/wangzuo/input-moment.svg?branch=master)](https://travis-ci.org/wangzuo/input-moment)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

React datetime picker powered by [momentjs](http://momentjs.com)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker.

The icon is from [ionicons](http://ionicons.com/).

### Installation
``` sh
npm i input-moment --save
```

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Demo
http://wangzuo.github.io/input-moment

### Usage
``` javascript
<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  onSave={this.handleSave}
  minStep={1} // default
  hourStep={1} // default
  prevMonthIcon="ion-ios-arrow-left" // default
  nextMonthIcon="ion-ios-arrow-right" // default
/>
```
Check [app.js](https://github.com/wangzuo/input-moment/blob/master/example/app.js) for a working example.

### Development
- npm install
- npm start
- http://localhost:8080

### License
ISC
