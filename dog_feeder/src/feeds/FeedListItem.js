import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function FeedListItem({ feed, handleDelete }) {


  return (
    <li key={feed.id} className="flex items-bottom justify-between border-b-2 py-2">
      <div className="w-3/4">
        <Link
          to={`/feeds/${feed.id}`}
          className="pb-1 pt-2 w-54"
        >
          {feed.formatted_time}
        </Link>
        <span className="flex items-center">
          <button onClick={() => null}>
            {/* <FaPoop
              style={{ color: dogFeed.pooped ? '#000' : '#bbb' }}
              size={20}
            /> */}
          </button>
        </span>
      </div>
      <span className="flex items-center">
        <button onClick={() => handleDelete(feed.id)}><FaTrash size={20} /></button>
      </span>
    </li>
  )
}

export default FeedListItem
