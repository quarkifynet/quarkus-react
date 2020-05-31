import React, {useState} from "react";
import Networking from "./Networking";

export default function Job({job, ...props}) {
  const [proposals, setProposals] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [newJobOfferContent, setNewJobOfferContent] = useState("");

  const expandJob = (jobId) => {
    loadProposals(jobId)
    setExpanded(!expanded);
  }
  const loadProposals = (jobId) => {
    Networking.exec({
      endpoint: client => client.apis.default.get_posts__id__proposals,
      attributes: {id: jobId},
      success: result => setProposals(result.body)
    });
  }
  const submitNewProposal = (jobId) => {
    Networking.exec({
      endpoint: client => client.apis.default.post_posts__id__proposals,
      attributes: {id: jobId},
      success: result => {
        loadProposals(jobId)
      },
      meta: {requestBody: {content: newJobOfferContent}}
    })
  }
  return <div className="job-container">
    <div className="job-title">{job.title}</div>
    <div className="job-desc">{job.description}</div>
    <button onClick={() => expandJob(job.id)}>Expand</button>
    {expanded &&
    <div>
      <div>Job offers</div>
      <input onChange={(e) => setNewJobOfferContent(e.target.value)}></input>
      <button onClick={() => submitNewProposal(job.id)}>Submit Offer</button>
      {
        proposals && proposals.map(proposal =>
            <div> Propsal: {proposal.content}</div>)
      }
    </div>}
  </div>
}
