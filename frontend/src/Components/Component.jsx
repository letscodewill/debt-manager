import { useContext } from 'react'
import { Context } from '../contexts/Context'

export default function Component() {
  const [signedIn, setSignedIn, user] = useContext(Context)

  return (
    <div>
      <p>Logged: {signedIn ? '✅ Yes' : '❌ No'}</p>
      <p>User: {user.name}</p>
    </div>
  )
}