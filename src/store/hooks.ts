import { LABEL, SYMBOL_SIZE, X_COORDS } from './constants'
import { Link, Node } from './types'
import { combineWithoutDuplicates, getName, getYCoords } from '../utils/utils'
import { getDataAtom, linksAtom, nodesAtom } from './atoms'
import { useAtomValue, useSetAtom } from 'jotai'

import { toast } from 'react-toastify'

export const useData = () => {
	const { data } = useAtomValue(getDataAtom)

	const setNodes = useSetAtom(nodesAtom)
	const setLinks = useSetAtom(linksAtom)

	if (!data) {
		toast('Error fetching data')
		return
	}

	const [modifiers, variables] = data.variables.variables.reduce(
		(
			acc: Node[][],
			{
				id,
				name,
				placeholderName,
				getConditionsPlaceholders,
				getPlaceholdersWithoutConditions
			},
			index
		) => {
			const isModifier = id.includes('Modifier')
			const variable: Node = {
				id: placeholderName,
				name,
				category: isModifier ? 1 : 0,
				symbolSize: SYMBOL_SIZE.large,
				x: isModifier ? X_COORDS.modifier : X_COORDS.variable,
				y: getYCoords(index),
				label: LABEL,
				dependencies: combineWithoutDuplicates(
					getConditionsPlaceholders,
					getPlaceholdersWithoutConditions
				)
			}
			if (isModifier) {
				acc[1].push(variable)
			} else {
				acc[0].push(variable)
			}
			return acc
		},
		[[], []]
	)

	const feedExports: Node[] = data.feedExports.feedExports.map(
		(
			{ name, getConditionsPlaceholders, getPlaceholdersWithoutConditions },
			index
		) => {
			return {
				id: name,
				name,
				category: 2,
				symbolSize: SYMBOL_SIZE.small,
				x: X_COORDS.feedExport,
				y: getYCoords(index),
				label: LABEL,
				dependencies: combineWithoutDuplicates(
					getConditionsPlaceholders,
					getPlaceholdersWithoutConditions
				)
			}
		}
	)

	const additionalSources = data.additionalSources.additionalSources.map(
		({ name, mappingField, mappingFields }, index) => {
			return {
				id: name,
				name,
				category: 3,
				symbolSize: SYMBOL_SIZE.small,
				x: X_COORDS.additionalSource,
				y: getYCoords(index),
				label: LABEL,
				dependencies: [mappingField, ...mappingFields]
			}
		}
	)

	const campaigns = data.campaignSettings.campaignSettings.map(
		(
			{
				name,
				getConditionsPlaceholders,
				getPlaceholdersWithoutConditions,
				keywordSettings,
				baseAdtexts,
				bidRules
			},
			index
		) => {
			return {
				id: name,
				name,
				category: 4,
				symbolSize: SYMBOL_SIZE.small,
				x: X_COORDS.campaign,
				y: getYCoords(index),
				label: LABEL,
				dependencies: [
					...combineWithoutDuplicates(
						getConditionsPlaceholders,
						getPlaceholdersWithoutConditions
					),
					...keywordSettings.map(getName),
					...baseAdtexts.map(getName),
					...bidRules.map(getName)
				]
			}
		}
	)

	const keywordSettings = data.campaignSettings.campaignSettings.flatMap(
		(campaignSetting) =>
			campaignSetting.keywordSettings.map(
				(
					{ name, getConditionsPlaceholders, getPlaceholdersWithoutConditions },
					index
				) => {
					return {
						id: name,
						name,
						category: 5,
						symbolSize: SYMBOL_SIZE.small,
						x: X_COORDS.keywordSetting,
						y: getYCoords(index + 2),
						label: LABEL,
						dependencies: combineWithoutDuplicates(
							getConditionsPlaceholders,
							getPlaceholdersWithoutConditions
						)
					}
				}
			)
	)

	const adwordSettings = data.campaignSettings.campaignSettings.map(
		({ adwordsSetting }, index) => {
			return {
				id: 'Adword setting',
				name: 'Adword setting',
				category: 6,
				symbolSize: SYMBOL_SIZE.small,
				x: X_COORDS.adwordSetting,
				y: getYCoords(index + 2),
				label: LABEL,
				dependencies: adwordsSetting.getPlaceholdersWithoutConditions
			}
		}
	)

	const baseAdtexts = data.campaignSettings.campaignSettings.flatMap(
		(campaignSetting) =>
			campaignSetting.baseAdtexts.map(
				(
					{ name, getConditionsPlaceholders, getPlaceholdersWithoutConditions },
					index
				) => {
					return {
						id: name,
						name,
						category: 7,
						symbolSize: SYMBOL_SIZE.small,
						x: X_COORDS.baseAdtext,
						y: getYCoords(index + 2),
						label: LABEL,
						dependencies: combineWithoutDuplicates(
							getConditionsPlaceholders,
							getPlaceholdersWithoutConditions
						)
					}
				}
			)
	)

	const bidRules = data.campaignSettings.campaignSettings.flatMap(
		(campaignSetting) =>
			campaignSetting.bidRules.map(
				({ name, getConditionsPlaceholders }, index) => {
					return {
						id: name,
						name,
						category: 8,
						symbolSize: SYMBOL_SIZE.small,
						x: X_COORDS.bidRule,
						y: getYCoords(index + 2),
						label: LABEL,
						dependencies: getConditionsPlaceholders
					}
				}
			)
	)

	const combinedData = [
		...variables,
		...modifiers,
		...feedExports,
		...additionalSources,
		...campaigns,
		...keywordSettings,
		...adwordSettings,
		...baseAdtexts,
		...bidRules
	]

	const links = combinedData.reduce((acc: Link[], { dependencies, id }) => {
		return [
			...acc,
			...dependencies.map((dependency) => ({ source: id, target: dependency }))
		]
	}, [])

	setLinks(links)
	setNodes(combinedData)
}
