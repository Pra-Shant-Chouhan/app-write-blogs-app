import { Client, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

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
    async createPost({ title, slug, content, featureImage, isPublished, authorId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
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

    async updatePost(slug, { title, content, isPublished, featureImage }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    isPublished
                }
            )
        } catch (error) {
            console.error(`error on update Blog->${error}`)
        }

    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                slug
            )
        } catch (error) {
            console.error(`error on delete Blog->${error}`)
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogsCollectionId,
                slug
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
                10,
            )
        } catch (error) {
            console.error("Error on get Published Blog", error)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error (`Error on upload file => ${error}`)
            return null
        }
    }

    async deleteFile(fileId){
        try {
             this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.error (`Error on delete file => ${error}`)
            return false
        }
    }
    
    getFilePreview (fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service()
export default service