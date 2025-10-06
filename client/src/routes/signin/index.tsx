import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { CircleX, Lock, Mail } from 'lucide-react'

import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/signin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (session) {
    router.navigate({ to: '/notes' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await authClient.signIn.email({
        email,
        password,
      })

      router.navigate({ to: '/notes' })
    } catch (err) {
      setError(`An unexpected error occured`)
      console.log('Signup failed')
    }
  }
  return (
    <div className="bg-base-100 flex items-center justify-center pt-10">
      <div className="card bg-base-300 p-4">
        <div className="card-body w-lg">
          <div className="card-title text-2xl">Log In</div>
          <p className="my-2 text-base-content/70 ">Please sign in</p>
          {error && (
            <div role="alert" className="alert alert-error">
              <CircleX />
              <span>Error: {error}</span>
            </div>
          )}
          <form
            action=""
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
          >
            <div className="">
              <label className="input validator w-full">
                <Mail />
                <input
                  id="email"
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">Enter valid email address</p>
            </div>
            <div className="">
              <label className="input validator w-full">
                <Lock />
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Password"
                  minLength={8}
                  title="Must be more than 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">
                Must be 8 characters, number, lowercase & uppercase letter
              </p>
            </div>

            <div className="card-actions">
              <button type="submit" className="btn btn-primary mt-2 w-full">
                Sign In
              </button>
            </div>
            <div className="">
              <p className="text-center text-base-content/70">
                Don't have an account?{' '}
                <Link className="link link-primary" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
