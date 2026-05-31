import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import service from '../appwrite/config';
import { Container } from '../components';
import BlogForm from '../components/blog-form/BlogForm';

const EditPostPage = () => {
    const [post, setPost] = React.useState(null);
    const { slug } = useNavigate();
    useEffect(() => {
        service.getPost(slug).then((data) => {
            if (data) {
                setPost(data)
            }
        })
    }, [slug]);
    return post ? (<div>
        <Container>
            <BlogForm post={post} />
        </Container>

    </div>) : <div>No post Found</div>
}

export default EditPostPage