import React from "react";

const LoginForm = ({
  username,
  userhandle,
  password,
  passwordHandle,
  loginHandle,
}) => {
  const handleUserChange = (event) => {
    userhandle(event.target.value);
  };
  const handlePasswordChange = (event) => {
    passwordHandle(event.target.value);
  };
  return (
    <div>
      <form onSubmit={loginHandle}>
        <p>
          Username:
          <input type="text" value={username} onChange={handleUserChange} />
        </p>
        <p>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
