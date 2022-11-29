import { addGift, getAllGifts } from '../services/gift-utils.js';

export default function NewGiftForm({ setGifts }) {
  const handleAddGift = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGift = {
      idea: formData.get('idea'),
      recipient: formData.get('recipient'),
      link: formData.get('link'),
      price: formData.get('price'),
      occasion: formData.get('occasion'),
    };

    await addGift(newGift);
    const giftList = await getAllGifts();
    setGifts(giftList);
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleAddGift}>
        <label>
          Gift Idea:
          <input type="text" name="idea" />
        </label>
        <label>
          For:
          <input type="text" name="recipient" />
        </label>
        <label>
          Link:
          <input type="text" name="link" />
        </label>
        <label>
          Price:
          <input type="text" name="price" />
        </label>
        <label>
          Occasion:
          <input type="text" name="occasion" />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
