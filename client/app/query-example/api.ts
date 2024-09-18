import { PokemonSchema } from './type'

export const getPokemonData = async ({
  count,
  ...other
}: {
  count: number
}) => {
  console.log('count', count)
  console.log('other', other)

  const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')

  if (!response.ok) {
    throw new Error('Lỗi api')
  }

  const data = await response.json()
  const safeParse = PokemonSchema.safeParse(data)

  if (!safeParse.success) {
    throw safeParse.error
  }

  return Promise.resolve(safeParse.data)
}
