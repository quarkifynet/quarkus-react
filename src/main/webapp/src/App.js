import React, {useState} from 'react';
import './App.css';
import Networking from "./Networking";

function App() {
  const [jobs, setJobs] = useState(null);
  const [proposals, setProposals] = useState({});
  const [expanded, setExpanded] = useState({});
  const [newJobContent, setNewJobContent] = useState("");
  const [newJobOfferContent, setNewJobOfferContent] = useState("");
  if (jobs == null) {
    Networking.exec(client => client.apis.default.get_posts, null,
        result => {
          setJobs(result.body)
        }
    )
  }
  const loadProposals = (jobId) => {
    Networking.exec(client => client.apis.default.get_posts__id__proposals, {id: jobId},
        result => setProposals({...proposals, [jobId]: result.body})
    )
  }
  const submitNewJob = () => {
    Networking.exec(client => client.apis.default.post_posts, null,
        result => setJobs(null),
        null,
        {requestBody: {"description": newJobContent, "title": newJobContent}}
    )
  }
  const submitNewProposal = (jobId) => {
    Networking.exec(client => client.apis.default.post_posts__id__proposals, {id: jobId},
        result => {
          loadProposals(jobId)
        },
        null,
        {requestBody: {content: newJobOfferContent}}
    )
  }
  const expandJob = (jobId) => {
    loadProposals(jobId)
    setExpanded({...expanded, [jobId]: !expanded[jobId]})
  }
  console.log(proposals)
  return (
      <div className="App">
        <div className="App-header" style={{padding: '3vh'}}>
          <h1>Job posts</h1>
          {jobs && jobs.map(it => <div className="job-container">
            <div className="job-title">{it.title}</div>
            <div className="job-desc">{it.description}</div>
            <button onClick={() => expandJob(it.id)}>Expand</button>
            {expanded[it.id] &&
            <div>
              <div>Job offers</div>
              <input onChange={(e) => setNewJobOfferContent(e.target.value)}></input>
              <button onClick={() => submitNewProposal(it.id)}>Submit Offer</button>
              {
                proposals[it.id] && proposals[it.id].map(proposal =>
                    <div> Propsal: {proposal.content}</div>)
              }
            </div>
            }
          </div>)}
          <h2>Create new job</h2>
          <input onChange={(e) => setNewJobContent(e.target.value)}></input>
          <button onClick={submitNewJob}>Submit Job</button>
        </div>
      </div>
  );
}

export default App;
