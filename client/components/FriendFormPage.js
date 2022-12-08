import Header from './Header.js';
import Loader from './Loader.js';
import FriendForm from './FriendForm.js';
import { useUser } from '../context/userContext.js';

export default function FriendFormPage() {
  const { user, loading } = useUser();

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

  return (
    <>
      <Header />
      {loading ? <Loader /> : <FriendForm />}
    </>
  );
}
