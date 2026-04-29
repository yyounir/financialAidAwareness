import React, { useState } from 'react'

export default function Form() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [level, setLevel] = useState('')
  const [file, setFile] = useState(null)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  function validate() {
    if (!firstName || !lastName || !email || !gender || !dob || !level || !comment) {
      setError('Please complete all required fields.')
      return false
    }
    // simple email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    setError('')
    return true
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      firstName,
      lastName,
      email,
      gender,
      dob,
      level,
      fileName: file ? file.name : null,
      comment,
      submittedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem('financialAidForm', JSON.stringify(payload))
    } catch (err) {
      console.error('storage error', err)
    }

    // navigate to summary
    window.location.hash = '#/form-submitted'
  }

  return (
    <div>
      <h2>Sign the Pledge — Approve More Financial Aid</h2>
      <img className="section-image" src="/FinancialAidSiteindex.html" alt="campaign" />
      <p className="muted">Add your name to the pledge calling for expanded financial aid approvals. Your support helps show broad backing for policy change.</p>

      <form className="demo-form" onSubmit={handleSubmit}>
        <label>
          First name *
          <input className = "textInput" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        </label>

        <label>
          Last name *
          <input className = "textInput" value={lastName} onChange={e => setLastName(e.target.value)} required />
        </label>

        <label>
          Email *
          <input className = "textInput" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>

        <label>
          Gender *
          <div className="radio-row">
            <label><input type="radio" name="gender" value="male" checked={gender==='male'} onChange={e=>setGender(e.target.value)} /> Male</label>
            <label><input type="radio" name="gender" value="female" checked={gender==='female'} onChange={e=>setGender(e.target.value)} /> Female</label>
            <label><input type="radio" name="gender" value="other" checked={gender==='other'} onChange={e=>setGender(e.target.value)} /> Other</label>
          </div>
        </label>

        <label>
          Date of birth *
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
        </label>

        <label>
          College level *
          <select value={level} onChange={e => setLevel(e.target.value)} required>
            <option value="">Choose</option>
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
          </select>
        </label>

        <label>
          Financial aid papers (optional)
          <input type="file" onChange={e => setFile(e.target.files[0] || null)} />
        </label>

        <label>
          Comment *
          <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4} required />
        </label>

        {error && <div className="form-error">{error}</div>}

        <div>
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
      <div style={{marginTop:8}}>
        <small className="muted">By signing, you agree that this demo stores a local copy of your pledge in your browser. No personal data is shared by default.</small>
      </div>
    </div>
  )
}
