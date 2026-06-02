import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }: { email: string; password: string; name: string }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // login on register
                return this.login({ email, password })
            }
            return null
        } catch (err) {
            throw err
        }
    }

    async login({ email, password }: { email: string; password: string }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password)
            return session
        } catch (err) {
            throw err
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Error on get current user ${error}`)
            return null
        }
    }
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(`Error on user LOGOUT ${error}`)

        }
    }
}
const authService = new AuthService();

export default authService