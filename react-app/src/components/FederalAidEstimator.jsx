import React, { useState } from 'react'

export default function FederalAidEstimator() {
  const [isIndependent, setIsIndependent] = useState(false)
  const [parentIncome, setParentIncome] = useState(40000)
  const [studentIncome, setStudentIncome] = useState(2000)
  const [familySize, setFamilySize] = useState(4)
  const [numberInCollege, setNumberInCollege] = useState(1)
  const [costOfAttendance, setCostOfAttendance] = useState(20000)

  function compute() {
    // Simplified, illustrative heuristic — not an official formula.
    const divisor = Math.max(1, familySize - numberInCollege + 1)
    const parentContribution = isIndependent ? 0 : (parentIncome * 0.12) / divisor
    const studentContribution = studentIncome * 0.5
    const estimatedEFC = Math.max(0, Math.round(parentContribution + studentContribution))
    const estimatedNeed = Math.max(0, Math.round(costOfAttendance - estimatedEFC))

    // Rough Pell-like heuristic: full award scales down as EFC increases.
    const MAX_PELL = 7395 // illustrative maximum (varies by year)
    const PELL_THRESHOLD = 25000 // heuristic threshold
    let estimatedPell = 0
    if (estimatedEFC < PELL_THRESHOLD) {
      estimatedPell = Math.round(MAX_PELL * (1 - estimatedEFC / PELL_THRESHOLD))
      estimatedPell = Math.min(estimatedPell, estimatedNeed)
    }

    return { estimatedEFC, estimatedNeed, estimatedPell }
  }

  const { estimatedEFC, estimatedNeed, estimatedPell } = compute()

  return (
    <section className="estimator">
      <h2>Federal Student Aid Estimator</h2>

      <p className="muted">This is a simplified, illustrative calculator — not an official FAFSA/SAI result.</p>

      <div className="form-grid">
        <label>
          Dependency status
          <select value={isIndependent ? 'independent' : 'dependent'} onChange={e => setIsIndependent(e.target.value === 'independent')}>
            <option value="dependent">Dependent (parents considered)</option>
            <option value="independent">Independent (parents not considered)</option>
          </select>
        </label>

        <label>
          Parent annual income
          <input type="number" value={parentIncome} onChange={e => setParentIncome(Number(e.target.value))} />
        </label>

        <label>
          Student annual income
          <input type="number" value={studentIncome} onChange={e => setStudentIncome(Number(e.target.value))} />
        </label>

        <label>
          Family size
          <input type="number" min={1} value={familySize} onChange={e => setFamilySize(Number(e.target.value))} />
        </label>

        <label>
          Number in college
          <input type="number" min={1} value={numberInCollege} onChange={e => setNumberInCollege(Number(e.target.value))} />
        </label>

        <label>
          Cost of attendance (annual)
          <input type="number" value={costOfAttendance} onChange={e => setCostOfAttendance(Number(e.target.value))} />
        </label>
      </div>

      <div className="results">
        <h3>Estimate</h3>
        <p><strong>Estimated family contribution (EFC/SAI - approx):</strong> ${estimatedEFC.toLocaleString()}</p>
        <p><strong>Estimated financial need:</strong> ${estimatedNeed.toLocaleString()}</p>
        <p><strong>Estimated Pell-like grant (illustrative):</strong> ${estimatedPell.toLocaleString()}</p>
      </div>

      <div className="explain">
        <h4>What this estimator does</h4>
        <p>
          Federal student aid (grants, loans, work-study) is awarded based on a student's financial situation as reported on
          the FAFSA. The government uses a calculated index (recently renamed SAI) to decide eligibility. This estimator uses
          a simple heuristic based on incomes and family size to show the idea of "need": how much of the cost of attendance
          could be left after a family contribution. It is not a substitute for filing the FAFSA.
        </p>
      </div>
    </section>
  )
}
