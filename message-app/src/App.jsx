import { useState } from 'react'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <Sidebar />

      <Routes>
        <Route path='/' element={
          !loggedIn
            ?
            <LoginPage />
            :
            <ContactsPage />
        } />
      </Routes>
    </>
  )
}

export default App
