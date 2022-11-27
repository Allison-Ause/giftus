import useGifts from '../hooks/useGifts.js';
import Gift from './Gift.js';
import NewGiftForm from './NewGiftForm.js';

export default function HomePage() {
  const { gifts, setGifts } = useGifts();
  return (
    <>
      <NewGiftForm />
      <div>
        <h1>This is where the data is!</h1>
        <div>
          {gifts.map((gift) => (
            <Gift key={gift.id} {...gift} />
          ))}
        </div>
      </div>
    </>
  );
}
