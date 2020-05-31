import React, {useEffect, useState} from 'react';
import './App.css';
import Networking from "./Networking";
import Job from "./Job";

function App() {
  const [jobs, setJobs] = useState(null);
  const [newJobContent, setNewJobContent] = useState("");
  const loadJobs = () => {
    Networking.exec({
      endpoint: client => client.apis.default.getPosts,
      success: result => {
        setJobs(result.body)
      }
    })
  }
  useEffect(() => {
    loadJobs()
  }, [])

  const submitNewJob = () => {
    Networking.exec({
      endpoint: client => client.apis.default.post_posts,
      data: {requestBody: {"description": newJobContent, "title": newJobContent}},
      success: result => loadJobs()
    })
  }
  return (
      <div className="App">
        <div className="App-header" style={{padding: '3vh'}}>
          <h1>Job posts</h1>
          {jobs && jobs.map(it => <Job job={it}/>)}
          <h2>Create new job</h2>
          <input onChange={(e) => setNewJobContent(e.target.value)}/>
          <button onClick={submitNewJob}>Submit Job</button>
        </div>
      </div>
  );
}

export default App;
