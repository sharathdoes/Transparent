'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignUp() {
  const [role, setRole] = useState('')
  const [showCompanyId, setShowCompanyId] = useState(false)

  const handleRoleChange = (value) => {
    setRole(value)
    setShowCompanyId(value === 'team_lead' || value === 'employee')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2596be]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign up to Transparent</CardTitle>
            <p className='text-center text-sm'>Welcome to Transparent! Please sign up</p>
                </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Enter your username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="example@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Minimum 8 characters" required />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Minimum 8 characters" required />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="hr ">HR</SelectItem>
                  <SelectItem value="team_lead">Team Lead</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {showCompanyId && (
              <div className="space-y-2">
                <Label htmlFor="companyId">Company ID</Label>
                <Input id="companyId" name="companyId" placeholder="Enter your company ID" required />
              </div>
            )}
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-black">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm w-full">
            Already have an account?{' '}
            <a href="/sign-in" className=" hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

