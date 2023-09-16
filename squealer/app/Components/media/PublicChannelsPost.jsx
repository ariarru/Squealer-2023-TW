import Card from '../Card';

import moment from 'moment';
/* import Reaction from '../reaction/Reaction';
 */import Avatar from '../Avatar';

// import Reaction from './Reaction/Reaction';


export default function PublicChannelsPost(
  {
    id,
    created_at,
    author,
    content,
    photos,
    channel_id,
    num_likes,
    num_dislikes
    }
) {
    console.log("sono dentro posts");
    //devo gestire che se è un canale (quindi channel id != null ) allora devo mettere foto e info del canale
   return (
    <Card>
      <div className='flex gap-3'>
        <div>
{/*           <Link href={'/profile/' + authorProfiles?.id}>
 */}            <span className='cursor-pointer'>
              <Avatar url={author?.avatar} />
            </span>
{/*           </Link>
 */}        </div>
        <div className='flex flex-col'>
          <p>
{/*             <Link href={'/profile/' + authorProfiles?.id}>
 */}              <span className='font-semibold hover:underline cursor-pointer '>
                {author?.name}
              </span>{' '}
              shared a squeal
{/*             </Link>
 */}          </p>
          <p className='text-gray-500 text-sm'>
            {moment(created_at).fromNow()}
          </p>
        </div>
      </div>

 <div className='my-4'>
        <p className='my-3 text-md'>
          {content}
        </p>
 {/*
        <div className=''>
          {photos.length > 0 && (
            <div className='mt-4 flex justify-center items-center'>
              {photos.length === 4 ? (
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="p-2">
                        <img src={photos[0]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[1]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <img src={photos[2]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[3]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className='flex gap-2.5'>
                  <div className='flex justify-center items-center'>
                    <img src={photos[0]} className="w-auto rounded-md object-cover" alt="" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
 */}
      </div>
      
      <p>{num_likes} </p>
      <p>{num_dislikes} </p>

     {/*  <div className=''>
        <Reaction
          id={id}
        />
      </div> */}

    </Card >
  )
}
  
