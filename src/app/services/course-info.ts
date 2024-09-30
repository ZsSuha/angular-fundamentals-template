export interface CourseDTO {
    id?: string,
    title?: string,
    description?: string,
    duration?: number,
    authors?: Author[],
    creationDate?: Date,
    editable?: boolean
}
export interface Course {
    id?: string,
    title?: string,
    description?: string,
    duration?: number,
    authors?: string[],
    creationDate?: Date,
    editable?: boolean
}
export interface Author {
    id?: string,
    name?: string
}