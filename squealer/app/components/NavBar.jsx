import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router"
import Card from './Card'
import Link from 'next/link'

export default function NavigationBar() {

    const session = useSession();
    const router = useRouter();
    const { pathname } = router;
    const { asPath } = router;
    const activePage = 'text-white flex gap-2 py-1 px-2 mx-1 md:gap-2 md:py-3 bg-socialBlue md:-mx-10 md:px-10 rounded-md shadow-md shadow-gray-300 '
    const nonActivePage = 'flex gap-2 mx-2 py-1 px-2 md:py-3 hover:bg-socialBlue hover:bg-opacity-20 md:-mx-10 md:px-10 rounded-md hover:shadow-md shadow-gray-300 transition-all hover:scale-110'

    var userpage = '';
    if (session) {
        userpage = '/profile/' + session.user.id;
    }
    const supabase = useSupabaseClient()
    function logout() {
        supabase.auth.signOut()
        router.push('/login')
    }

    function handleClick() {
        console.log('clicked home button')
        router.push('/')
    }


    return (

        <Card isNavbar={true}>
            
        </Card>
    )
}