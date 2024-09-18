import { z } from 'zod'

export const PokemonSchema = z.object({
  name: z.string(),
  sprites: z.object({
    front_shiny: z.string(),
  }),
})

export type Pokemon = z.infer<typeof PokemonSchema>
