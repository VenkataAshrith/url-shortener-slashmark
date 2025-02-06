import axios from 'axios';
import { useState } from 'react';

const App = () => {
  
  const [url, setURL] = useState("");
  const [resultURL, setResultURL] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:5000", {url: url});
    setResultURL(result.data.url);
  }

  const handleCopy = async (e) => {
    await navigator.clipboard.writeText(resultURL);
    e.target.innerText="Copied";
    setTimeout(()=>{
      e.target.innerText="Copy";
    }, 3000);
  }

  return (
    <div className="w-screen h-screen bg-slate-950 flex flex-col justify-center items-center gap-12">
      <div className="text-5xl font-semibold text-white">
        <h1>Link Shortner</h1>
      </div>
      <div className="w-[90%] md:w-[60%] bg-slate-300 rounded-xl flex flex-col">
        <form onSubmit={handleSubmit} className="w-full flex gap-2 p-4">
          <input type="text" name='url' value={url} onChange={(e)=>setURL(e.target.value)} className="w-full p-4 bg-slate-800 font-semibold text-xl rounded-lg" placeholder="Enter you url"/>
          <button type='submit' className="bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg">Submit</button>
        </form>
      </div>
      {resultURL && 
        <div className='flex items-center gap-2 text-white'><a href={resultURL}>{resultURL}</a><button className='px-4 py-2 rounded-lg text-black bg-slate-300' onClick={handleCopy}>Copy</button></div>
      }
    </div>
  )
}

export default App;