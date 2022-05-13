import React from 'react'
import FeedListItem from './FeedListItem'

function FeedsList({ feeds, handleDelete }) {

  
  return (
    <div>
      <ul className="space-y-4">
        {feeds.map((feed) => (
          <FeedListItem feed={feed} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}

export default FeedsList
