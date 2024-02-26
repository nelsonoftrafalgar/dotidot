import { Dashboard } from './components/Dashboard/Dashboard'
import { useData } from './store/hooks'

export const App = () => {
	useData()

	return <Dashboard />
}
