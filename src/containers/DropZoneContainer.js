import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropzone from 'react-dropzone';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import UploadIcon from 'material-ui-icons/FileUpload';

import { withStyles } from 'material-ui/styles';

import { addFlightLogData } from '../actions/dataActions';
import parser from '../utils/parser';

const styles = {
  container: {
    margin: 24,
    border: '5px dashed #dddddd',
    borderRadius: 10,
    boxSizing: 'border-box',
    height: 'calc(100% - 48px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#cccccc',
  },
  content: {
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    display: 'block',
  },
};

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
    const { classes } = this.props;
    return (
      <Dropzone
        className={classes.container}
        onDrop={this.handleOnDrop}
        multiple={false}
        accept=".txt"
        activeStyle={{ backgroundColor: '#fafafa' }}
      >
        <div className={classes.content}>
          <UploadIcon color="#cccccc" style={{ width: 100, height: 100 }} />
          <Typography type="headline" color="inherit" gutterBottom>
            Drag & Drop a flight log
          </Typography>
          <Button raised color="primary">
            or select a file
          </Button>
        </div>
      </Dropzone>
    );
  }
}

DropZoneContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withStyles(styles)(connect()(DropZoneContainer));
