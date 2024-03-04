import { Link, Node, RootObject } from './types'

import { atom } from 'jotai'
import axios from 'axios'

const DATA_URL =
	'https://gist.githubusercontent.com/ondrejbartas/1d1f070808fe582475a752fd8dd9bc5c/raw/03ff2c97e5b9576017be7ad70fa345ecf7dafc94/example_data.json'

export const nodesAtom = atom<Node[]>([])
export const linksAtom = atom<Link[]>([])

export const getDataAtom = atom(async () => {
	try {
		const { data } = await axios.get<RootObject>(DATA_URL)
		return data
	} catch {
		return { data: null }
	}
})
