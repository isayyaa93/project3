import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import DogsToolBar from './DogsToolBar';
import DogsList from './DogsList';
import NewDogForm from './NewDogForm';
import DogDetail from './DogDetail';
import DogEditForm from './DogEditForm';

function DogsContainer() {
  const history = useHistory();
  const location = useLocation();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dogs`, {
      headers: { Accept: 'application/json' }
    })
      .then(res => res.json())
      .then(dogs => setDogs(dogs))
  }, []);

  
  const addDog = (formData) => {
    fetch(`${process.env.REACT_APP_API_URL}/dogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newDog => {
        // pessimistically wait to update the state until we have the new dog (and its id) from api
        setDogs(dogs.concat(newDog))
        history.push(`/dogs/${newDog.id}`)
      });
  }
  

  const updateDog = (id, formData) => {
    fetch(`${process.env.REACT_APP_API_URL}/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json()) 
      .then(updatedDog => {
        // pessimistically update the dog in state after we get a response from the api
        setDogs(dogs.map((dog) => (dog.id === parseInt(id) ? updatedDog : dog)));
        history.push(`/dogs/${updatedDog.id}`);
      })
  }

  const deleteDog = (dogId) => {
    if (window.confirm('Are you sure you want to delete this dog?')) {
      // optimistically update the ui
      setDogs(dogs.filter(dog => dog.id !== parseInt(dogId)))
      // update the API
      fetch(`${process.env.REACT_APP_API_URL}/dogs/${dogId}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' }
      })
        .then(res => res.json())
        .then(deletedDog => {
          console.log('deleted', deletedDog.name)
          if (location.pathname !== "/dogs") {
            history.push("/dogs")
          }
        });
    }
  }

  const addDogFeed = (dogId, formData) => {
    // pessimistically - don't update the DOM until we get the successful response from the API including an id
    fetch(`${process.env.REACT_APP_API_URL}/dog_feeds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((newDogFeed) => {
        setDogs(
          dogs.map((dog) => {
            if (dog.id === newDogFeed.dog_id) {
              return {
                ...dog,
                dog_Feeds: dog.dog_feeds.concat(newDogFeed)
              };
            } else {
              return dog;
            }
          })
        );
      });
  };

  const togglePoo = (dogId, dogFeedId) => {
    const dogToUpdate = dogs.find((dog) => dog.id === parseInt(dogId));
    const dogFeedToUpdate = dogToUpdate.dog_feeds.find(
      (dw) => dw.id === parseInt(dogFeedId)
    );

    const updatedDogs = dogs.map((dog) => {
      if (dog === dogToUpdate) {
        return {
          ...dogToUpdate,
          dog_feeds: dog.dog_feeds.map((dogFeed) => {
            if (dogFeed === dogFeedToUpdate) {
              return { ...dogFeedToUpdate, pooped: !dogFeedToUpdate.pooped };
            } else {
              return dogFeed;
            }
          })
        };
      } else {
        return dog;
      }
    });
    // optimistically update the ui to toggle the darkness of the poop icon
    setDogs(updatedDogs);
    // update the API
    fetch(`${process.env.REACT_APP_API_URL}/dog_feeds/${dogFeedId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pooped: !dogFeedToUpdate.pooped })
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const deleteDogFeed = (dogId, dogFeedId) => {
    if (window.confirm('Are you sure you want to delete this dog feed?')) {
      const dogToUpdate = dogs.find((dog) => dog.id === parseInt(dogId));
      // optimistically update the ui
      const updatedDogs = dogs.map((dog) => {
        if (dog === dogToUpdate) {
          return {
            ...dogToUpdate,
            dog_feeds: dog.dog_feeds.filter((dogFeed) => {
              return dogFeed.id !== dogFeedId;
            })
          };
        } else {
          return dog;
        }
      });
      setDogs(updatedDogs);
      // update the API 
      fetch(`${process.env.REACT_APP_API_URL}/dog_feeds/${dogFeedId}`, {
        method: 'DELETE'
      });
    }
  };

  return (
    <div className="w-4/5 mx-auto pt-12">
      <DogsToolBar />
      <Switch>
        <Route exact path="/dogs">
          <DogsList dogs={dogs} deleteDog={deleteDog} />
        </Route>
        <Route exact path="/dogs/new">
          <NewDogForm dogs={dogs} addDog={addDog} />
        </Route>
        <Route
          exact
          path="/dogs/:id"
          render={({ match }) => (
            <DogDetail
              togglePoo={togglePoo}
              deleteDogFeed={deleteDogFeed}
              deleteDog={deleteDog}
              addDogFeed={addDogFeed}
              dog={dogs.find((dog) => dog.id === parseInt(match.params.id))}
            />
          )}
        />
        <Route
          exact
          path="/dogs/:id/edit"
          render={({ match }) => (
            <DogEditForm
              dog={dogs.find((dog) => dog.id === parseInt(match.params.id))}
              updateDog={updateDog}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default DogsContainer;
