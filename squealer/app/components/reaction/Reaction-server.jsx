"use server"
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { redirect } from 'next/headers';
import Reaction from './Reaction.jsx';

export default async function ReactionServer({ postId }) {

    const supabase = createServerActionClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    // qui andrà la query per il totale dei like e dislike 
    // da passare alla componente Reaction.jsx

    return (

        <Reaction
            postId={postId}
            session={session}
        />
    )
}
