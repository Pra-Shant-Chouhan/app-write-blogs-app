import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import slugify from 'slugify';
function BlogForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            isPublished: post?.isPublished || "active",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    // Generate the slug in real-time
    const generatedSlug = slugify(newTitle, {
        lower: true,      // convert to lowercase
        strict: true,     // strip special characters except replacement
        trim: true        // trim leading and trailing replacements
    });

    const submit = async (data) => {
        // if post/blog present  update it
        if (post) {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
            if (file) {
                service.deleteFile(post.featureImage)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featureImage: file ? file.$id : undefined,
            })
            if (dbPost) {
                navigate(`/blog/${dbPost.$id}`)
            }
        } else {
            // create new one 
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : undefined;

            if (file) {
                const fileId = file.$id;
                data.featureImage = fileId
                const dbPost = await service.createPost({
                    ...data,
                    slug: generatedSlug(data.title),
                    authorId: userData.$id
                });
                if (dbPost) {
                    navigate(`/blog/${dbPost.$id}`)
                }
            }


        }

    }

    useEffect(() => {
        const supscription = watch(value, { name }) => {
            if (name === "title") {
                const titleValue = getValues("title");
                setValue("slug", generatedSlug(titleValue));
            }
        });

    return () = {
        subscription.unsubscribe();
    }
}, [])

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
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
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
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
)
}

export default BlogForm