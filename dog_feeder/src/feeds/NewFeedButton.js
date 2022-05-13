import React from 'react'
import { FaHotdog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NewFeedButton() {
  return (
    <Link
      to="/feeds/new"
      className="bg-purple-600 text-white px-4 py-2 flex items-center w-36"
    >
      <FaHotdog className="inline-block mr-2 relative -top-0.5" size="20" color="grey-100" />
      Start Feeding
    </Link>
  );
}

export default NewFeedButton
