export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    INVALID_DATA: 400,
    NOT_FOUND: 404,
    DUPLICATE: 409
  };
  return statusHTTPMap[status] ?? 500;
}