import {
	combineWithoutDuplicates,
	formatTooltip,
	getName,
	getYCoords
} from '../utils/utils'

import { Graph } from '../store/types'

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

describe('getYCoords function', () => {
	it('should calculate the Y coordinate for a positive index', () => {
		expect(getYCoords(1)).toBe(150)
	})

	it('should calculate the Y coordinate for zero index', () => {
		expect(getYCoords(0)).toBe(100)
	})

	it('should calculate the Y coordinate for a negative index', () => {
		expect(getYCoords(-1)).toBe(50)
	})
})

describe('formatTooltip', () => {
	const mockGraph: Graph = {
		nodes: [
			{
				id: '1',
				name: 'Node 1',
				dependencies: [],
				symbolSize: 10,
				category: 0,
				label: { show: true },
				x: 0,
				y: 0
			},
			{
				id: '2',
				name: 'Node 2',
				dependencies: [],
				symbolSize: 10,
				category: 1,
				label: { show: true },
				x: 1,
				y: 1
			}
		],
		links: [{ source: '1', target: '2' }],
		categories: [{ name: 'Category 1' }, { name: 'Category 2' }]
	}

	it('should format tooltip for a link', () => {
		const tooltipData = {
			data: { id: '1', name: 'Node 1', source: '1', target: '2' }
		}
		const tooltipFormatter = formatTooltip(mockGraph)
		expect(tooltipFormatter(tooltipData)).toBe('1 --> 2')
	})

	it('should format tooltip for a node with outgoing and incoming links', () => {
		const tooltipData = { data: { id: '1', name: 'Node 1', target: '2' } }
		const tooltipFormatter = formatTooltip(mockGraph)
		expect(tooltipFormatter(tooltipData)).toBe('Node 1 <br />- Node 2 <br />')
	})

	it('should format tooltip for a node without links', () => {
		const tooltipData = { data: { id: '3', name: 'Node 3', target: '2' } }
		const tooltipFormatter = formatTooltip(mockGraph)
		expect(tooltipFormatter(tooltipData)).toBe('Node 3 <br />')
	})
})

describe('getName function tests', () => {
	test('should correctly return the name of a KeywordSetting', () => {
		const keywordSettingMock = {
			name: 'KeywordSettingName',
			getPlaceholdersWithoutConditions: ['placeholder1', 'placeholder2'],
			getConditionsPlaceholders: ['condition1']
		}
		expect(getName(keywordSettingMock)).toBe('KeywordSettingName')
	})

	test('should correctly return the name of a BaseAdtext', () => {
		const baseAdtextMock = {
			name: 'BaseAdtextName',
			getPlaceholdersWithoutConditions: ['placeholderA', 'placeholderB'],
			getConditionsPlaceholders: ['conditionA']
		}
		expect(getName(baseAdtextMock)).toBe('BaseAdtextName')
	})

	test('should correctly return the name of a BidRule', () => {
		const bidRuleMock = {
			name: 'BidRuleName',
			getConditionsPlaceholders: ['conditionX']
		}
		expect(getName(bidRuleMock)).toBe('BidRuleName')
	})
})
