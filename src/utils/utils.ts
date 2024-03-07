import { BaseAdtext, BidRule, Graph, KeywordSetting } from '../store/types'

export interface TooltipData {
	data: { id: string; name: string; source?: string; target: string }
}

export const combineWithoutDuplicates = (a: string[], b: string[]) => [
	...new Set([...a, ...b])
]

export const formatTooltip =
	(graph: Graph) =>
	({ data }: TooltipData) => {
		if ('source' in data) {
			return `${data.source} --> ${data.target}`
		}

		return graph.links.reduce((acc, { source, target }) => {
			if (source === data.id) {
				const node = graph.nodes.find(({ id }) => id === target)
				acc += node ? `- ${node?.name} <br />` : ''
			}
			if (target === data.id) {
				const node = graph.nodes.find(({ id }) => id === source)
				acc += node ? `- ${node?.name} <br />` : ''
			}
			return acc
		}, `${data.name} <br />`)
	}

export const getYCoords = (index: number) => (index + 2) * 50

export const getName = ({ name }: BidRule | BaseAdtext | KeywordSetting) => name
