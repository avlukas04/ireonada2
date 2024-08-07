import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import TopBar from '../../components/overall/TopBar';
import HomeTopBar from '../../components/overall/HomeTopBar';
import BottomIcons from '../../components/overall/BottomIcons';
import './Bedtime1.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Bedtime1() {
  const [genre, setGenre] = useState('');
  const [setting, setSetting] = useState('');
  const [addDetails, setAddDetails] = useState('');
  const [ending, setEnding] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [storyGenerated, setStoryGenerated] = useState(false);
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [isReading, setIsReading] = useState(false);

  const generateStory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://noggin.rea.gent/planned-marten-7960', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_ixka3dkqd6utwwykaz0o5mu4x7hc8lqytmpo_ngk',
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
        const response = await fetch('https://noggin.rea.gent/dead-wildfowl-3512', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_01jr7hhqws2utxtixhpqq6ljq9f4untrt05e_ngk',
          },
          body: JSON.stringify({ description: desc }),
        });
        const imageUrl = response.url;
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
          const altText = imageDescriptions.find((desc, index) => `[picture${index + 1}]` === word);
          return `<img src="${encodeURI(imageUrl)}" alt="${altText || 'Image'}" class="story-image" />`;
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

  const speak = (text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    let speechText = doc.body.textContent || '';
    const imgElements = doc.querySelectorAll('img');
    imgElements.forEach(img => {
      const altText = img.getAttribute('alt') || 'Image';
      speechText += ` Image of ${altText}`;
    });

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.35;
    utterance.pitch = 1.4;
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
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
      <Box sx={{ padding: '20px' }}> {}
        <h1 className="your-alarm">Bedtime Story Generator</h1>
        {!storyGenerated ? (
          <Box sx={{ marginBottom: '20px' }}>
            <TextField
              label="Genre"
              variant="outlined"
              fullWidth
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <TextField
              label="Setting"
              variant="outlined"
              fullWidth
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              sx={{ marginTop: '20px' }}
            />
            <TextField
              label="Additional Details"
              variant="outlined"
              fullWidth
              value={addDetails}
              onChange={(e) => setAddDetails(e.target.value)}
              sx={{ marginTop: '20px' }}
            />
            <TextField
              label="Ending"
              variant="outlined"
              fullWidth
              value={ending}
              onChange={(e) => setEnding(e.target.value)}
              sx={{ marginTop: '20px' }}
            />
            <Button
              variant="contained"
              onClick={generateStory}
              disabled={isLoading}
              sx={{ marginTop: '20px', backgroundColor: '#25C6FF',
              '&:hover': { backgroundColor: '#25C6FF' },
              '&:focus': { backgroundColor: '#25C6FF' } }}
            >
              Generate Story
            </Button>
          </Box>
        ) : (
          <Box sx={{}}>
            <Button
              variant="contained"
              onClick={resetStory}
              sx={{ marginBottom: '10px', marginLeft: '5px', backgroundColor: '#25C6FF',
              '&:hover': { backgroundColor: '#25C6FF' },
              '&:focus': { backgroundColor: '#25C6FF' } }}
            >
              Generate New Story
            </Button>
            <Box sx={{ display: 'flex', gap: '10px', padding: '10px 0', marginLeft: '5px' }}>
              <Button
                variant="contained"
                onClick={() => speak(story)}
                disabled={isReading}
                sx={{ padding: '8px 16px', backgroundColor: '#25C6FF',
                '&:hover': { backgroundColor: '#25C6FF' },
                '&:focus': { backgroundColor: '#25C6FF' } }}
              >
                Read Story
              </Button>
              <Button
                variant="contained"
                onClick={stopReading}
                disabled={!isReading}
                sx={{ padding: '8px 16px', backgroundColor: '#25C6FF',
                '&:hover': { backgroundColor: '#25C6FF' },
                '&:focus': { backgroundColor: '#25C6FF' } }}
              >
                Stop Reading
              </Button>
            </Box>
          </Box>
        )}
        <Box sx={{ padding: '10px' }}>
          <h2 className="your-alarm">Your Bedtime Story</h2>
          {isLoading ? (
            <p>Generating...</p>
          ) : (
            <ReactMarkdown
              children={story}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          )}
        </Box>
      </Box>
      <BottomIcons />
    </div>
  
  );
}

export default Bedtime1;
