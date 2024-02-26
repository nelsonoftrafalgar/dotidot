import {
	campaignsAtom,
	exportsAtom,
	getDataAtom,
	sourcesAtom,
	variablesAtom
} from './atoms'
import { combineWithoutDuplicates, parseEndChild } from '../utils/utils'
import { useAtomValue, useSetAtom } from 'jotai'

import { TreeDataParent } from './types'
import { toast } from 'react-toastify'

export const useData = () => {
	const { data } = useAtomValue(getDataAtom)
	const setVariables = useSetAtom(variablesAtom)
	const setCampaigns = useSetAtom(campaignsAtom)
	const setSources = useSetAtom(sourcesAtom)
	const setExports = useSetAtom(exportsAtom)

	if (!data) {
		toast('Error fetching data')
		return
	}

	const feedExports: TreeDataParent = {
		name: 'Feed exports',
		children: data.feedExports.feedExports.map(parseEndChild)
	}

	const additionalSources: TreeDataParent = {
		name: 'Additional sources',
		children: data.additionalSources.additionalSources.map(
			({ name, mappingField, mappingFields }) => ({
				name,
				value: [mappingField, ...mappingFields]
			})
		)
	}

	const campaigns: TreeDataParent[] =
		data?.campaignSettings.campaignSettings.map(
			({
				name,
				getConditionsPlaceholders,
				getPlaceholdersWithoutConditions,
				adwordsSetting,
				keywordSettings,
				baseAdtexts,
				bidRules
			}) => {
				return {
					name,
					value: combineWithoutDuplicates(
						getConditionsPlaceholders,
						getPlaceholdersWithoutConditions
					),
					children: [
						{
							name: 'Adwords Setting',
							value: adwordsSetting?.getPlaceholdersWithoutConditions
						},
						{
							name: 'Keyword Settings',
							children: keywordSettings.map(parseEndChild)
						},
						{
							name: 'Base ad text',
							children: baseAdtexts.map(parseEndChild)
						},
						{
							name: 'Bid rules',
							children: bidRules.map(({ name, getConditionsPlaceholders }) => {
								return {
									name,
									value: getConditionsPlaceholders
								}
							})
						}
					]
				}
			}
		)

	setCampaigns(campaigns)
	setExports(feedExports)
	setSources(additionalSources)
	setVariables(data.variables.variables)
}
