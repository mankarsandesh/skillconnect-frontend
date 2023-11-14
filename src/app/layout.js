import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import Header from '../components/Header'
export const metadata = {
	title: 'SkillConnect',
	description: 'SkillConnect ',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				<div className=" bg-white">
					<main>
						<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
					</main>
				</div>
			</body>
		</html>
	)
}
