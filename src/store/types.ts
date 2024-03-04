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
	adwordsSetting: AdwordsSetting
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
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
}

export interface Node {
	id: string
	name: string
	variables: string[]
	symbolSize: number
	category: number
	label: { show: boolean }
	x: number
	y: number
}

export interface Link {
	source: string
	target: string
}

export interface Category {
	name: string
}

export interface Graph {
	nodes: Node[]
	links: Link[]
	categories: Category[]
}
