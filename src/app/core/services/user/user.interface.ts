export class User {

    id: string;
    avatar: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    roles: string[];

    constructor(user: any) {
        this.id = user?.id || '';
        this.avatar = user?.avatar || '';
        this.firstname = user?.firstname || '';
        this.lastname = user?.lastname || '';
        this.email = user?.email || '';
        this.password = user?.password || '';
        this.role = user?.role || '';
        this.roles = user?.roles || '';
    }
}