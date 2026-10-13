import assert from "node:assert/strict"
import test from "node:test"
import { detailInsertionIndex } from "../src/lib/projectLayout.js"

const layouts = [
  { name: "All work", ids: [5, 6, 2, 4, 1, 3], expected: [0, 2, 2, 4, 4, 5], options: { featuredFirst: true } },
  { name: "Web", ids: [1, 3], expected: [1, 1] },
  { name: "Mobile", ids: [6, 2, 4], expected: [1, 1, 2] },
  { name: "POS", ids: [5], expected: [0] },
]

for (const { name, ids, expected, options } of layouts) {
  test(`${name}: desktop details follow the selected card's row`, () => {
    ids.forEach((id, index) => {
      assert.equal(detailInsertionIndex(ids, id, options), expected[index], `project ${id}`)
    })
  })

  test(`${name}: single-column details follow the selected card`, () => {
    ids.forEach((id, index) => {
      assert.equal(detailInsertionIndex(ids, id, { ...options, singleColumn: true }), index, `project ${id}`)
    })
  })
}

test("two-column layouts pair from the first card when it is not featured", () => {
  const ids = [5, 6, 2, 4, 1, 3]
  assert.deepEqual(ids.map(id => detailInsertionIndex(ids, id)), [1, 1, 3, 3, 5, 5])
})

test("absent selections and empty lists have no insertion point", () => {
  for (const options of [{}, { featuredFirst: true }, { singleColumn: true }, { featuredFirst: true, singleColumn: true }]) {
    assert.equal(detailInsertionIndex([], 5, options), -1)
    assert.equal(detailInsertionIndex([5, 6, 2], 99, options), -1)
    assert.equal(detailInsertionIndex([5, 6, 2], null, options), -1)
  }
})

test("finding a row leaves the project order unchanged", () => {
  const ids = Object.freeze([5, 6, 2, 4, 1, 3])
  assert.equal(detailInsertionIndex(ids, 1, { featuredFirst: true }), 4)
  assert.deepEqual(ids, [5, 6, 2, 4, 1, 3])
})
