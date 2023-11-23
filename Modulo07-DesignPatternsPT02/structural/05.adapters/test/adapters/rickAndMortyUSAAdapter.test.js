import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAADapter'

describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => jest.clearAllMocks())
  test('#getCharacter should be an adapter from RickAndMortyUSA', async () => {
    const usaIntegrations = jest.spyOn(
      RickAndMortyUSA,
      RickAndMortyUSA.getCharactersFromXML.name
    ).mockResolvedValue([])
    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(result).toEqual([])
    expect(usaIntegrations).toHaveBeenCalled()
  })


})