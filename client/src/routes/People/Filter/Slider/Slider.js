import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import { Slider } from 'antd';

// import React from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Slider from '@material-ui/lab/Slider';
// import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles({
  root: {
    width: 250,
    padding: 7,
  },
});

const CustomizedSlider = (props) => {
  const { changed } = props;
  const classes = useStyles();

  const onChange = (value) => {
    changed(value);
  };

  return (
    <Paper className={classes.root}>
      <Slider tipFormatter={null} range defaultValue={[0, 100]} onChange={onChange} />
    </Paper>
  );
};

export default CustomizedSlider;
