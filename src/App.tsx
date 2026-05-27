
import { useEffect, useState } from 'react'
import './index.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().
      then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData }))
        } else {
          dispatch(logout())
        }
      }
      )
      .catch((error) => {
        // dispatch(logout())
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return !loading ? (
    <>
      <div className="min-h-dvh flex flex-wrap content-between bg-gray-400">
        <div className="w-full">
          <Header />
          <main>
            {/* <Outlet/>    */}
            <h1>Hello World!</h1>
          </main>
          <Footer />
        </div>
      </div>

    </>
  )


    : (<>
      {/* loading Component */}
      <div>Loading</div>
    </>);
}

export default App
