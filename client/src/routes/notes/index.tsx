import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { useQuery } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import type { AppType } from '../../../../server/index'

const client = hc<AppType>('/')

export const Route = createFileRoute('/notes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: notes,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await client.api.notes.$get()
      if (!res.ok) throw new Error('Failed to fetch notes')
      return res.json()
    },
  })
  return (
    <div className="flex flex-col items-center p-10">
      {isError && (
        <div role="alert" className="alert alert-error">
          <CircleX />
          <span>Error: {error.message}</span>
        </div>
      )}
      <div className="space-y-3 p-6">
        {isPending && (
          <div>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((_) => (
              <div className="flex items-center gap-2">
                <div className="skeleton h-6 w-6 rounded-full"></div>
                <div className="skeleton h-4 w-32 rounded-full"></div>
              </div>
            ))}
          </div>
        )}
        {notes &&
          notes.map((note) => (
            <div className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span>{note.title}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
