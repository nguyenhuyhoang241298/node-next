'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { register } from './api'

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

const formSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: 'Required' })
      .max(256, { message: 'Max 256 character' }),
    email: z.string().email('Invalid email'),
    password: z.string().regex(passwordRegex, {
      message:
        'Password must be at least 8 characters, 1 uppercase letter, 1 number, 1 special character',
    }),
    confirmPass: z.string().regex(passwordRegex, {
      message:
        'Password must be at least 8 characters, 1 uppercase letter, 1 number, 1 special character',
    }),
  })
  .refine((obj) => obj.password === obj.confirmPass, {
    message: 'The confirm password does not match',
  })

export default function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPass: '',
    },
  })

  const registerUser = useMutation({
    mutationFn: register,
    onSuccess() {
      toast.success('Registering successfully')
      router.push('/login')
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser.mutateAsync(values)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type={'password'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type={'password'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={registerUser.isPending}
              type="submit"
              className="w-full"
            >
              Create an account
            </Button>
          </form>
        </Form>

        <div className="grid gap-4 mt-4">
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
