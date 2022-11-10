const condensifyPhone = (phone) => {
    if (typeof phone === 'string') {
        return phone.trim().replace(/ /g, '')
    }
    // console.log('condensifyPhone', {phone}, typeof phone)
}

const checkAuthentif = (beA, isA, href) => {
    // beA = beAutheticated
    // isA = isAuthenticated
    // console.log('Scripts checkAuthentif', {href}, {beA}, {isA})
    if (typeof beA !== 'string' || (isA && typeof isA !== 'boolean') || (href && typeof href !== 'string')) return 
    if (beA === 'yes' && isA === true) {
        return false
    }
    if (beA === 'yes' && isA === false) {
        return true
    }
    if (beA === 'no' && isA === true && href === '/login') {
        return true
    }
    return false
}

const builMenuArray = (arr, subFolder) => {
  if (!Array.isArray(arr)) return
  if (subFolder && typeof subFolder !== 'string') return
  let menuArray = []
  if (!subFolder) {
      menuArray = arr.map(obj => {

        if (obj.slug == 'home') {
          let {title, beAuthenticated} = obj 
          let href = '/'
          return {
            title,
            href,
            beAuthenticated
          }
        }
        let {title, beAuthenticated} = obj 
        let href = `/${obj.slug}`
        return {
          title,
          href,
          beAuthenticated
        }
    })
  }

  if (subFolder) {
      menuArray = arr.map(obj => {
        let {title, beAuthenticated} = obj 
        let href = `/${subFolder}/${obj.slug}`
        return {
          title,
          href,
          beAuthenticated
        }
    })
  }

  return menuArray
}

const slashToUnderscore = (str) => {
  if (typeof str !== 'string') {
    return
  }
  return str.replace(/\//g, "_");
}

const underscoreToSlash = (str) => {
  if (typeof str !== 'string') {
    return
  }
  return str.replace(/\_/g, '/');
}

const deleteOneEltFromArray = (arr, value) => { 
    const newArr = arr.filter(function(ele){ 
            return ele != value; 
        })
    console.log('deleteOneEltFromArray', {newArr})
    return newArr
}

const definitiveDeletingBanner = (bupSlugId, cldSlugId, arr) => {
  // Il y a une banner donc itemToEdit exist
  // bupSlugId = itembupSlugId , cldSlugId = cld_public_id, arr = imgsKept
  if (bupSlugId === cldSlugId) { // banner en place et enregistrée et hébergée
    console.log('on détruit un article ayant une banner')
    deleteOneImg(bupSlugId)    
  }
  if (bupSlugId !== cldSlugId) { // on a une new banner qui n'est pas enregistrée en bdd mais est forcément sur cld
    if (arr.includes(cldSlugId)) {
      arr = deleteOneEltFromArray(arr, cldSlugId)
    }
    deleteOneImg(cldSlugId) // delete banner non enregistrée mais délà sur cld
    deleteOneImg(bupSlugId) // delete l'imag de itemToEdit et enrgistrée et sur cld
  }
}

// Youtube
const getEmbedUrlYoutube = (url) => {
  if (typeof url !== 'string') {
    return
  }
  // const id = url.split('=')[1]
  // console.log('getEmbedUrlYoutube', {id}, {url})
  const urlArr = isYouTube(url)
  if (urlArr) {
    return `https://www.youtube.com/embed/${urlArr[1]}`
  }
  return
}

const isYouTube = (str) => {
  if (typeof str !== 'string') {
    return
  }
  // console.log('isYouTube')
  const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  return str.match(regex)
}
    
// cloudinary
const createSrcJpgSrcWebp = (id) => {
  if (typeof id !== 'string') {
    return
  }
  // console.log('createSrcJpgSrcWebp', {id})
  const sizes = [200, 400, 600, 800, 1000, 1200, 1400, 1600]
  const l = sizes.length

    const srcJpg = []
    const srcWebP = []
    let srcJ = ''
    let srcW = ''

    for (let i = 0; i < l; i++) {
        srcJ = `https://res.cloudinary.com/geeteeimages/image/upload/c_scale,w_${sizes[i]},q_auto,f_jpg/${id}`
        srcJpg.push(srcJ)
    }

    // console.log('createSrcJpgSrcWebp',{srcJpg})

    for (let i = 0; i < l; i++) {
        srcW = `https://res.cloudinary.com/geeteeimages/image/upload/c_scale,w_${sizes[i]},q_auto,f_webp/${id}`
        srcWebP.push(srcW)
    }

    // console.log('createSrcJpgSrcWebp',{srcWebP})

    return {srcJpg, srcWebP}

}

const imgSquareW = (w, public_id) => {
    return `https://res.cloudinary.com/geeteeimages/image/upload/ar_1,c_thumb,q_auto,w_${w},h_${w}/${public_id}`
}

const bannerResizeW = (w, public_id) => {
    return `https://res.cloudinary.com/geeteeimages/image/upload/c_scale,dpr_1.0,q_auto,w_${w}/${public_id}`
}

const imgNoDim = (public_id) => {
    return `https://res.cloudinary.com/geeteeimages/image/upload/dpr_1.0,q_auto/${public_id}`
}

const bannerResizeWH = (w, h, public_id) => {
    return `https://res.cloudinary.com/geeteeimages/image/upload/c_crop,dpr_1.0,q_auto,g_faces,w_${w},h_${h}/${public_id}`
}

const thumbImg = (public_id) => {
  return `https://res.cloudinary.com/geeteeimages/image/upload/c_limit,h_100,w_150/${public_id}`
}

const deleteOneImg = async (slug) => { 
  if (!slug || typeof slug !== 'string') return
  console.log('deleteOneImg', {slug})

  const res = await fetch('http://127.0.0.1:5173/api/images', {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({slug})
  })

  const message = await res.json()
  console.log('home page', {message})
}

const deleteAllImgsFromArray = async (array) => {
  array.forEach(slug => {
    deleteOneImg(slug)
  });
}

const scriptsServices = {
  condensifyPhone,
  checkAuthentif,
  builMenuArray,
  getEmbedUrlYoutube,
  isYouTube,
  definitiveDeletingBanner,
  createSrcJpgSrcWebp,
  imgNoDim,
  imgSquareW,
  bannerResizeWH,
  bannerResizeW,
  thumbImg,
  deleteOneImg,
  deleteAllImgsFromArray,
  slashToUnderscore,
  underscoreToSlash,
  deleteOneEltFromArray
}
export default scriptsServices