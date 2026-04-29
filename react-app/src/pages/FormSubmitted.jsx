import React from 'react'

export default function FormSubmitted() {
  let data = null
  try {
    data = JSON.parse(localStorage.getItem('financialAidForm'))
  } catch (e) {
    data = null
  }

  function downloadJSON() {
    if (!data) return
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'financialAidForm.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!data) {
    return (
      <div>
        <h2>No pledge found</h2>
        <p className="muted">It looks like you haven't signed the pledge yet. Please add your support.</p>
        <a className="button" href="#/form">Sign the pledge</a>
      </div>
    )
  }

  return (
    <div>
      <h2>Thank you — pledge recorded</h2>
      <p className="muted">Your support has been saved locally. Share the campaign to amplify impact.</p>

      <div className="submission-card">
        <dl>
          <dt>First name</dt><dd>{data.firstName}</dd>
          <dt>Last name</dt><dd>{data.lastName}</dd>
          <dt>Email</dt><dd>{data.email}</dd>
          <dt>Gender</dt><dd>{data.gender}</dd>
          <dt>Date of birth</dt><dd>{data.dob}</dd>
          <dt>College level</dt><dd>{data.level}</dd>
          <dt>Uploaded file</dt><dd>{data.fileName || '—'}</dd>
          <dt>Comment</dt><dd>{data.comment}</dd>
          <dt>Submitted</dt><dd>{new Date(data.submittedAt).toLocaleString()}</dd>
        </dl>
      </div>

      <div style={{marginTop:12,display:'flex',gap:12}}>
        <button className="button" onClick={downloadJSON}>Download JSON</button>
        <a className="button" href="#/">Return home</a>
        <a className="button" href="#/form">Edit form</a>
      </div>
    </div>
  )
}
