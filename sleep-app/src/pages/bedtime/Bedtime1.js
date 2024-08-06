// import React, { useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import TopBar from '../../components/overall/TopBar';
// import BottomIcons from '../../components/overall/BottomIcons';

// function App() {
//   const [genre, setGenre] = useState('');
//   const [customGenre, setCustomGenre] = useState('');
//   const [isCustomGenre, setIsCustomGenre] = useState(false);
//   const [setting, setSetting] = useState('');
//   const [addDetails, setAddDetails] = useState('');
//   const [ending, setEnding] = useState('');
//   const [story, setStory] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [storyGenerated, setStoryGenerated] = useState(false);

//   const fetchImageUrl = async (description) => {
//     const response = await fetch('https://noggin.rea.gent/remaining-rook-3952', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer rg_v1_o5rz5m16cr9lypy3cvyj0fxukiftiakox4jz_ngk',
//       },
//       body: JSON.stringify({ description }),
//     });
//     const data = await response.text();
//     return data; // Assuming the response is a URL for the image
//   };
  
//   const generateStory = async () => {
//     setIsLoading(true);
//     const response = await fetch('https://noggin.rea.gent/sore-guan-3091', { //UPDATE AFTER TESTING
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer rg_v1_nt10gnv9ko0mqeihxzoqw3c6tx5hmqc9wb9o_ngk', //UPDATE AFTER TESTING
//       },
//       body: JSON.stringify({
//         genre,
//         setting,
//         addDetails,
//         ending,
//       }),
//     });
//     const data = await response.text();
//     const jsonResponse = JSON.parse(data);

//     let updatedStory = jsonResponse.story;
//     jsonResponse.pictureDescriptions.forEach((_, index) => {
//       const placeholder = `[picture${index + 1}]`;
//       const divPlaceholder = `<div class="story-image" data-index="${index}"></div>`;
//       updatedStory = updatedStory.replace(placeholder, divPlaceholder);
//     });

//     setStory(updatedStory + '\n\n\n\n\n\n\n\n\n');
//     setIsLoading(false);
//     setStoryGenerated(true);
//   };

//   const resetStory = () => {
//     setGenre('');
//     setSetting('');
//     setAddDetails('');
//     setEnding('');
//     setStory('');
//     setStoryGenerated(false);
//   };

//   return (
//     <div className="App">
//       <TopBar />
//       <h1>Bedtime Story Generator</h1>
//       {!storyGenerated ? (
//         <>
//           <div>
//             <label>
//               Genre:
//               <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
//             </label>
//           </div>
//           <div>
//             <label>
//               Setting:
//               <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)} />
//             </label>
//           </div>
//           <div>
//             <label>
//               Additional Details:
//               <input type="text" value={addDetails} onChange={(e) => setAddDetails(e.target.value)} />
//             </label>
//           </div>
//           <div>
//             <label>
//               Ending:
//               <input type="text" value={ending} onChange={(e) => setEnding(e.target.value)} />
//             </label>
//           </div>
//           <button onClick={generateStory}>Generate Story</button>
//         </>
//       ) : (
//         <button onClick={resetStory}>Generate New Story</button>
//       )}
//       <div>
//         <h2>Your Bedtime Story</h2>
//         {isLoading ? (
//           <p>Generating...</p>
//         ) : (
//           <ReactMarkdown remarkPlugins={[remarkGfm]}>{story}</ReactMarkdown>
//         )}
//       </div>
//       <BottomIcons/>
//     </div>
//   );
// }

// export default App;

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
  const [imageUrls, setImageUrls] = useState({});

  const generateStory = async () => {
    setIsLoading(true);
    try {
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

      const { story: generatedStory, pictureDescriptions } = jsonResponse;

      // Generate a map of placeholders to image descriptions
      const placeholderToDesc = pictureDescriptions.reduce((acc, desc, index) => {
        acc[`[picture${index + 1}]`] = desc;
        return acc;
      }, {});

      setStory(generatedStory);
      setImageUrls(placeholderToDesc);
      setStoryGenerated(true);
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStoryWithImages = () => {
    // Original placeholder image URLs
    const placeholderToImageUrl = {
      '[picture1]': 'https://via.placeholder.com/150/FFDDDD/000000?text=Image+1', // Light pink
      '[picture2]': 'https://via.placeholder.com/150/FFD700/000000?text=Image+2', // Gold
      '[picture3]': 'https://via.placeholder.com/150/ADD8E6/000000?text=Image+3', // Light blue
      '[picture4]': 'https://via.placeholder.com/150/90EE90/000000?text=Image+4', // Light green
    };
  
    // Replace placeholders in the story with img tags
    const updatedStory = story.split('\n').map(line => {
      return line.split(' ').map(word => {
        // Check if the word is a placeholder
        const imageUrl = placeholderToImageUrl[word];
        if (imageUrl) {
          // Use placeholder as alt text
          const altText = word.substring(1, word.length - 1); // Remove surrounding brackets
          // Create an img tag with the original src URL and the correct alt text
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
      updateStoryWithImages();
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
            rehypePlugins={[rehypeRaw]} // Allow custom HTML
          />
        )}
      </div>
      <BottomIcons />
    </div>
  );
}

export default App;