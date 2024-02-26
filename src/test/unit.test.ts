import {
	TooltipData,
	areArraysEqual,
	combineWithoutDuplicates,
	formatTooltip,
	getSymbol,
	parseEndChild,
	splitVariables
} from '../utils/utils'

import { DataSourceVariable } from '../store/types'

describe('combineWithoutDuplicates', () => {
	test('combines non-empty arrays with unique values', () => {
		const arrayA = ['apple', 'banana']
		const arrayB = ['orange', 'grape']
		const expected = ['apple', 'banana', 'orange', 'grape']
		expect(combineWithoutDuplicates(arrayA, arrayB)).toEqual(
			expect.arrayContaining(expected)
		)
		expect(combineWithoutDuplicates(arrayA, arrayB).length).toBe(expected.length)
	})

	test('returns an empty array when both inputs are empty', () => {
		expect(combineWithoutDuplicates([], [])).toEqual([])
	})

	test('removes duplicates within arrays', () => {
		const arrayA = ['apple', 'apple']
		const arrayB = ['orange', 'orange']
		const expected = ['apple', 'orange']
		expect(combineWithoutDuplicates(arrayA, arrayB)).toEqual(
			expect.arrayContaining(expected)
		)
		expect(combineWithoutDuplicates(arrayA, arrayB).length).toBe(expected.length)
	})

	test('removes duplicates across arrays', () => {
		const arrayA = ['apple', 'banana']
		const arrayB = ['banana', 'orange']
		const expected = ['apple', 'banana', 'orange']
		expect(combineWithoutDuplicates(arrayA, arrayB)).toEqual(
			expect.arrayContaining(expected)
		)
		expect(combineWithoutDuplicates(arrayA, arrayB).length).toBe(expected.length)
	})

	test('correctly combines when one array is empty', () => {
		const arrayA: string[] = []
		const arrayB = ['apple', 'banana']
		expect(combineWithoutDuplicates(arrayA, arrayB)).toEqual(
			expect.arrayContaining(arrayB)
		)
		expect(combineWithoutDuplicates(arrayB, arrayA)).toEqual(
			expect.arrayContaining(arrayB)
		)
	})
})

describe('areArraysEqual', () => {
	test('returns false for two empty arrays', () => {
		expect(areArraysEqual([], [])).toBe(false)
	})

	test('returns true for arrays with the same elements in the same order', () => {
		const arrayA = ['apple', 'banana']
		const arrayB = ['apple', 'banana']
		expect(areArraysEqual(arrayA, arrayB)).toBe(true)
	})

	test('returns true for arrays with the same elements in a different order', () => {
		const arrayA = ['banana', 'apple']
		const arrayB = ['apple', 'banana']
		expect(areArraysEqual(arrayA, arrayB)).toBe(true)
	})

	test('returns false when one array is empty and the other is not', () => {
		const arrayA = ['apple']
		const arrayB: string[] = []
		expect(areArraysEqual(arrayA, arrayB)).toBe(false)
	})

	test('returns false for arrays with different elements', () => {
		const arrayA = ['apple']
		const arrayB = ['orange']
		expect(areArraysEqual(arrayA, arrayB)).toBe(false)
	})

	test('returns false for arrays with the same elements but different frequencies', () => {
		const arrayA = ['apple', 'apple']
		const arrayB = ['apple']
		expect(areArraysEqual(arrayA, arrayB)).toBe(false)
	})
})

describe('parseEndChild', () => {
	test('combines non-overlapping arrays without duplicates', () => {
		const input = {
			name: 'TestName',
			getConditionsPlaceholders: ['a', 'b'],
			getPlaceholdersWithoutConditions: ['c', 'd']
		}
		const expected = {
			name: 'TestName',
			value: ['a', 'b', 'c', 'd']
		}
		expect(parseEndChild(input)).toEqual(expected)
	})

	test('combines overlapping arrays and removes duplicates', () => {
		const input = {
			name: 'TestName',
			getConditionsPlaceholders: ['a', 'b', 'c'],
			getPlaceholdersWithoutConditions: ['c', 'd', 'e']
		}
		const expected = {
			name: 'TestName',
			value: ['a', 'b', 'c', 'd', 'e']
		}
		expect(parseEndChild(input)).toEqual(expected)
	})
})

