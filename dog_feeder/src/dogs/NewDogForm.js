import React, { useState } from 'react';

function NewDogForm({ addDog }) {
  const [name, setName] = useState('Doggo');
  const [birthdate, setBirthdate] = useState('2022-05-13');
  const [breed, setBreed] = useState('Shiba Inu');
  const [image_url, setImageUrl] = useState(
    'https://www.nj.com/resizer/8H1EEl92C8a43ao-WxAMqqXNqhM=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/5JRM66VLCNFJ7ANPWR3VHYCCBQ.png'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    addDog({
      name,
      birthdate,
      breed,
      image_url
    })
  };

  return (
    <>
      <h1 className="text-3xl mb-3">New Dog</h1>
      <form
        onSubmit={handleSubmit}
        className="text-2xl flex-col space-y-8 items-center"
      >
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="birthdate">
            Birthdate
          </label>
          <input
            type="date"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="birthdate"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="breed">
            Breed
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="breed"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="image_url">
            Image Url
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="image_url"
            id="image_url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </fieldset>

        <button
          className="block relative lg:-top-2 w-100 left-1 px-4 py-2 text-center bg-green-600 text-white"
          type="submit"
        >
          Add Dog
        </button>
      </form>
    </>
  );
}

export default NewDogForm;
