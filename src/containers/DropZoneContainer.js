import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';

import { addFlightLogData } from '../actions/dataActions';
import parser from '../utils/parser';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    border: '5px dashed #dddddd',
    borderRadius: 10,
    height: 'calc(100% - 40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#cccccc',
  },
  content: {
    textAlign: 'center',
  },
  text: {
    display: 'block',
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  icon: {
    width: 100,
    height: 100,
    display: 'block',
  },
});

class DropZoneContainer extends Component {
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
      <Dropzone
        className={css(styles.container)}
        onDrop={this.handleOnDrop}
        multiple={false}
        accept=".txt"
        activeStyle={{ backgroundColor: '#fafafa' }}
      >
        <div className={css(styles.content)}>
          <UploadIcon
            color="#cccccc"
            style={{ width: 100, height: 100 }}
          />
          <span className={css(styles.text)}>Drag & Drop a flight log</span>
          <RaisedButton primary label="or select a file" />
        </div>
      </Dropzone>
    );
  }
}

DropZoneContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DropZoneContainer);
