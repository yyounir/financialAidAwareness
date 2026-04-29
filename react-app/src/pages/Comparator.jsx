import React, { useState } from 'react'

function emptySchool(name = '') {
  return {
    id: Date.now() + Math.random(),
    name,
    tuition: 12000,
    roomBoard: 8000,
    fees: 1000,
    other: 500,
    totalAid: 5000,
  }
}

export default function Comparator() {
  const [schools, setSchools] = useState([emptySchool('School A'), emptySchool('School B'), emptySchool('School C')])

  function updateField(id, field, value) {
    setSchools(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  function addSchool() {
    if (schools.length >= 5) return
    setSchools(prev => [...prev, emptySchool(`School ${String.fromCharCode(65 + prev.length)}`)])
  }

  function removeSchool(id) {
    setSchools(prev => prev.filter(s => s.id !== id))
  }

  function computeTotals(s) {
    const coa = Number(s.tuition || 0) + Number(s.roomBoard || 0) + Number(s.fees || 0) + Number(s.other || 0)
    const aid = Number(s.totalAid || 0)
    const net = Math.max(0, Math.round(coa - aid))
    return { coa, aid, net }
  }

  const results = schools.map(s => ({ ...s, ...computeTotals(s) }))
  results.sort((a, b) => a.net - b.net)

  return (
    <div>
      <h2>Side-by-Side School Aid Comparator</h2>
      <p className="muted">Enter 3–5 schools you're considering and see a real breakdown of net cost after aid, not just sticker price.</p>
      <img className="section-image" src="/2c9b428f-4b0f-4624-9def-70caa88f8eb6.sized-1000x1000.jpg" alt="comparator illustration" />

      <div className="comparator-form">
        {schools.map((s, idx) => (
          <div className="school-card" key={s.id}>
            <div className="school-card-header">
              <strong>{s.name || `School ${idx + 1}`}</strong>
              <button className="small" onClick={() => removeSchool(s.id)} aria-label="Remove">Remove</button>
            </div>

            <label>
              School name
              <input value={s.name} onChange={e => updateField(s.id, 'name', e.target.value)} />
            </label>

            <label>
              Tuition
              <input type="number" value={s.tuition} onChange={e => updateField(s.id, 'tuition', Number(e.target.value))} />
            </label>

            <label>
              Room &amp; Board
              <input type="number" value={s.roomBoard} onChange={e => updateField(s.id, 'roomBoard', Number(e.target.value))} />
            </label>

            <label>
              Fees
              <input type="number" value={s.fees} onChange={e => updateField(s.id, 'fees', Number(e.target.value))} />
            </label>

            <label>
              Other costs
              <input type="number" value={s.other} onChange={e => updateField(s.id, 'other', Number(e.target.value))} />
            </label>

            <label>
              Estimated total aid (grants/scholarships)
              <input type="number" value={s.totalAid} onChange={e => updateField(s.id, 'totalAid', Number(e.target.value))} />
            </label>
          </div>
        ))}
      </div>

      <div style={{marginTop:12}}>
        <button className="button" onClick={addSchool} disabled={schools.length >= 5}>Add school</button>
      </div>

      <section className="comparator-results">
        <h3>Comparison</h3>
        <table className="comparator-table">
          <thead>
            <tr>
              <th>School</th>
              <th>Total Cost (COA)</th>
              <th>Estimated Aid</th>
              <th>Net Cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.id} className={r.net === results[0].net ? 'best' : ''}>
                <td>{r.name || '—'}</td>
                <td>${r.coa.toLocaleString()}</td>
                <td>${r.aid.toLocaleString()}</td>
                <td>${r.net.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
