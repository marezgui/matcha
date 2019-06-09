import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

// const StyledSlider = withStyles({
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid #de235b',
//     '&$focused, &:hover': {
//       boxShadow: `0px 0px 0px ${8}px ${fade('#de235b', 0.16)}`,
//     },
//     '&$activated': {
//       boxShadow: `0px 0px 0px ${8 * 1.5}px ${fade('#de235b', 0.16)}`,
//     },
//     '&$jumped': {
//       boxShadow: `0px 0px 0px ${8 * 1.5}px ${fade('#de235b', 0.16)}`,
//     },
//   },
//   track: {
//     backgroundColor: '#de235b',
//     height: 8,
//   },
//   trackAfter: {
//     backgroundColor: '#d0d7dc',
//   },
//   focused: {},
//   activated: {},
//   jumped: {},
// })(Slider);
