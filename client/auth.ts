import { CredentialsSignin } from '@auth/core/errors'
import { AxiosError } from 'axios'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import axiosInstance from './lib/axios-instance'

class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super()
    this.code = code
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await axiosInstance.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          })

          return res.data.user
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new InvalidLoginError(
              error.response?.status ? String(error.response?.status) : '500',
            )
          }

          return null
        }
      },
    }),
  ],
})
