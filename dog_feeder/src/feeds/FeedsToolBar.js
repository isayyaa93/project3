import React from 'react'
import { FaHotdog } from 'react-icons/fa'
import NewFeedButton from './NewFeedButton';
import { Link } from 'react-router-dom'

function FeedsToolBar() {
  return (
    <div className="grid grid-cols-2 py-1 border-b-2 mb-4">
      <Link to="/feeds" className="pr-2 py-2 flex items-center">
        <FaHotdog className="mr-2" size="20" /> All Feedings
      </Link>
      <div className="flex justify-end"><NewFeedButton /></div>
      <div className="text-right"></div>
    </div>
  )
}

export default FeedsToolBar
