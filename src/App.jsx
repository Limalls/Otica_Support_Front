import { Routes, Route } from 'react-router-dom'

function Home() {
  return <h1 className="p-6 text-2xl font-bold">Ótica Support</h1>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}