import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import slugify from 'slugify';

// FIX: Import Post interface from config for proper type safety
// Import ID from appwrite for unique document ID generation
import { type Post } from '../../appwrite/config'
import { ID } from 'appwrite'
import Button from '../ui/Button'
import Select from '../ui/Select'
import Input from '../ui/Input'
import RTE from '../RTE'

// FIX: Add explicit type annotation for post prop (Post | undefined)
// This ensures TypeScript knows what properties are available on post
interface BlogFormProps {
    post?: Post & { $id?: string; $createdAt?: string; $updatedAt?: string }
}

function BlogForm({ post }: BlogFormProps) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm<Post>({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            isPublished: post?.isPublished || "active",
            featureImage: post?.featureImage || "",
            authorId: post?.authorId || "",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    // FIX: Correct watch syntax - it takes a callback function with values param
    // Watch title field and auto-generate slug whenever title changes
    // This ensures slug is always in sync with the title
    useEffect(() => {
        // FIX: Correct watch callback signature - watch returns unsubscribe function directly
        const subscription = watch((value) => {
            if (value.title) {
                // Generate slug from title in real-time
                const newSlug = slugify(value.title, {
                    lower: true,      // convert to lowercase
                    strict: true,     // strip special characters except replacement
                    trim: true        // trim leading and trailing replacements
                });
                setValue("slug", newSlug);
            }
        });

        // FIX: Correct cleanup syntax - watch returns unsubscribe function, call it directly
        return () => subscription();
    }, [watch, setValue])

    // FIX: Add explicit type annotation for form data matching Post interface
    // This ensures type safety when accessing form data properties
    const submit = async (data: Post & { image?: FileList }) => {
        try {
            // if post/blog present - update it
            if (post) {
                // FIX: Properly await file upload before using it
                const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
                if (file && post.featureImage) {
                    service.deleteFile(post.featureImage)
                }
                // FIX: Pass correct document ID (post.$id) instead of slug, and handle isPublished field
                const dbPost = await service.updatePost(post.$id || "", {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    isPublished: data.isPublished,
                    featureImage: file ? file.$id : post.featureImage,
                })
                if (dbPost) {
                    navigate(`/blog/${dbPost.$id}`)
                }
            } else {
                // create new blog post
                const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : undefined;

                if (file) {
                    const fileId = file.$id;
                    // FIX: Use ID.unique() from appwrite to generate unique document ID for createPost
                    const dbPost = await service.createPost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        featureImage: fileId,
                        isPublished: data.isPublished,
                        authorId: userData.$id
                    }, ID.unique());
                    if (dbPost) {
                        navigate(`/blog/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.error("Blog form submission error:", error)
        }
    }

return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={service.getFilePreview(post.featureImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            {/* FIX: Changed field name from "status" to "isPublished" to match Post interface */}
            {/* FIX: Register field properly with correct key name */}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("isPublished", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
)
}


export default BlogForm