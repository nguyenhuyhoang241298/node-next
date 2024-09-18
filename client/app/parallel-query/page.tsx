'use client'

import { useQuery } from '@tanstack/react-query'
import { getPokemonDataById } from './api'

const Page = () => {
  const { isLoading, isError, isFetching, data } = useQuery({
    queryKey: ['parallel-25-query-example'],
    queryFn: () => getPokemonDataById({ id: 25 }),
    select: (data) => {
      console.log('data', data)
      return data
    },
  })

  const test = useQuery({
    queryKey: ['parallel-25-query-example'],
    queryFn: () => getPokemonDataById({ id: 24 }),
    select: (data) => {
      console.log('data', data)
      return data
    },
  })

  if (isLoading) {
    console.log('isLoading', isLoading)
    return <p>Loading</p>
  }

  if (isError || !data) return <p>Error</p>

  if (isFetching) {
    console.log('isFetching', isFetching)
  }

  return (
    <div className="flex flex-col gap-4">
      <figure>
        <img src={data.sprites.front_shiny} height={200} alt={data.name} />
        <h2>Im {data.name}</h2>
      </figure>
    </div>
  )
}

export default Page
