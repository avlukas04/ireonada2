import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TopBar from '../../components/overall/TopBar';
import BottomIcons from '../../components/overall/BottomIcons';

function App() {
  const [genre, setGenre] = useState('');
  const [setting, setSetting] = useState('');
  const [addDetails, setAddDetails] = useState('');
  const [ending, setEnding] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [storyGenerated, setStoryGenerated] = useState(false);

  const generateStory = async () => {
    setIsLoading(true);
    const response = await fetch('https://noggin.rea.gent/sore-guan-3091', { //UPDATE AFTER TESTING
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer rg_v1_nt10gnv9ko0mqeihxzoqw3c6tx5hmqc9wb9o_ngk', //UPDATE AFTER TESTING
      },
      body: JSON.stringify({
        genre,
        setting,
        addDetails,
        ending,
      }),
    });
    const data = await response.text();
    const jsonResponse = JSON.parse(data);
    setStory(jsonResponse.story + '\n\n\n\n\n\n\n\n\n');
    setIsLoading(false);
    setStoryGenerated(true);
  };

  const resetStory = () => {
    setGenre('');
    setSetting('');
    setAddDetails('');
    setEnding('');
    setStory('');
    setStoryGenerated(false);
  };

  return (
    <div className="App">
      <TopBar />
      <h1>Bedtime Story Generator</h1>
      {!storyGenerated ? (
        <>
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
        </>
      ) : (
        <button onClick={resetStory}>Generate New Story</button>
      )}
      <div>
        <h2>Your Bedtime Story</h2>
        {isLoading ? (
          <p>Generating...</p>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{story}</ReactMarkdown>
        )}
      </div>
      <BottomIcons/>
    </div>
  );
}

export default App;
