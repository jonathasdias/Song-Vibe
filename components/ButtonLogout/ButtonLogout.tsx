'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export default function ButtonLogout() {
  const router = useRouter()

  async function logout() {
    const supabase = createClient()

    await supabase.auth.signOut()

    router.push('/login')
    router.refresh()
  }

  return (
    <Button onClick={logout} variant="destructive">
      Sair
    </Button>
  )
}