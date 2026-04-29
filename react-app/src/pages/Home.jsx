import React from 'react'

export default function Home() {
  return (
    <div>
      <img className="section-image" src="/iStock-1340553077-scaled.jpg" alt="students studying" />
      <div style={{marginTop:-58}}><span className="campaign-badge">Campaign: Approve More Aid</span></div>
      <section id="overview">
        <h2>Join FREEAid</h2>
        <p>
          Many students are denied the financial aid they need because eligibility rules are narrow or outdated.
          This campaign calls for broader approvals, clearer guidance, and emergency support so more students can complete college.
        </p>
      </section>

      <section id="why">
        <h2>Why this matters</h2>
        <ul>
          <li><strong>Opportunity:</strong> Expanding approvals removes financial barriers and opens opportunity for more learners.</li>
          <li><strong>Equity:</strong> Low-income, first-generation, and non-traditional students are disproportionately affected.</li>
          <li><strong>Completing college:</strong> Financial stability is a top predictor of student persistence and graduation.</li>
          <li><strong>Community impact:</strong> More graduates strengthen local economies and reduce long-term costs.</li>
        </ul>
      </section>

      <section id="how">
        <h2>How you can help</h2>
        <ol>
          <li>Sign the pledge to approve more aid for eligible students.</li>
          <li>Share the campaign with friends and campus groups.</li>
          <li>Contact your representatives and ask for increased support for student aid programs.</li>
        </ol>
      </section>

      <section id="cta" className="estimator-cta">
        <h2>Try the tools</h2>
        <p>Want an idea of how federal aid might apply to your situation? Use the calculator or compare multiple schools side-by-side.</p>
        <div style={{display:'flex',gap:12}}>
          <a className="button" href="#/calculator">Open calculator</a>
          <a className="button" href="#/comparator">Open comparator</a>
        </div>
      </section>
    </div>
  )
}
