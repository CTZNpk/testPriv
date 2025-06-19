"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to signin page since we handle both modes there
    router.replace("/auth/signin")
  }, [router])

  return null
}
