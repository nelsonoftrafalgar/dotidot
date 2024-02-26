import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	border-radius: ${({ theme }) => theme.borderRadius.large};
	background-color: ${({ theme }) => theme.colors.backgrounds.main};
	width: 100%;
	overflow: hidden;
`

export const Structure = styled.div`
	width: calc(100% - 300px);
`

export const Header = styled.div`
	width: 100%;
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	background-color: ${({ theme }) => theme.colors.white};
	border-bottom: 4px solid ${({ theme }) => theme.colors.border};
	height: 55px;
`

export const ChartContainer = styled.div`
	width: 100%;
	height: calc(100% - 60px);
`
