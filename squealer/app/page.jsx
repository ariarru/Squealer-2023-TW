'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import PostCard from './components/media/PostCard'
import PublicChannelsPost from './components/media/PublicChannelsPost'
import NavigationBar from './components/layout/Navbar'
import SideWidget from './components/layout/SideWidget'
import PostFormCard from './components/media/PostFormCard'
import { Suspense } from 'react'
import Preloader from './components/Preloader'
import Reaction from './components/reaction/Reaction'

//const inter = Inter({ subsets: ['latin'] })

export default async function Home () {
  // Crea un oggetto supabase utilizzando createServerComponentClient e passa l'oggetto cookies come argomento
  const supabase = createServerComponentClient({ cookies })

  // Ottieni la sessione utente corrente da Supabase
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const hasLoggedIn = session ? true : false
  var userObj = null //oggetto per passare le informazioni dell'user ai figli della home

  var squeals = null
  async function fetchPosts () {
    await supabase.rpc('get_public_only')
  }
  const publicSqueals = await supabase.rpc('get_public_only')
  const publicChannelsList = await supabase.rpc('get_public_list')
  if (!hasLoggedIn) {
    squeals = publicSqueals
  } else {
    var user = session.user

    userObj = await supabase.rpc('get_logged_user', {
      user_uuid: user.id
    })
    squeals = await supabase.rpc('get_posts', {
      user_uuid: user.id
    })

    // squeals ora contiene in data un array json con:
    // id, created_at, username, avatar, content, photos,
    // channel_id, likes (ovvero numero dei like per post), dislike (numero dei dislike per post),
    // hasLiked (boolean true se l'utente ha messo like), hasDisliked (boolean true se l'utente ha messo dislike)
  }

  //queste due necessitano di un form -> server actions
  async function addLike(post_id){
    'use server';
    await supabase.rpc('add_likes', {
      postid: post_id,
      userid: session?.user.id
    });
    return null;
  }

  async function addDislike(post_id){
    'use server';
    await supabase.rpc('add_dislikes', {
      postid: post_id,
      userid: session?.user.id
    });
    return null;
  } 

  return (
    <>
      <Suspense fallback={<Preloader />}>
        <NavigationBar
          hasLoggedIn={hasLoggedIn}
          sessionUsername={hasLoggedIn ? userObj.data[0].username : null}
        />

        {/* questi non vanno qui <AuthButtonServer /> */}
        <div className=' ml-6 max-w-4xl gap-4 left-1/4 relative md:ml-0 md:flex md:w-10/12 lg:w-6/12 '>
          <div className={'mx-2 relative top-36 md:top-0 md:mx-0 md:w-full'}>
            {!hasLoggedIn &&
              squeals?.data?.map(publicPost => (
                <PublicChannelsPost
                  key={publicPost.id}
                  post={publicPost}
                  disableReaction={true}
                />
              ))}

            {hasLoggedIn && (
              <div>
                <PostFormCard profile={userObj.data[0]} />

                {squeals.data.map(post => (
                  <PostCard key={post.id} post={post}>
                    <Reaction
                      id={post.id}
                      numLikes={post.likes}
                      numDislikes={post.dislikes}
                      hasLiked={post.hasLiked}
                      hasDisliked={post.hasDisliked}
                      //addDislike={addDislike}
                      //addLike={addLike}
                      disable={false}
                    />
                  </PostCard>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='left-1/4 relative ml-2'>
          <SideWidget publicChannels={publicChannelsList.data} />
        </div>
      </Suspense>
    </>
  )
}
