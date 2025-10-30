import type { Vehicle } from '@/types/vehicle'
import { delay } from '@/utils/delay'

type Response = Vehicle[]

const defaultVehicles: Vehicle[] = [
  {
    id: 1,
    chassi: '|||||||||||||||||',
    brand: 'A Rainha Vermelha',
    model: 'Victoria Aveyard',
    year: 2015,
  },
  {
    id: 2,
    chassi: '|||||||||||',
    brand: 'Amor e Gelato',
    model: 'Jenna Evans',
    year: 2016,
  },
  {
    id: 3,
    chassi: '||||||||||||||||||||',
    brand: 'O Príncipe Cruel',
    model: 'Holly Black',
    year: 2018,
  },
]

const execute = async (): Promise<Response> => {
  await delay()

  const list = localStorage.getItem('vehicle-list')

  if (!list) {
    localStorage.setItem('vehicle-list', JSON.stringify(defaultVehicles))
    return defaultVehicles
  }

  return JSON.parse(list)
}

export const getEndpoint = {
  execute: execute,
}
