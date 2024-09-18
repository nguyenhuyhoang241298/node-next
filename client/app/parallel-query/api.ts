import { PokemonSchema } from './type'

export const getPokemonDataById = async ({ id }: { id: number }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

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
