import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useGifts from '../hooks/useGifts.js';
import Gift from './Gift.js';
import NewGiftForm from './NewGiftForm.js';

export default function HomePage() {
  const { gifts, setGifts } = useGifts();
  const { user } = useUser();
  console.log(user);
  if (!user) return <Navigate to="/auth/sign-in" replace />;

  return (
    <>
      <NewGiftForm />
      <div>
        <h1>This is where the data is!</h1>
        <div>
          {gifts.map((gift) => (
            <Gift key={gift.id} {...gift} setGifts={setGifts} />
          ))}
        </div>
      </div>
    </>
  );
}
