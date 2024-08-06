import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
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
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const generateStory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://noggin.rea.gent/sore-guan-3091', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_nt10gnv9ko0mqeihxzoqw3c6tx5hmqc9wb9o_ngk',
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

      const { story: generatedStory, pictureDescriptions } = jsonResponse;

      setStory(generatedStory);
      setImageDescriptions(pictureDescriptions);
      setStoryGenerated(true);
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImageUrls = async (descriptions) => {
    const updatedPlaceholderToImageUrl = await Promise.all(
      descriptions.map(async (desc, index) => {
        const response = await fetch('https://noggin.rea.gent/remaining-rook-3952', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_o5rz5m16cr9lypy3cvyj0fxukiftiakox4jz_ngk',
          },
          body: JSON.stringify({ description: desc }),
        });
        const imageUrl = response.url; // Assuming the response is the image URL
        return { [`[picture${index + 1}]`]: imageUrl };
      })
    ).then(results => Object.assign({}, ...results));
  
    return updatedPlaceholderToImageUrl;
  };

  const updateStoryWithImages = (fetchedImageUrls) => {
    const placeholderToImageUrl = {
      '[picture1]': 'https://via.placeholder.com/150/FFDDDD/000000?text=Image+1',
      '[picture2]': 'https://via.placeholder.com/150/FFD700/000000?text=Image+2',
      '[picture3]': 'https://via.placeholder.com/150/ADD8E6/000000?text=Image+3',
      '[picture4]': 'https://via.placeholder.com/150/90EE90/000000?text=Image+4',
      ...fetchedImageUrls
    };

    const updatedStory = story.split('\n').map(line => {
      return line.split(' ').map(word => {
        const imageUrl = placeholderToImageUrl[word];
        if (imageUrl) {
          const altText = word.substring(1, word.length - 1);
          return `<img src="${encodeURI(imageUrl)}" alt="${altText}" class="story-image" />`;
        }
        return word;
      }).join(' ');
    }).join('\n');

    setStory(updatedStory);
  };

  const resetStory = () => {
    setGenre('');
    setSetting('');
    setAddDetails('');
    setEnding('');
    setStory('');
    setStoryGenerated(false);
    setImageUrls({});
  };

  useEffect(() => {
    if (storyGenerated) {
      fetchImageUrls(imageDescriptions).then(fetchedImageUrls => {
        console.log('Fetched Image URLs:', fetchedImageUrls);
        setImageUrls(fetchedImageUrls);
        updateStoryWithImages(fetchedImageUrls);
      });
    }
  }, [storyGenerated]);

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
          <ReactMarkdown
            children={story}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        )}
      </div>
      <BottomIcons />
    </div>
  );
}

export default App;