import { useEffect, useState } from "react"
import { Container } from "../components"
import service from "../appwrite/config";
import PostCard from "../components/ui/PostCard";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((data) => {

      if (data) {
        setPosts(data.documents)
      }
    }
    );
  }, [])

  return (
    <Container>
      {
        posts.map((post) => (
          <div key={post.$id}>
            <PostCard post={post} />
          </div>)
        )
      }
    </Container>
  )
}

export default AllPostsPage