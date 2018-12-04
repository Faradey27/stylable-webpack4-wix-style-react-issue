import React from 'react';
import ReactDOM from 'react-dom';
import 'wix-style-react/Label';
import(/* webpackChunkName: "magicasync" */ 'wix-style-react/Badge');

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

    return <AsyncBadge>Badge with awesome default blue style</AsyncBadge>
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));