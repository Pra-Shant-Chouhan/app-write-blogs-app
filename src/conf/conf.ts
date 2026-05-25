const conf = {
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_END_POINT),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBlogsCollectionId:String(import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf;