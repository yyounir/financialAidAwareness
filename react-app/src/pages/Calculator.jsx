import React from 'react'
import FederalAidEstimator from '../components/FederalAidEstimator'

export default function Calculator() {
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Federal Aid Calculator</h2>
        <a className="button" href="#/">Back to home</a>
      </div>

      <img className="section-image" src="/original.jpg" alt="calculator illustration" />

      <FederalAidEstimator />
    </div>
  )
}
