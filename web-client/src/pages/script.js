

// // YouTube sintaxis for embedded videos and images

//     const ytVideoPrefix = `https://www.youtube.com/embed/`
//     const ytImagePathPrefix = `https://i.ytimg.com/vi/`
//     const ytImagePathSufix = `/hqdefault.jpg`

//     // Array of Videos

//     let arrVideos = [
//     {name: 'Cat Man Do', data: 'w0ffwDYo00Q'},
//     {name: 'Let Me In!', data: '4rb8aOzy9t4'},
//     {name: 'TV Dinner', data: 's13dLaTIHSg'},
//     {name: 'Cat & Mouse', data: 'BWIPZvwcnX8'},
//     {name: 'Feed Me', data: 'Te4wx4jtiEA'},
//     {name: 'Crazy Time', data: 'l5ODwR6FPRQ'},
//     {name: 'Bed Sheets', data: 'P3y8vc-3iVU'},
//     {name: 'Box Clever', data: 'ZpCl5O6tTv8'},
//     {name: 'Let Me Out!', data: 'HDzkaJOT_KI'},
//     {name: 'Mirror Mirror', data: 'G5FUH3eoizc'},
//     {name: 'Window Pain', data: 'XrivBjlv6Mw'},
//     {name: 'Sticky Tape', data: 'tV3SWjrt2rE'}
//     ]

//     // Current video

//     let currentVideo = document.getElementById('current-video')
//     currentVideo.src = `${ytVideoPrefix}${arrVideos[0].data}`

//     // Add .gallery__items to .gallery

//     let gallery = document.querySelector('.gallery')
//     gallery.innerHTML = ``

//     for (let i = 0; i < arrVideos.length; i++) {
//     gallery.innerHTML += `
//         <div class="gallery__item" data="${arrVideos[i].data}">
//         <img class="gallery__item__img" src="${ytImagePathPrefix}${arrVideos[i].data}${ytImagePathSufix}">
//         <span class="gallery__item__span">${arrVideos[i].name}</span>
//         </div>`
//     }

//     // Add event listeners

//     gallery.addEventListener('click', (e) => {
//     // When click on .gallery__item element
//     if (e.target.classList.contains('gallery__item')) {
//         currentVideo.src = `${ytVideoPrefix}${e.target.getAttribute('data')}`
//     }
//     // When click on .gallery__item__img element
//     if (e.target.classList.contains('gallery__item__img')) {
//         let data = e.target.src
//         data = data.replace(ytImagePathPrefix, '')
//         data = data.replace(ytImagePathSufix, '')
//         currentVideo.src = `${ytVideoPrefix}${data}`
//     }
//     // When click on .gallery__item__span element
//     if (e.target.classList.contains('gallery__item__span')) {
//         console.log(e.target.innerText)
//         for (let i = 0; i < arrVideos.length; i++) {
//         if (arrVideos[i].name === e.target.innerText) {
//             currentVideo.src = `${ytVideoPrefix}${arrVideos[i].data}`
//         }
//         }
//     }
//     })

{/* <script src="//embed.typeform.com/next/embed.js"></script> */}

