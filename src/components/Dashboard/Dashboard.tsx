import * as echarts from 'echarts'

import { ChartContainer, Container, Header, Structure } from './styles'
import { areArraysEqual, formatTooltip, getSymbol } from '../../utils/utils'
import {
	campaignsAtom,
	exportsAtom,
	selectedNodeAtom,
	selectedVariableAtom,
	sourcesAtom
} from '../../store/atoms'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'

import { TreeDataChild } from '../../store/types'
import { Variables } from '../Variables/Variables'

export const Dashboard = () => {
	const chartRef = useRef(null)
	const campaigns = useAtomValue(campaignsAtom)
	const sources = useAtomValue(sourcesAtom)
	const exports = useAtomValue(exportsAtom)
	const [selectedVariable, setSelectedVariable] = useAtom(selectedVariableAtom)
	const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom)

	const handleChartClick = useCallback(
		(params: echarts.ECElementEvent) => {
			const { value } = params.data?.valueOf() as TreeDataChild
			if (areArraysEqual(value ?? [], selectedNode)) {
				setSelectedNode([])
			} else {
				setSelectedNode(value ?? [])
			}
			setSelectedVariable(null)
		},
		[selectedNode, setSelectedNode, setSelectedVariable]
	)

	useEffect(() => {
		const chartContainer = chartRef.current
		if (chartContainer && exports && sources) {
			const chart = echarts.init(chartContainer)

			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					if (entry.target === chartContainer) {
						chart.resize()
					}
				}
			})

			resizeObserver.observe(chartContainer)

			const data = [
				{
					name: 'Data structure',
					children: [exports, sources, ...campaigns]
				}
			]

			const options = {
				tooltip: {
					trigger: 'item',
					triggerOn: 'mousemove',
					formatter: formatTooltip
				},

				series: [
					{
						type: 'tree',

						data,

						top: '15%',
						left: '15%',
						bottom: '15%',
						right: '15%',

						symbolSize: 25,
						symbol: getSymbol(selectedVariable, selectedNode),

						label: {
							position: 'left',
							verticalAlign: 'middle',
							align: 'right',
							fontSize: 16,
							color: '#818a98',
							overflow: 'truncate',
							ellipsis: '...',
							width: 60
						},

						itemStyle: {
							borderWidth: 2,
							borderRadius: 10,
							color: '#6b1a86'
						},

						leaves: {
							label: {
								position: 'right',
								verticalAlign: 'middle',
								align: 'left'
							}
						},

						expandAndCollapse: false,
						animationDuration: 0,
						animationDurationUpdate: 0
					}
				]
			}

			chart.setOption(options)

			chart.on('click', handleChartClick)

			return () => {
				resizeObserver.unobserve(chartContainer)
				chart.dispose()
			}
		}
	}, [
		campaigns,
		sources,
		exports,
		handleChartClick,
		selectedNode,
		selectedVariable
	])

	return (
		<Container>
			<Variables />
			<Structure>
				<Header />
				<ChartContainer ref={chartRef} />
			</Structure>
		</Container>
	)
}
