module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/']
}
