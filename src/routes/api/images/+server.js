import f from '$lib/helpers/scripts'

import { v2 as cloudinary } from 'cloudinary'



import {CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from '$lib/helpers/Env'

cloudinary.config({ 
  cloud_name: CLOUDINARY_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
});

export const POST = async ({ request }) => {
  const { tag } = await request.json();
  console.log('API IMAGES POST', {tag})
  const res = await cloudinary.api.resources_by_tag(tag, {tags: true,
    max_results: 50})
    console.log('API IMAGES POST', res)
  return new Response(JSON.stringify(res))
}

export const DELETE = async ({request}) => {
    // console.log('API IMAGES DELETE')
    const {slug} = await request.json()
    console.log('API IMAGES DELETE', {slug}, f.underscoreToSlash(slug))

    const res = await cloudinary.api.delete_resources([f.underscoreToSlash(slug)],
    function(error, result) {console.log('DELETE SLUG',result, error); 
    });

    const r = {message: 'deleted'}
    return new Response(JSON.stringify(r))
}