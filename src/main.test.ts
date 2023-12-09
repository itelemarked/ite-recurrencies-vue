import { expect, test } from "vitest"
import { DateTime } from "./Recurrency/models/DateTime"


test('DateTime.diff(), test 1', () => {
  const dt1 = DateTime.create({dateString: '2023-06-01'})
  const dt2 = DateTime.create({dateString: '2023-06-02'})
  expect(DateTime.diff(dt1, dt2, 'days')).toBe(1)
})

test('DateTime.diff(), test 2', () => {
  const dt1 = DateTime.create({dateString: '2023-06-01'})
  const dt2 = DateTime.create({dateString: '2023-07-01'})
  expect(DateTime.diff(dt1, dt2, 'days')).toBe(30)
})

test('DateTime.diff(), test 3', () => {
  const dt1 = DateTime.create({dateString: '2023-06-01'})
  const dt2 = DateTime.create({dateString: '2027-06-01'})
  expect(DateTime.diff(dt1, dt2, 'months')).toBe(48)
})