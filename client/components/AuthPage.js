import { useParams } from 'react-router-dom';
import SignInForm from './SignInForm.js';
import SignUpForm from './SignUpForm.js';

export default function AuthPage() {
  const { type: authMethod } = useParams();

  return (
    <div>
      <p>Nice work, sweetheart!</p>
      {authMethod === 'sign-in' ? <SignInForm /> : <SignUpForm />}
    </div>
  );
}
