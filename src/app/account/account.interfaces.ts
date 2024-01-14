export interface RegisterModel{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    email: string;
    password: string;
    role: string;
}

export interface LoginModel{
    email: string;
    password: string;
}

export interface ResetPasswordModel {
    token: string;
    email: string;
    newPassword: string;
}