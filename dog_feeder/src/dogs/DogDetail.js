import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import NewDogFeedForm from './NewDogFeedForm';
import { FaPencilAlt, FaTrash, FaPoop, FaPlus } from 'react-icons/fa';

function DogDetail({
  dog = {},
  togglePoo,
  addDogFeed,
  deleteDogFeed,
  deleteDog
}) {
  const { id, name, age, breed, image_url, dog_feeds } = dog;
  const [showNewDogFeedForm, setShowNewDogFeedForm] = useState(false);

  const toggleShowNewDogFeedForm = () => {
    setShowNewDogFeedForm(!showNewDogFeedForm)
  }

  const handleAddDogFeedSubmit = (formData) => {
    addDogFeed(id, formData)
    toggleShowNewDogFeedForm()
  }

  const handlePooClick = (dogFeedId) => {
    togglePoo(id, dogFeedId)
  };

  return (
    <div className="grid sm:grid-cols-3 gap-8">
      <div className="p-4 shadow text-center">
        <img className="object-cover w-full" src={image_url} alt={name} />
        <h1 className="text-2xl my-2">{name}</h1>
        <p>
          {breed} - {age ? `${age} old` : 'age unknown'}
        </p>
        <div className="mt-4 flex justify-end">
          <Link className="flex items-center mr-2" to={`/dogs/${id}/edit`}>
            <FaPencilAlt size={20} />
          </Link>
          <button
            onClick={() => deleteDog(id)}
            className="flex items-center mr-2"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
      <div className="sm:col-span-2">
        <h1 className="text-2xl flex items-center">
          Feedings{' '}
          {!showNewDogFeedForm ? (
            <FaPlus
              onClick={toggleShowNewDogFeedForm}
              className="ml-2 cursor-pointer"
            />
          ) : null}
        </h1>

        <ul className="space-y-4">
          {dog_feeds?.map((dogFeed) => (
            <li
              key={dogFeed.id}
              className="flex items-bottom justify-between border-b-2 py-2"
            >
              <Link to={`/feeds/${dogFeed.feed_id}`} className="pb-1 pt-2 w-44">
                {dogFeed.formatted_time}
              </Link>
              <span className="flex items-center">
                <button onClick={() => handlePooClick(dogFeed.id)}>
                  <FaPoop
                    style={{ color: dogFeed.pooped ? '#000' : '#bbb' }}
                    size={20}
                  />
                </button>
              </span>
              <span className="flex items-center">
                <button onClick={() => deleteDogFeed(id, dogFeed.id)}>
                  <FaTrash size={20} />
                </button>
              </span>
            </li>
          ))}
          {showNewDogFeedForm && (
            <li key="theNewDogFeedForm">
              <NewDogFeedForm
                dog={dog}
                toggleShowNewDogFeedForm={toggleShowNewDogFeedForm}
                handleAddDogFeed={handleAddDogFeedSubmit}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DogDetail;
