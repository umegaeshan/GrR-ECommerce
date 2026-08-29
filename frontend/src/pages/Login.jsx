import React from 'react'

function Login() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input type="text" placeholder="Enter your name" required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input type="password" placeholder="Enter password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login