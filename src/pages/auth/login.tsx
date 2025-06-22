export const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      {/* Add login form or components here */}
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
