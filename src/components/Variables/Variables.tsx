import { Title, TruncatedText, Variable, VariableList, Wrapper } from './styles'
import {
	selectedNodeAtom,
	selectedVariableAtom,
	variablesAtom
} from '../../store/atoms'
import { useAtom, useAtomValue } from 'jotai'

import { splitVariables } from '../../utils/utils'

export const Variables = () => {
	const [selectedVariable, setSelectedVariable] = useAtom(selectedVariableAtom)
	const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom)
	const variables = useAtomValue(variablesAtom)

	const handleVariableClick = (placeholderName: string) => () => {
		if (selectedVariable === placeholderName) {
			setSelectedVariable(null)
		} else {
			setSelectedVariable(placeholderName)
		}
		setSelectedNode([])
	}

	const [matchedVariable, unmatchedVariables] = splitVariables(
		variables,
		selectedNode
	)

	return (
		<Wrapper>
			<Title>Variables</Title>
			<VariableList>
				{[...matchedVariable, ...unmatchedVariables].map(
					({ name, id, placeholderName }) => {
						const isActive =
							selectedNode.includes(placeholderName) ||
							selectedVariable === placeholderName
						const isCustom = id.includes('Modifier')
						return (
							<Variable
								$isActive={isActive}
								$isCustom={isCustom}
								key={id}
								onClick={handleVariableClick(placeholderName)}
							>
								<TruncatedText>{name}</TruncatedText>
							</Variable>
						)
					}
				)}
			</VariableList>
		</Wrapper>
	)
}
