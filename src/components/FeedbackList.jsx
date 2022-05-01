import React from 'react';
import FeedbackItem from './FeedbackItem';

function FeedbackList({ feedback }) {
  if (!feedback || feedback.length === 0) {
    return <p>No data yet</p>;
  }
  return feedback.map((item) => <FeedbackItem key={item.id} item={item} />);
}

export default FeedbackList;
