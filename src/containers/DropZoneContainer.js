import React, { Component } from 'react';
import classNames from 'classnames';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import theme from '../theme';

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
    fontSize: '6em',
    display: 'block',
  },
});

class DropZoneContainer extends Component {

  static onDrop() {
    // @todo
  }

  render() {
    return (
      <Dropzone
        className={css(styles.container)}
        onDrop={this.onDrop}
        activeStyle={{ backgroundColor: '#fafafa' }}
      >
        <div className={css(styles.content)}>
          <FontIcon
            className={classNames(
              css(styles.icon),
              'fa fa-download',
            )}
            color="#cccccc"
          />
          <span className={css(styles.text)}>Drag & Drop a flight log</span>
          <RaisedButton primary label="or select a file" onClick={this.onOpenClick} />
        </div>
      </Dropzone>
    );
  }
}

export default DropZoneContainer;
