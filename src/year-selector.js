var React = require('react');

module.exports = React.createClass({
  render() {

    return (
      <select value={this.props.selectedYear} onChange={this.props.onChange}>
        {this.options().map((e, i) =>
          <option key={i} value={e}>{e}</option>
        )}
      </select>
    );
  },

  options() {
    var list = [];
    for (var x = this.props.fromYear; x >= this.props.toYear; x--) {
      list.push(x);
    }
    return list;
  }
});
