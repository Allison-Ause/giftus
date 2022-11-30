import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import SignInForm from './SignInForm.js';
import SignUpForm from './SignUpForm.js';

export default function AuthPage() {
  const { type: authMethod } = useParams();
  const { user, loading } = useUser();

  if (user) return <Navigate to="/" replace />;

  return (
    <div>
      <p>Nice work, sweetheart!</p>
      {authMethod === 'sign-in' ? <SignInForm /> : <SignUpForm />}
    </div>
  );
}
