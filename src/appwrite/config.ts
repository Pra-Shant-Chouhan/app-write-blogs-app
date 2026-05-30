import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

// FIX: Add export keyword to Post interface so it can be imported in BlogForm component
// This ensures type consistency across the application
export interface Post {
    title: string;
    slug: string;
    content: string;
    featureImage: string;
    isPublished: string;
    authorId: string;
}
export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }
    //  db field -title, content, authorId, publishedDate,isPublished,category,featureImage
    // FIX: Add documentId parameter to createPost for explicit document ID control
    // This matches the ID.unique() generated ID from the component
    async createPost({ title, slug, content, featureImage, isPublished, authorId }: Post, documentId: string) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                documentId,
                {
                    title,
                    slug,
                    content,
                    featureImage,
                    isPublished,
                    authorId
                }
            )

        } catch (error) {
            console.error("Appwrite create post error=>", error)
        }

    }

    // FIX: Renamed parameter from "slug" to "docId" since it's actually a document ID, not a slug
    // This clarifies that updatePost uses document ID (from $id field), not the slug field
    async updatePost(docId: string, { title, content, isPublished, featureImage, slug }: Partial<Post>) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                docId,
                {
                    title,
                    slug,
                    content,
                    featureImage,
                    isPublished
                }
            )
        } catch (error) {
            console.error(`error on update Blog->${error}`)
        }

    }

    // FIX: Renamed parameter from "slug" to "docId" for consistency
    // All database operations should use the document ID ($id), not the slug field
    async deletePost(docId: string) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                docId
            )
        } catch (error) {
            console.error(`error on delete Blog->${error}`)
        }
    }

    // FIX: Renamed parameter from "slug" to "docId" for consistency
    async getPost(docId: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                docId
            )
        } catch (error) {
            console.log("Get Post, error-", error)
        }
    }

    async getPosts(queries = [Query.equal("isPublished", "Yes")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                queries,
                "10",
            )
        } catch (error) {
            console.error("Error on get Published Blog", error)
        }
    }

    async uploadFile(file:File) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error(`Error on upload file => ${error}`)
            return null
        }
    }

    async deleteFile(fileId:string) {
        try {
            this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.error(`Error on delete file => ${error}`)
            return false
        }
    }

    getFilePreview(fileId:string) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service()
export default service