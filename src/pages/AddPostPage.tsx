import { Container } from "../components"
import BlogForm from "../components/blog-form/BlogForm"

const AddPostPage = () => {
    return (
        <div className="py-8">
            <Container>
                <BlogForm />
            </Container>
        </div>
    )
}

export default AddPostPage