import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';

import { addFlightLogData } from '../actions/dataActions';
import parser from '../utils/parser';

const styles = StyleSheet.create({
  button: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
  },
});

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleOnDrop(files) {
    const { dispatch } = this.props;
    parser(files[0], (data) => {
      dispatch(addFlightLogData(data));
    });
  }

  render() {
    return (
      <div>
        <h1>DashboardContainer</h1>
        <Dropzone
          className={css(styles.button)}
          onDrop={this.handleOnDrop}
          multiple={false}
          accept=".txt"
        >
          <FloatingActionButton>
            <UploadIcon />
          </FloatingActionButton>
        </Dropzone>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DashboardContainer);
