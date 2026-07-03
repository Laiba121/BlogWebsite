const CommunityDiscussion = () => {
  return (
    <div className="bg-white border rounded-lg p-5 mt-5">
      <h2 className="font-semibold text-lg mb-5">
        Community Discussions
      </h2>

      <div className="space-y-4">
        <div className="border-b pb-4">
          <h4 className="font-semibold">
            Dr. Sarah Reed
          </h4>

          <p className="text-gray-600">
            Always ensure patients check for hidden
            paracetamol in cold medicines.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            John Doe
          </h4>

          <p className="text-gray-600">
            Is there any warning between paracetamol
            and ibuprofen?
          </p>
        </div>
      </div>

      <textarea
        className="border w-full rounded mt-5 p-3"
        rows="3"
        placeholder="Write a comment..."
      />

      <button className="mt-3 bg-blue-700 text-white px-4 py-2 rounded">
        Post Comment
      </button>
    </div>
  );
};

export default CommunityDiscussion;