import {
	BaseAdtext,
	DataSourceVariable,
	FeedExport,
	KeywordSetting
} from '../store/types'

export interface TooltipData {
	data: { value?: string[]; name: string }
}

export const combineWithoutDuplicates = (a: string[], b: string[]) => [
	...new Set([...a, ...b])
]

export const parseEndChild = ({
	name,
	getConditionsPlaceholders,
	getPlaceholdersWithoutConditions
}: FeedExport | KeywordSetting | BaseAdtext) => ({
	name,
	value: combineWithoutDuplicates(
		getConditionsPlaceholders,
		getPlaceholdersWithoutConditions
	)
})

export const areArraysEqual = (a: string[], b: string[]) => {
	if (a.length === 0 && b.length === 0) return false
	return (
		new Set([...a, ...b]).size === a.length &&
		new Set([...a, ...b]).size === b.length
	)
}

export const splitVariables = (
	variables: DataSourceVariable[],
	selectedNode: string[]
) =>
	variables.reduce(
		(acc: DataSourceVariable[][], val) => {
			if (selectedNode.includes(val.placeholderName)) {
				acc[0].push(val)
			} else {
				acc[1].push(val)
			}
			return acc
		},
		[[], []]
	)

export const formatTooltip = ({ data }: TooltipData) =>
	data.value?.reduce((acc, val) => {
		acc += `- ${val} <br />`
		return acc
	}, `${data.name} <br />`) ?? data.name

export const getSymbol =
	(selectedVariable: string | null, selectedNode: string[]) =>
	(value: string[]) => {
		return value?.includes(selectedVariable ?? '') ||
			areArraysEqual(value ?? [], selectedNode)
			? 'rect'
			: 'none'
	}
