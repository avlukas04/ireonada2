import React, { useState } from 'react';

function App() {
  const [genre, setGenre] = useState('');
  const [setting, setSetting] = useState('');
  const [addDetails, setAddDetails] = useState('');
  const [ending, setEnding] = useState('');
  const [story, setStory] = useState('');

  const generateStory = async () => {
    const response = await fetch('https://noggin.rea.gent/steady-minnow-6410', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer rg_v1_9lh8y4zj49p95xzc5jx201i04rkvs2gmehs8_ngk',
      },
      body: JSON.stringify({
        genre,
        setting,
        addDetails,
        ending,
      }),
    });
    const data = await response.text();
    setStory(data);
  };

  return (
    <div className="App">
      <h1>Bedtime Story Generator</h1>
      <div>
        <label>
          Genre:
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Setting:
          <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Additional Details:
          <input type="text" value={addDetails} onChange={(e) => setAddDetails(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Ending:
          <input type="text" value={ending} onChange={(e) => setEnding(e.target.value)} />
        </label>
      </div>
      <button onClick={generateStory}>Generate Story</button>
      <div>
        <h2>Your Bedtime Story</h2>
        <p>{story}</p>
      </div>
    </div>
  );
}

export default App;
