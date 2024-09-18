import axiosInstance from '@/lib/axios-instance'

export const register = async ({
  fullName,
  email,
  password,
}: {
  fullName: string
  email: string
  password: string
}) => {
  const response = await axiosInstance.post('/auth/register', {
    fullName,
    email,
    password,
  })

  if (response.status !== 200) {
    throw new Error('Error')
  }

  return Promise.resolve(response.data)
}
