const NewsletterCards = () => {
  return (
    <div className="bg-white border rounded-lg p-5 mt-5">
      <h3 className="font-bold mb-4">
        Medical Newsletter
      </h3>

      <input
        type="email"
        placeholder="Enter email"
        className="border rounded w-full p-2"
      />

      <button className="bg-blue-700 text-white w-full mt-3 py-2 rounded">
        Subscribe
      </button>
    </div>
  );
};

export default NewsletterCards;