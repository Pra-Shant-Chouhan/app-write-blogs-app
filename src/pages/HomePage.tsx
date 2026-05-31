import React from 'react'
import service from '../appwrite/config'
import PostCard from '../components/ui/PostCard'

const HomePage = () => {
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
    service.getPosts().then((res) => {
      if (res && res.documents && res.documents.length > 0) {
        setPosts(res.documents);
      }
    }).catch((error) => {
      console.error("Error on get posts => ", error)
    })
  }, [])
  if (posts.length > 0) {
    return (
      <div>
        <h1>Blogs</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.$id}>
              {/* <PostCard post={post} /> */}
              <PostCard {...post} />
            </li>
          ))}
        </ul>

      </div>
    )
  } else {
    <div>
      <h1>No Blogs Found</h1>
    </div>
  }

}

export default HomePage