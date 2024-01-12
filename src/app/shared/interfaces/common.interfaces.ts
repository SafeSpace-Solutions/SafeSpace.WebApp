import { UserGender, UserRoles as UserRole } from "../enums/common.enums";

export interface User{
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: UserGender;
    role: UserRole;
    dateOfJoining: Date;
    jwt: string;
}