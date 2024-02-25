export interface PaginatedEntity<T> {
    page: number;
    count: number;
    limit: number;
    data: T[];
}