export interface Filter {
    search: {
        key: string;
        value: any;
    }[];
    fromDate?: string;
    toDate?: string;
    page: number;
    size: number;
}

export interface PageFilter {
    page: number;
    size: number;
}



