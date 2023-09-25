import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth/auth-components/auth-button-server'
import { redirect } from 'next/navigation'
import PostCard from './components/media/PostCard'

export default async function Home() {
  // Crea un oggetto supabase utilizzando createServerComponentClient e passa l'oggetto cookies come argomento
  const supabase = createServerComponentClient({ cookies })

  // Ottieni la sessione utente corrente da Supabase
  const {
    data: { session }
  } = await supabase.auth.getSession()

  // Se l'utente non ha effettuato l'accesso, reindirizza alla pagina di login
  if (!session) {
    redirect('/login')
  }

  // Ottieni tutti i post con dettagli aggiuntivi come profili utente associati e conteggio dei "mi piace"
  const squeals = await supabase.from('posts').select('*')

  // Renderizza il componente Home con il pulsante di autenticazione, il componente per creare un nuovo tweet e la lista dei post
  return (
    
    <layout>
      {/* <NewTweet /> */}
      {squeals?.data?.length > 0 && // Cambia questa riga
        squeals.data.map(post => <PostCard key={post.id} {...post} />)}

      {/*  {squeals.data?.map((post) => (
        <div key={post.id}>
        {post?.profiles?.name} {post?.profiles?.username}
        {post?.content}
        <LikeButton
        postsLiked={postsLiked}
        postsDisliked={postsDisliked}
        />
        <DisLikeButton
        postsLiked={postsLiked}
        postsDisliked={postsDisliked}
        />
        </div>
      ))} */}
    </layout>
  )
}
