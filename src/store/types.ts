export interface RootObject {
	data: Data
}

export interface Data {
	feedExports: FeedExportsCollection
	additionalSources: AdditionalSourcesCollection
	campaignSettings: CampaignSettingsCollection
	variables: VariablesCollection
}

export interface FeedExportsCollection {
	feedExports: FeedExport[]
}

export interface FeedExport {
	name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
}

export interface AdditionalSourcesCollection {
	additionalSources: AdditionalSource[]
}

export interface AdditionalSource {
	name: string
	mappingField: string
	mappingFields: string[]
}

export interface CampaignSettingsCollection {
	campaignSettings: CampaignSetting[]
}

export interface CampaignSetting {
	name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
	adwordsSetting?: AdwordsSetting
	keywordSettings: KeywordSetting[]
	baseAdtexts: BaseAdtext[]
	bidRules: BidRule[]
}

export interface AdwordsSetting {
	getPlaceholdersWithoutConditions: string[]
}

export interface KeywordSetting {
	name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
}

export interface BaseAdtext {
	name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
}

export interface BidRule {
	name: string
	getConditionsPlaceholders: string[]
}

export interface VariablesCollection {
	variables: DataSourceVariable[]
}

export interface DataSourceVariable {
	id: string
	name: string
	placeholderName: string
}

export interface TreeDataChild {
	name: string
	children?: TreeDataChild[]
	value?: string[]
}

export interface TreeDataParent {
	name: string
	children: TreeDataChild[]
}
