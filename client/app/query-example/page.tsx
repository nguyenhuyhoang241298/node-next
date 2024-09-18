'use client'

import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPokemonData } from './api'

const Page = () => {
  const [count, setCount] = useState(1)

  const { isLoading, isError, isFetching, data } = useQuery({
    queryKey: ['query-example', { count }],
    queryFn: () => getPokemonData({ count }),
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
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>Click me!</Button>
    </div>
  )
}

export default Page
