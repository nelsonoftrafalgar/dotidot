import { DataSourceVariable, RootObject, TreeDataParent } from './types'

import { atom } from 'jotai'
import axios from 'axios'

const DATA_URL =
	'https://gist.githubusercontent.com/ondrejbartas/1d1f070808fe582475a752fd8dd9bc5c/raw/03ff2c97e5b9576017be7ad70fa345ecf7dafc94/example_data.json'

export const selectedVariableAtom = atom<string | null>(null)
export const selectedNodeAtom = atom<string[]>([])
export const variablesAtom = atom<DataSourceVariable[]>([])
export const campaignsAtom = atom<TreeDataParent[]>([])
export const sourcesAtom = atom<TreeDataParent | null>(null)
export const exportsAtom = atom<TreeDataParent | null>(null)

export const getDataAtom = atom(async () => {
	try {
		const { data } = await axios.get<RootObject>(DATA_URL)
		return data
	} catch {
		return { data: null }
	}
})
