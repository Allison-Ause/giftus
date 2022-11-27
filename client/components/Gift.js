export default function Gift(gift) {
  console.log('gift', gift);

  // make this flex box with column of individual gift rows
  return (
    <div>
      {/* conditional rendering not displaying as Link. Why? */}
      {/* {gift.url ? (
        <Link to={gift.url}>{gift.idea}</Link>
      ) : (
        <h1>{gift.idea}</h1>
      )} */}
      <h2>{gift.idea}</h2>
      <h2>{`$${gift.price}`}</h2>
      <h2>{gift.occasion}</h2>
    </div>
  );
}
