import React from "react";
import PropTypes from 'prop-types';

const Notification = ({message,state}) => {
  const SuccessStyle = {
      color: 'green',
      backgroundColor: '#EFEFEF',
      fontSize: 21,
      border: '3px solid green',
      borderRadius: 3,
      padding: 5
  }
  const ErrorStyle = {
      color: 'red',
      backgroundColor: '#EFEFEF',
      fontSize: 21,
      border: '3px solid red',
      borderRadius: 3,
      padding: 5
  }
if (message === null) {
  return null;
}
return (
  <div>
    <p style={state ? SuccessStyle: ErrorStyle}>{message}</p>
  </div>
);
};
Notification.propTypes = {
  message: PropTypes.string.isRequired,
  style: PropTypes.bool.isRequired,
}

export default Notification;