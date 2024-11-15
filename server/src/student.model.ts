export type StudentType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    updatedAt: Date,
    city?: string,
    batch?: string,
    gender?: GenderEnum,
    occupation?: string
}

export type StudentUpdateType = {
    firstName: string,
    lastName: string,
    email: string,
    updatedAt: Date,
    city?: string,
    batch?: string,
    gender?: GenderEnum,
    occupation?: string,
    classId?: string
}

enum GenderEnum {
    Male,
    Female
}