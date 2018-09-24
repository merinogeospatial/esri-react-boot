// NOTE
// This is a "special" react component that does not strictly play by
// React's rules.
//
// Conceptually, this component creates a "portal" in React by
// closing its render method off from updates (by simply rendering a div and
// never accepting re-renders) then reconnecting itself to the React lifecycle
// by listening for any new props (using componentWillReceiveProps)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as mapActions } from '../../redux/reducers/webscene';

import { injectGlobal } from 'styled-components';

injectGlobal`
    .map, #web-scene-view-container {
        height: 100%;
        width: 100%;
    }
`;

const containerID = "web-scene-view-container"

class WebScene extends Component {

  componentDidMount() {
      this.props.startMap(this.props.appConfig.webmapId, this.props.appConfig.mapOptions, this.props.user, containerID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Tell React to never update this component, that's up to us
    return false;
  }

  render() {
    return (
      <div ref="mapDiv" id={containerID} ></div>
    );
  }
}

const mapStateToProps = state => ({
    config: state.config,
    map: state.map
});

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
      ...mapActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (WebScene);
