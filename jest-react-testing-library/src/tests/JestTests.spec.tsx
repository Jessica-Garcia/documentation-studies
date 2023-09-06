import { api } from '../lib/axios'

type CallbackTest = (data: string[]) => void

const fetchSelectedFruit = async (callbackTestFunction: CallbackTest) => {
  try {
    const { data } = await api.get('fruitList')
    callbackTestFunction(data)
  } catch (error) {
    throw new Error('error').message
  }
}

const fetchString = async () => {
  try {
    const { data } = await api.get('string')
    return data
  } catch (error) {
    throw new Error('error').message
  }
}

const throwErrorTestFetchString = async () => {
  try {
    const { data } = await api.get('strings')
    return data
  } catch (error) {
    throw new Error('error').message
  }
}

describe('Most common matchers', () => {
  // TOBE()
  it('toBe()', () => {
    // serve para testar igualdade exata
    expect(2 + 2).toBe(4)
  })

  // TOEQUAL()
  it('toEqual()', () => {
    // serve também para checar o valor de um objeto

    // ignora chaves de propriedades undefined
    const data = {
      name: 'John',
      age: 10,
      any: undefined,
      a: [undefined],
      b: 2,
    }

    expect(data).toEqual({
      name: 'John',
      age: 10,
      a: [undefined],
      b: 2,
    })

    // ignora itens undefined de array

    const arr = [undefined, 1]
    const arr2 = [undefined, undefined]
    // eslint-disable-next-line no-sparse-arrays
    expect(arr).toEqual([, 1])
    expect(arr2).toEqual([])
  })

  // TOSTRICTEQUAL()
  it('toStrictEqual()', () => {
    /**
     * serve para checar o valor, a estrutura e o typo exato dos objetos
     * leva em conta chaves de propriedades undefined
     * leva em conta items undefined de arrays
     */

    const data = {
      name: 'John',
      age: 10,
      any: undefined,
      a: [undefined],
      b: 2,
    }

    expect(data).toStrictEqual({
      name: 'John',
      age: 10,
      any: undefined,
      a: [undefined],
      b: 2,
    })

    const arr = [undefined, 1]
    const arr2 = [undefined, undefined]

    expect(arr).toStrictEqual([undefined, 1])
    expect(arr2).toStrictEqual([undefined, undefined])
  })

  // TOBECLOSETO

  it('toBeCloseTo()', () => {
    // serve para testar números com ponto flutuante

    const value = 0.12 + 0.22
    expect(value).toBeCloseTo(0.34)
  })

  // TOMATCHOBJECT(objetct)

  it('toMatchObject(objetct)', () => {
    /**
     * VERIFICA SE O OBJETO PASSADO PARA O toMatchObject() É UM
     * SUBCONJUNTO DO OBJETO PASSADO NO EXPECT
     * VERIFICA SE O OBJETO PASSADO NO EXPECT POSSUI AS PROPRIEDADES PASSADAS
     * NO toMatchObject()
     */

    const houseForSale = {
      bath: true,
      bedrooms: 4,
      kitchen: {
        amenities: ['oven', 'stove', 'washer'],
        area: 20,
        wallColor: 'white',
      },
    }
    const desiredHouse = {
      bath: true,
      kitchen: {
        amenities: ['oven', 'stove', 'washer'],
        wallColor: expect.stringMatching(/white|yellow/),
      },
    }

    expect(houseForSale).toMatchObject(desiredHouse)
  })
})

describe('async tests', () => {
  describe('return api data', () => {
    it('the data is string', async () => {
      const data = await fetchString()
      expect(data[0]).toBe('string')
    })

    it('the data is string 2', async () => {
      return expect(fetchString()).resolves.toContain('string')
    })
  })

  describe('return api error', () => {
    it('the fetch fails with an error', async () => {
      await expect(throwErrorTestFetchString()).rejects.toMatch('error')
    })

    it('the fetch fails with an error 2', async () => {
      expect.assertions(1)

      return throwErrorTestFetchString().catch((e) =>
        expect(e).toMatch('error'),
      )
    })

    it('the fetch fails with an error 3', async () => {
      expect.assertions(1)

      try {
        await throwErrorTestFetchString()
      } catch (e) {
        expect(e).toMatch('error')
      }
    })
  })
})

// + ou -
describe('async tests callback', () => {
  it('data is damasco', (done) => {
    function callback(data: string[]) {
      try {
        const damasco = data.filter((d) => d === 'damasco')
        expect(damasco[0]).toBe('damasco')
        done()
      } catch (error) {
        done(error)
      }
    }

    fetchSelectedFruit(callback)
  })
})
