import { expect, describe, test, jest, beforeEach, beforeAll, afterAll } from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from './../../src/createLayers.js'
describe('#Integration - Layers  - Folders Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    //sort pois o sistema retorna em ordem alfabética
    layers: ['service', 'factory', 'repository'].sort()
  }
  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
  })
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })
  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  test('#should not create folders if it exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)
    //run
    await createLayersIfNotExists(config)
    const afterRun = await getFolders(config)
    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })
  test('#should  create folders if it not exists', async () => {
    const beforeRun = await getFolders(config)
    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)
    expect(afterRun).toEqual(beforeRun)
  })

})

async function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder))
}
