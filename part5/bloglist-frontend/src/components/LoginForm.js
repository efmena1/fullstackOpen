import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  userhandle,
  password,
  passwordHandle,
  onSubmit,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>
          Username:
          <input type="text" value={username} onChange={userhandle} />
        </p>
        <p>
          Password:
          <input
            type="password"
            value={password}
            onChange={passwordHandle}
          />
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  userhandle: PropTypes.func.isRequired,
  passwordHandle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}



export default LoginForm
