import { useQuery } from '@tanstack/react-query'
import { getPokemonDataById } from './api'

const Child = () => {
  const test = useQuery({
    queryKey: ['parallel-24-query-example'],
    queryFn: () => getPokemonDataById({ id: 24 }),
  })
  return <div>Child</div>
}

export default Child
