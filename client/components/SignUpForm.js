import { Link } from 'react-router-dom';
import { signUpUser } from '../services/user-utils.js';

export default function SignUpForm() {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newUser = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    await signUpUser(newUser);
  };

  return (
    <>
      <h1>Sign-Up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          First Name:
          <input type="text" name="firstName" />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/auth/sign-in">
        Already have an account? Sign In.
      </Link>
    </>
  );
}
