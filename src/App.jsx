import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobRecommendations from './comp/JobRecommendations'
import ResumeAnalyzer from './comp/ResumeAnalyzer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ResumeAnalyzer />
  )
}

export default App
