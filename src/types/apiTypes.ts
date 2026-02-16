export type Requester = <T>(
  url: string,
  options?: Omit<RequestInit, "body"> & { body?: any },
) => Promise<T>;
