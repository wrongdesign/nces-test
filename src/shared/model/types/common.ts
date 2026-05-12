export interface StandardObject {
    code: string;
    label: string;
}

export interface StandardObjectWithClassNames extends StandardObject {
    classNames?: string;
}

export interface Pagination {
    page: number;
    limit: number;
}