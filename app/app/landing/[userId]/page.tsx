"use client"
import React, { useEffect, useState } from 'react'
import Profile, { ProfileProps } from './ProfilePage'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { apiURL } from '@/app/utils'

const LandingPage = () => {
  const { userId } = useParams()
  const [user, setUser] = useState<ProfileProps>()
  
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<{user: ProfileProps}>(`${apiURL}/${userId}`)
      setUser(response.data.user)
  
    }
    fetchUser()
  }, [])
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-12">
      <Profile
        user={user} />
    </div>
  )
}

export default LandingPage