describe('splitVariables', () => {
	const sampleVariables: DataSourceVariable[] = [
		{ id: '1', name: 'Var1', placeholderName: 'Placeholder1' },
		{ id: '2', name: 'Var2', placeholderName: 'Placeholder2' },
		{ id: '3', name: 'Var3', placeholderName: 'Placeholder3' }
	]

	test('splits variables correctly when all match selected nodes', () => {
		const selectedNode = ['Placeholder1', 'Placeholder2', 'Placeholder3']
		const expected = [sampleVariables, []]
		expect(splitVariables(sampleVariables, selectedNode)).toEqual(expected)
	})

	test('splits variables correctly when none match selected nodes', () => {
		const selectedNode = ['Placeholder4']
		const expected = [[], sampleVariables]
		expect(splitVariables(sampleVariables, selectedNode)).toEqual(expected)
	})

	test('splits variables correctly when some match selected nodes', () => {
		const selectedNode = ['Placeholder1', 'Placeholder3']
		const expected = [
			[sampleVariables[0], sampleVariables[2]],
			[sampleVariables[1]]
		]
		expect(splitVariables(sampleVariables, selectedNode)).toEqual(expected)
	})

	test('returns two empty arrays when variables array is empty', () => {
		const selectedNode = ['Placeholder1', 'Placeholder2', 'Placeholder3']
		const expected = [[], []]
		expect(splitVariables([], selectedNode)).toEqual(expected)
	})

	test('places all variables in the second sub-array when selectedNode is empty', () => {
		const selectedNode: string[] = []
		const expected = [[], sampleVariables]
		expect(splitVariables(sampleVariables, selectedNode)).toEqual(expected)
	})
})

describe('formatTooltip', () => {
	test('formats tooltip with non-empty value array', () => {
		const tooltipData: TooltipData = {
			data: { name: 'Series 1', value: ['Point A', 'Point B', 'Point C'] }
		}
		const expectedOutput =
			'Series 1 <br />- Point A <br />- Point B <br />- Point C <br />'
		expect(formatTooltip(tooltipData)).toEqual(expectedOutput)
	})

	test('formats tooltip with empty value array', () => {
		const tooltipData: TooltipData = {
			data: { name: 'Series 1', value: [] }
		}
		const expectedOutput = 'Series 1 <br />'
		expect(formatTooltip(tooltipData)).toEqual(expectedOutput)
	})

	test('returns only name when value is undefined', () => {
		const tooltipData: TooltipData = {
			data: { name: 'Series 1' }
		}
		const expectedOutput = 'Series 1'
		expect(formatTooltip(tooltipData)).toEqual(expectedOutput)
	})
})

describe('getSymbol', () => {
	test('returns "rect" when selectedVariable is included in value', () => {
		const selectedVariable = 'a'
		const selectedNode = ['b', 'c']
		const value = ['a', 'd']
		const getSymbolWithParams = getSymbol(selectedVariable, selectedNode)
		expect(getSymbolWithParams(value)).toEqual('rect')
	})

	test('returns "none" when selectedVariable is not in value and value does not equal selectedNode', () => {
		const selectedVariable = 'x'
		const selectedNode = ['a', 'b']
		const value = ['c', 'd']
		const getSymbolWithParams = getSymbol(selectedVariable, selectedNode)
		expect(getSymbolWithParams(value)).toEqual('none')
	})

	test('returns "rect" when selectedVariable is null but value equals selectedNode', () => {
		const selectedVariable = null
		const selectedNode = ['a', 'b']
		const value = ['a', 'b']
		const getSymbolWithParams = getSymbol(selectedVariable, selectedNode)
		expect(getSymbolWithParams(value)).toEqual('rect')
	})

	test('returns "none" when both value and selectedNode are empty arrays, and selectedVariable is null', () => {
		const selectedVariable = null
		const selectedNode: string[] = []
		const value: string[] = []
		const getSymbolWithParams = getSymbol(selectedVariable, selectedNode)
		expect(getSymbolWithParams(value)).toEqual('none')
	})

	test('returns "none" when selectedVariable is null and value does not equal selectedNode', () => {
		const selectedVariable = null
		const selectedNode = ['a', 'b']
		const value = ['c', 'd']
		const getSymbolWithParams = getSymbol(selectedVariable, selectedNode)
		expect(getSymbolWithParams(value)).toEqual('none')
	})
})
