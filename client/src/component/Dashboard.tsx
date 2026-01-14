// we will implement a dashboard component here
// import React, { useState } from 'react';

// const Dashboard = () => {
//   const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
//   const [query, setQuery] = useState('');
//   const [dataBaseQuery, setDataBaseQuery] = useState(''); //Refer to openAIController line 75 (If this doesn't work, we try strings instead!)

//   const handleSubmit = async(e) => {
//       e.preventDefault();
//       setQuery('');
//       setDataBaseQuery('');

//       try {
//         const responseConverter = await fetch ('/api', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ naturalLanguageQuery }),
//         });

//         const convertedData = await responseConverter.json();
//         setQuery(convertedData.query);
//         setDataBaseQuery(convertedData.dataBaseQuery);
//       } catch (error) {
//         console.error('Error occurred during fetch:' , error);
//       }

//   };

//     return (
//         <>
//         <h2>What Twitch Streamer are you curious about today?</h2>
//             <div className='dashboard-container'>
//               <form onSubmit={handleSubmit} className='dashboard-form'>
//                 <textarea value={naturalLanguageQuery}
//                 onChange={(e) => setNaturalLanguageQuery(e.target.value)}
//                   id='dashboard-inputfield'
//                   placeholder='Type in a question about Twitch Streamers!'
//                 > </textarea>
//                 <br />
//                 <button
//                   id='dashboard-button'
//                   type='submit'
//                 >Ask away!</button>

// {/* <button type="submit" disabled={loading}>
//   {loading ? 'Converting...' : 'Convert and Execute'}
// </button> */}

//               </form>
//             {dataBaseQuery.length > 0 && (
//                 <div className="output">
//                     <h3>Answer</h3>
//                     <p>{dataBaseQuery}</p>
//                 </div>
//             )}
//             {/* {console.log("Test button pressed!")} */}
//             </div>
//       </>
//     );
// };

// export default Dashboard;

import React, { useState } from "react";

const Dashboard = () => {
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("");

    try {
      // const response = await fetch('/api', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ naturalLanguageQuery }),
      // });

      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naturalLanguageQuery }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data.dataBaseQuery, null, 2));
    } catch (error) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <>
      <h2>What Twitch Streamer are you curious about today?</h2>
      <div className="dashboard-container">
        <form onSubmit={handleSubmit} className="dashboard-form">
          <textarea
            value={naturalLanguageQuery}
            onChange={(e) => setNaturalLanguageQuery(e.target.value)}
            id="dashboard-inputfield"
            placeholder="Type in a question about Twitch Streamers"
          />
          <br />
          <button id="dashboard-button" type="submit">
            Ask away!
          </button>
        </form>

        {result && (
          <div className="output">
            <h3>Answer</h3>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
