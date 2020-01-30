const test = require('ava')
const { calculateScore } = require('../lib/scoring')

test('calculateScore returns 100 when no hints seen', t => {
  const progress = { current_task: 1 }
  const tasks = { 1: { hints: [{ test: 'a hint', penalty: 10 }] } }

  const score = calculateScore(progress, tasks)
  t.is(score, 100, 'should have returned score of 100')
})

test('calculateScore returns correct score when one hint seen', t => {
  const progress = { current_task: 1, 1: 0 }
  const tasks = { 1: { hints: [{ test: 'a hint', penalty: 10 }] } }

  const score = calculateScore(progress, tasks)
  t.is(score, 90, 'should have returned score of 90')
})

test('calculateScore returns correct score when several hints seen', t => {
  const progress = { current_task: 1, 1: 1 }
  const tasks = { 1: { hints: [{ test: 'a hint', penalty: 10 }, { test: 'a hint', penalty: 7 }] } }

  const score = calculateScore(progress, tasks)
  t.is(score, 83, 'should have returned max score subtracted by sum of hints seen')
})
