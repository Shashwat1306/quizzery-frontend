import Header from './shared/components/Header'
import './App.css'
import AppRoutes from './shared/routes/AppRoutes'

function App() {
  return(
    <div className='flex flex-col h-screen'>
      <Header/>
      <AppRoutes />
    </div>
  )
}

export default App
