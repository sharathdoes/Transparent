import React from 'react'
import { ChromeIcon as Google } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen  bg-[#2596be]  ">
      <Card className="w-full max-w-md ">
        <CardHeader className="text-center  ">
          <CardTitle className="text-2xl font-bold">Sign in to Transparent</CardTitle>
          <p className='text-sm'>Welcome back! Please sign in to continue</p>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input className="bg-gray-100 " id="email" type="email" placeholder="sharath@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input className="bg-gray-100 " id="password" type="password" placeholder="Minimum 8 characters" />
          </div>
          <Button className="w-full  bg-red-500 hover:bg-red-700 text-black">Sign In</Button>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Don't have an account?{' '}
            <a href="/sign-up" className="hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
