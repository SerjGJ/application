import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PersonalInfoForm } from './components/PersonalInfoForm'
import { AddressWorkForm } from './components/AddressWorkForm'
import { LoanParametersForm } from './components/LoanParametersForm'

const App: React.FC = () => {
  const [data, setData] = useState<any>({})

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={<PersonalInfoForm data={data} setData={setData} />}
          />
          <Route
            path="/address-work"
            element={<AddressWorkForm data={data} setData={setData} />}
          />
          <Route
            path="/loan-parameters"
            element={<LoanParametersForm data={data} setData={setData} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
