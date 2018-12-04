import React from 'react';
import ReactDOM from 'react-dom';
// import Badge from 'wix-style-react/Badge';

class Root extends React.Component {
  state = {}

  componentDidMount() {
    import(/* webpackChunkName: "magicasync" */ 'wix-style-react/Badge').then(res => {
      console.log(res);
      this.setState({ AsyncBadge: res.default });
    });
  }

  render() {
    const { AsyncBadge } = this.state;
    if (!AsyncBadge) {
        return null
    }

    return <div>
      <AsyncBadge>Badge with awesome default blue style</AsyncBadge>
      </div>
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));