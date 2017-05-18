# input-moment [![Build Status](https://travis-ci.org/wangzuo/input-moment.svg?branch=master)](https://travis-ci.org/wangzuo/input-moment)
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

#### Default

``` javascript
<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  onSave={this.handleSave}
/>
```

#### Custom Icon

``` javascript
<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  onSave={this.handleSave}
  prevMonthIcon="fa fa-angle-left"
  nextMonthIcon="fa fa-angle-right"
  dateIcon="fa fa-calendar-o"
  timeIcon="fa fa-clock-o"
  saveIcon="fa fa-check"
/>
```

Check [app.js](https://github.com/wangzuo/input-moment/blob/master/example/app.js) for a working example.

### Development
- npm install
- npm start
- http://localhost:8888

### License
ISC
