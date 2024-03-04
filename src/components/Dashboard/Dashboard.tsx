import * as echarts from 'echarts'

import { ChartContainer, Container, Header, Structure } from './styles'
import { linksAtom, nodesAtom } from '../../store/atoms'
import { useEffect, useRef } from 'react'

import { formatTooltip } from '../../utils/utils'
import { useAtomValue } from 'jotai'

export const Dashboard = () => {
	const chartRef = useRef(null)
	const nodes = useAtomValue(nodesAtom)
	const links = useAtomValue(linksAtom)

	useEffect(() => {
		const chartContainer = chartRef.current
		if (chartContainer) {
			const chart = echarts.init(chartContainer, null, { renderer: 'svg' })

			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					if (entry.target === chartContainer) {
						chart.resize()
					}
				}
			})

			resizeObserver.observe(chartContainer)

			const graph = {
				nodes,
				links,
				categories: [
					{ name: 'Variable' },
					{ name: 'Modifier' },
					{ name: 'Feed export' },
					{ name: 'Additional sources' },
					{ name: 'Campaign' },
					{ name: 'Keyword settings' },
					{ name: 'Adword settings' },
					{ name: 'Base ad texts' },
					{ name: 'Bid rules' }
				]
			}

			const options: echarts.EChartsCoreOption = {
				tooltip: {
					formatter: formatTooltip(graph)
				},
				legend: [
					{
						data: graph.categories.map(({ name }) => name)
					}
				],
				animationDuration: 100,
				series: [
					{
						type: 'graph',
						layout: 'none',
						data: graph.nodes,
						links: graph.links,
						categories: graph.categories,
						label: {
							position: 'right',
							formatter: '{b}',
							overflow: 'truncate',
							ellipsis: '...',
							width: 60
						},
						lineStyle: {
							color: 'source'
						},
						emphasis: {
							focus: 'adjacency',
							lineStyle: {
								width: 5
							}
						}
					}
				]
			}

			chart.setOption(options)

			return () => {
				resizeObserver.unobserve(chartContainer)
				chart.dispose()
			}
		}
	}, [nodes, links])

	return (
		<Container>
			<Structure>
				<Header>Data structure</Header>
				<ChartContainer ref={chartRef} />
			</Structure>
		</Container>
	)
}
