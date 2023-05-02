export interface PaginatedData<T> {
    totalElements: number;
    content: T[];
    totalPages : number;
    page : number;
    size : number;
  }
  