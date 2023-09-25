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

    // const likes = await supabase
    //     .from('likes')
    //     .select()
    //     .match({
    //         post_id: postId,
    //         user_id: session.user.id
    //     })
    //     .then((res) => {
    //         if (res?.data?.length > 0) {
    //         }
    //     })

    // const dislikes = await supabase
    //     .from('dislikes')
    //     .select()
    //     .match({
    //         post_id: postId,
    //         user_id: session.user.id
    //     })
    //     .then((res) => {
    //         if (res?.data?.length > 0) {
    //         }
    //     })

    return (

        <Reaction
            postId={postId}
            session={session}
        />
    )
}
