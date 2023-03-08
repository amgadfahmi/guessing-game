import React, { MouseEventHandler, useState } from 'react';

interface LoginProps {
  onLogin: (user: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [user, setUser] = useState('');

  const handleLogin = () => {
    onLogin(user);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4  justify-items-center">
        <div className="text-center h-40">Welcome</div>
        <div className="text-center text-xs">Please insert you name</div>
        <input
          type="text"
          placeholder="Your name..."
          className="input input-bordered w-56 max-w-xs"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button className="btn btn-active w-56" onClick={handleLogin}>
          Enter
        </button>
      </div>
    </>
  );
};

export default Login;
