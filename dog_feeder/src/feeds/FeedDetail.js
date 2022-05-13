import React from 'react'
import { FaTrash, FaPoop } from 'react-icons/fa';


function FeedDetail({ feed = {}, togglePoo, handleDelete }) {
  const { id, formatted_time, dog_feeds } = feed;

  const handlePooClick = (dogFeedId) => {
    togglePoo(id, dogFeedId);
  };

  return (
    <div>
      <h1 className="flex justify-between text-2xl">Fed on {formatted_time} <span className="flex items-center">
        <button onClick={() => handleDelete(id)}><FaTrash size={20} /></button>
      </span></h1>

      <ul className="grid sm:grid-cols-3">
        {dog_feeds?.map((dogFeed) => (
          <li key={dogFeed.id} className="flex items-bottom justify-between border-b-2 py-2">
            <span className="pb-1 pt-2 text-center">
              <img
                src={dogFeed.dog.image_url}
                alt={dogFeed.dog.name}
                className="w-20"
              />
              {dogFeed.dog.name}
            </span>
            <span className="flex items-center">
              <button className="p-8" onClick={() => handlePooClick(dogFeed.id)}>
                <FaPoop
                  style={{ color: dogFeed.pooped ? '#000' : '#bbb' }}
                  size={20}
                />
              </button>
            </span>
            {/* */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeedDetail
