import { eq } from '@briancavalier/assert'
import { mockStorage } from './mockStorage'

describe(`mockStorage`, () => {
  it(`implements Storage interface`, () => {
    const storage: Storage = mockStorage()

    storage.setItem('foo', 'bar')
    eq('bar', storage.getItem('foo'))
  })
})
