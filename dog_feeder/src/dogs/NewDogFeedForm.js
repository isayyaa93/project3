import React, { useState } from 'react';
import { FaHotdog, FaPoop } from 'react-icons/fa';

function NewDogFeedForm({ dog, toggleShowNewDogFeedForm, handleAddDogFeed }) {
  const [feed_time, set_feed_time] = useState('');
  const [pooped, set_pooped] = useState(false);

  console.log({
    feed_time,
    pooped
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      feed_time,
      pooped,
      dog_id: dog.id
    };
    // const res = await fetch(`${process.env.REACT_APP_API_URL}/dog_feeds`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body
    // });

    // const newDogFeed = await res.json();

    handleAddDogFeed(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <span className="pb-1 pt-2 w-32">
        <input
          required
          type="datetime-local"
          onChange={(e) => set_feed_time(e.target.value)}
        />
      </span>
      <span className="flex items-center">
        <label htmlFor="pooped">
          <FaPoop style={{ color: pooped ? '#000' : '#bbb' }} size={20} />
        </label>
        <input
          className="hidden"
          id="pooped"
          type="checkbox"
          onChange={(e) => set_pooped(e.target.checked)}
        />
      </span>
      <span className="flex items-center">
        <button
          className="bg-gray-100 px-4 py-2 mr-2"
          onClick={toggleShowNewDogFeedForm}
        >
          Cancel
        </button>
        <button
          className="flex bg-purple-600 px-4 py-2 text-white"
          type="submit"
        >
          <FaHotdog size={20} /> Add Feed
        </button>
      </span>
    </form>
  );
}

export default NewDogFeedForm;
