import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from './store/store.ts'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage.tsx'
import AuthLayout from './components/AuthLayout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import AllPostsPage from './pages/AllPostsPage.tsx'
import PostPage from './pages/PostPage.tsx'
import AddPostPage from './pages/AddPostPage.tsx'
import EditPostPage from './pages/EditPostPage.tsx'
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/login", element: (
        <AuthLayout authentication={false}>
          <LoginPage />
        </AuthLayout>
      )},
      {path: "/signup", element: (
        <AuthLayout authentication={false}>
          <SignupPage />
        </AuthLayout>
      )},
      {path: "/all-posts", element: (
        <AuthLayout authentication={true}>
          <AllPostsPage />
        </AuthLayout>
      )},
      {path: "/add-post", element: (
        <AuthLayout authentication={true}>
          <AddPostPage />
        </AuthLayout>
      )},
      {path: "/edit-post/:slug", element: (
        <AuthLayout authentication={true}>
          <EditPostPage />
        </AuthLayout>
      )},

      {path: "/post/:slug", element: (
        <AuthLayout authentication>
          <PostPage />
        </AuthLayout>
      )},
    ]
  },
])
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />

  </Provider>
  // </StrictMode>,
)
