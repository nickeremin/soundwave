import { useSearchParams } from "next/navigation"

export function useSearch() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")
  return query
}
