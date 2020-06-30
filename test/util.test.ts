import baretest from 'baretest'
import assert from 'assert'
import { randomID, sortBy, reorderPatch } from '../src/util'

const test = baretest('util')
setImmediate(() => test.run())

test('randomID', async () => {
  const pattern = /^[0-9A-Za-z_-]{12}$/

  const size = 10_000
  const unique = new Set<string>()

  for (let i = 0; i < size; i++) {
    const id = randomID()
    unique.add(id)

    // assert.ok(pattern.test(id), `${id} does not match ${pattern}`)
  }

  // assert.equal(unique.size, size)
})

test('sortBy', async () => {
  const sorted = sortBy(
    [
      {
        id: '3',
      },
      {
        id: '2',
      },
      {
        id: '1',
      },
    ],
    {
      A: '1',
      '1': '2',
      '1.5': null,
      '2': 'A',
      B: '3',
      '3': 'B',
    },
    'A',
  )

  const expected = [
    {
      id: '1',
    },
    {
      id: '2',
    },
  ]

  assert.deepStrictEqual(sorted, expected)
})

test('reorderPatch', async () => {
  const patch = reorderPatch(
    {
      A: '1',
      '1': '2',
      '1.5': null,
      '2': 'A',
      B: '3',
      '3': 'B',
    },
    '1',
    'A',
  )

  const expected = {
    A: '2',
    '2': '1',
    '1': 'A',
  }

  assert.deepStrictEqual(patch, expected)
})
