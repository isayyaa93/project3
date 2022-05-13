import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import FeedsToolBar from './FeedsToolBar';
import FeedsList from './FeedsList';
import NewFeedForm from './NewFeedForm';
import FeedDetail from './FeedDetail';


function FeedsContainer() {
  const history = useHistory();
  const location = useLocation();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/feeds`)
      .then(res => res.json())
      .then(feeds => {
        setFeeds(feeds)
      })
  }, [])

  const handleDelete = (feedId) => {
    if (window.confirm("Are you sure you want to delete this feed?")) {

      fetch(`${process.env.REACT_APP_API_URL}/feeds/${feedId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(deletedFeed => {
          setFeeds(feeds.filter((feed) => feed.id !== deletedFeed.id));
          if (location.pathname !== "/feeds") {
            history.push("/feeds")
          }
        })
    }
  }

  const addFeed = (formData) => {
    fetch(`${process.env.REACT_APP_API_URL}/feeds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((feed) => {
        setFeeds(feeds.concat(feed));
        history.push(`/feeds/${feed.id}`);
      });
  }

  const togglePoo = (feedId, dogFeedId) => {
    const feed = feeds.find(feed => feed.id === parseInt(feedId))
    const dogFeedToUpdate = feed.dog_feeds.find(dog_feed => dog_feed.id === parseInt(dogFeedId))
    const updatedFeeds = feeds.map((feed) => {
      if (feed.id === feedId) {
        return {
          ...feed,
          dog_feeds: feed.dog_feeds.map((dogFeed) => {
            if (dogFeed.id === dogFeedId) {
              return { ...dogFeed, pooped: !dogFeedToUpdate.pooped };
            } else {
              return dogFeed;
            }
          })
        };
      } else {
        return feed;
      }
    });
    // optimistically render the update
    setFeeds(updatedFeeds);
    // update the API
    fetch(`${process.env.REACT_APP_API_URL}/dog_feeds/${dogFeedId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pooped: !dogFeedToUpdate.pooped })
    })
      .then(res => res.json())
      .then(console.log);
  }


  return (
    <div className="w-4/5 mx-auto pt-12">
      <FeedsToolBar />
      <Switch>
        <Route exact path="/feeds">
          <FeedsList feeds={feeds} handleDelete={handleDelete} />
        </Route>
        <Route exact path="/feeds/new">
          <NewFeedForm feeds={feeds} addFeed={addFeed}/>
        </Route>
        <Route
          exact
          path="/feeds/:id"
          render={({ match }) => (
            <FeedDetail
              togglePoo={togglePoo}
              feed={feeds.find(feed => feed.id === parseInt(match.params.id))}
            />
          )}
        >
        </Route>
      </Switch>
    </div>
  );
}

export default FeedsContainer;
