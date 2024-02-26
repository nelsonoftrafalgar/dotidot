import 'react-toastify/dist/ReactToastify.css'

import React, { Suspense } from 'react'

import { App } from './App.tsx'
import GlobalStyles from './styles/GlobalStyles.ts'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { theme } from './styles/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<ToastContainer />
			<GlobalStyles />
			<Suspense fallback='Loading...'>
				<App />
			</Suspense>
		</ThemeProvider>
	</React.StrictMode>
)
