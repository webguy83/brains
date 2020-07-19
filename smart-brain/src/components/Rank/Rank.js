import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    fetch(`https://sjx5jfrccl.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
      .then(res => res.json())
      .then(data => {
        setEmoji(data.input);
      })
      .catch(console.log)
  }, [entries]);

  return (
    <div>
      <div className='white f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries} {emoji}
      </div>
    </div>
  );
}

export default Rank;