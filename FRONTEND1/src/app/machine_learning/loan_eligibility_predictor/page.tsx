'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import './loanpage.css'; 

type FormData = {
  no_of_dependents: number | string;
  income_annum: number | string;
  loan_amount: number | string;
  loan_term: number | string;
  residential_assets_value: number | string;
  commercial_assets_value: number | string;
  luxury_assets_value: number | string;
  bank_asset_value: number | string;
  education: string;
  self_employed: string;
};

type PredictionResult = {
  loan_eligibility: string;
  risk_level?: string;
  advice?: string;
  summary?: string;
};

export default function LoanPage() {
  const [formData, setFormData] = useState<FormData>({
    no_of_dependents: '',
    income_annum: '',
    loan_amount: '',
    loan_term: '',
    residential_assets_value: '',
    commercial_assets_value: '',
    luxury_assets_value: '',
    bank_asset_value: '',
    education: '',
    self_employed: '',
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string>('');
  const [visible, setVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formattedData: Record<string, string | number> = { ...formData };
    for (let key in formattedData) {
      formattedData[key] = isNaN(Number(formattedData[key])) ? formattedData[key] : Number(formattedData[key]);
    }

    try {
      const res = await fetch("http://localhost:8000/loan_eligibility_predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data: PredictionResult = await res.json();
      setResult(data);
      setError('');
      setVisible(true);
    } catch (err) {
      setError("❌ Error connecting to backend.");
      setResult(null);
      setVisible(true);
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Loan Eligibility Predictor</h1>
      <form onSubmit={handleSubmit} id="loanForm">
        {Object.entries(formData).map(([key, value]) => {
          if (key === "education" || key === "self_employed") return null;
          return (
            <input
              key={key}
              type="number"
              name={key}
              placeholder={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              value={value}
              onChange={handleChange}
              required
            />
          );
        })}

        <select name="education" value={formData.education} onChange={handleChange} required>
          <option value="">Select Education</option>
          <option value="graduate">Graduate</option>
          <option value="not graduate">Not Graduate</option>
        </select>

        <select name="self_employed" value={formData.self_employed} onChange={handleChange} required>
          <option value="">Self Employed?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <button type="submit">Predict</button>
      </form>

      <div className={`result ${visible ? 'visible' : ''}`}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {result && (
          <div className="result-card">
            <h2>Status: <span className={result.loan_eligibility.includes('Eligible') ? 'approved' : 'denied'}>
              {result.loan_eligibility}
            </span></h2>
            <p><strong>Risk Level:</strong> {result.risk_level || 'N/A'}</p>
            <p><strong>Advice:</strong> {result.advice || 'N/A'}</p>
            <p><strong>Summary:</strong> {result.summary || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
