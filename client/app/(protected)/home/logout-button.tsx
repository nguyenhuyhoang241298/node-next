'use client'

import { Button } from '@/components/ui/button'
import { Share } from 'lucide-react'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant="outline"
      size="sm"
      className="ml-auto gap-1.5 text-sm"
    >
      <Share className="size-3.5" />
      Log out
    </Button>
  )
}

export default LogoutButton
