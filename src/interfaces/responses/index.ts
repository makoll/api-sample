export interface TDefaultResponse<T> {
  data: T;
}

export const createDefaultResponse = <T>(data: T): TDefaultResponse<T> => {
  return { data };
};
