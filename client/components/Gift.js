import { deleteGift, getAllGifts } from '../services/gift-utils.js';

export default function Gift({
  id,
  idea,
  price,
  occasion,
  setGifts,
}) {
  // make this flex box with column of individual gift rows
  const handleDelete = async () => {
    await deleteGift(id);
    const giftList = await getAllGifts();
    setGifts(giftList);
  };

  return (
    <div>
      {/* conditional rendering not displaying as Link. Why? */}
      {/* {gift.url ? (
        <Link to={gift.url}>{gift.idea}</Link>
      ) : (
        <h1>{gift.idea}</h1>
      )} */}
      <h2>{idea}</h2>
      <h2>{`$${price}`}</h2>
      <h2>{occasion}</h2>
      <button onClick={handleDelete}>x</button>
    </div>
  );
}
