export interface Response<T = void> {
    code: string;
    success: boolean;
    data: T;
    message: string;
}

export interface LoginAccessResponse<T = void> {
    code: string;
    success: boolean;
    obj: T;
    message: string;
}

export interface SearchResponse<T = void> {
    request: {
        object: T;
        totalCount: number;
    }
}

export interface FieldError {
    field: string;
    message: string;
}

export interface ErrorResponse extends Response {
    apiErrors?: FieldError[];
    developerMessage?: any;
}

