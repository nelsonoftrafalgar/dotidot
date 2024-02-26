import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
	width: 300px;
	background-color: ${({ theme }) => theme.colors.white};
	max-height: 100%;
`

export const Title = styled.h2`
	font-size: ${({ theme }) => theme.fonts.size.l};
	font-weight: ${({ theme }) => theme.fonts.weight.normal};
	text-align: center;
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	border-bottom: 4px solid ${({ theme }) => theme.colors.border};
`

export const VariableList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	overflow-y: auto;
	max-height: 100%;
	padding: ${({ theme }) => theme.gridUnit * 2.5}px;
`

export const Variable = styled.p<{ $isActive: boolean; $isCustom: boolean }>`
	padding: ${({ theme }) => theme.gridUnit * 3}px;
	width: 100%;
	${({ theme, $isActive }) =>
		$isActive &&
		css`
			background-color: ${theme.colors.backgrounds.body};
		`};

	${({ theme, $isCustom }) =>
		$isCustom &&
		css`
			color: ${theme.colors.fonts.customVariable};
		`};
	cursor: pointer;
	border-radius: ${({ theme }) => theme.borderRadius.small};
	&:hover {
		background-color: ${({ theme }) => theme.colors.backgrounds.body};
	}
	display: flex;
	align-items: center;
	justify-content: flex-start;
`

export const TruncatedText = styled.span`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
`
