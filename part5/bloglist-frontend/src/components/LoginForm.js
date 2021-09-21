import React from "react";

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
  );
};



export default LoginForm
