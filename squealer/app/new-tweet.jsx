import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Card from './components/Card'

export default function NewTweet () {
  async function addTweet (formData) {
    'use server'
    const content = formData.get('content')
    const supabase = createServerComponentClient({ cookies })
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      await supabase.from('posts').insert({
        author: user.id,
        content: content
      })
    }
  }

  return (
    <div className='mb-5'>
      <Card>
        <div className='flex gap-3'>
          {/* {profile && <Avatar size={'medium'} url={profile.avatar} />} */}
          <textarea
            /*  value={content}
            onChange={e => {
              setContent(e.target.value)
              setDaily_quota(profile.daily_quota - e.target.value.length)
            }}*/
            className='grow p-3 h-18 resize-none'
            placeholder={`What's on your mind?`}
          />
        </div>
      </Card>

      <div className='grow text-right'>
        <button
/*           onClick={createPost}
 */          className='bg-blue-500 text-white px-6 py-1 rounded-md'
/*           disabled={daily_quota < 0}
 */        >
          Squeal
        </button>
      </div>
    </div>
  )
}