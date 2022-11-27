import useGifts from '../hooks/useGifts.js';
import NewGiftForm from './NewGiftForm.js';

export default function HomePage() {
  const { gifts, setGifts } = useGifts();
  console.log('react gifts', gifts);
  return (
    <>
      <NewGiftForm />
      <div>
        <h1>This is where the data is!</h1>
        {gifts.map((gift) => (
          <div key={gift.id}>{gift.idea}</div>
        ))}
      </div>
    </>
  );
}
