import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function RatingSelect({ select }) {
  const { feedbackEdit } = useContext(FeedbackContext);
  useEffect(() => {
    setSelected(feedbackEdit.item.rating);
  }, [feedbackEdit]);
  const [selected, setSelected] = useState(10);
  const handleChange = (e) => {
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };
  return (
    // <ul className='rating'>
    //   <li>
    //     <input
    //       type='radio'
    //       id='1'
    //       name='rating'
    //       value='1'
    //       onChange={handleChange}
    //       checked={selected === 1}
    //     />
    //     <label htmlFor={`num1`}>Easy</label>
    //   </li>
    //   <li>
    //     <input
    //       type='radio'
    //       id='2'
    //       name='rating'
    //       value='2'
    //       onChange={handleChange}
    //       checked={selected === 2}
    //     />
    //     <label htmlFor={`num2`}>Medium</label>
    //   </li>
    //   <li>
    //     <input
    //       type='radio'
    //       id='2'
    //       name='rating'
    //       value='2'
    //       onChange={handleChange}
    //       checked={selected === 3}
    //     />
    //     <label htmlFor={`num2`}>Hard</label>
    //   </li>
    <ul className='rating'>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  );
}

export default RatingSelect;
