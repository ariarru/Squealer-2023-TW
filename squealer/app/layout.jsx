import '@/styles/globals.css'
import { Suspense } from 'react';
import { Inter } from 'next/font/google'
import Preloader from './components/Preloader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Squealer',
  description: 'La nuova versione di Squealer, il social network per eccellenza.'
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense fallback={<Preloader />}>
          <div className='md:mx-[15%] 2xl:mx-[20%] flex mt-4 gap-9'>

            {children}
          </div>
        </Suspense>
      </body>
    </html>
  )
}