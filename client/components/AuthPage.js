import { useParams } from 'react-router-dom';
import SignUpForm from './SignUpForm.js';

export default function AuthPage() {
  const { type: authMethod } = useParams();

  return (
    <div>
      <p>Nice work, sweetheart!</p>
      <SignUpForm />
    </div>
  );
}
