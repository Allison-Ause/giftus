import { addGift } from '../services/gift-utils.js';

export default function NewGiftForm() {
  const handleAddGift = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGift = {
      idea: formData.get('idea'),
      for: formData.get('for'),
      link: formData.get('link'),
      price: formData.get('price'),
      occasion: formData.get('occasion'),
    };
    console.log('newGift', newGift);
    await addGift(newGift);
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
          <input type="text" name="for" />
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
