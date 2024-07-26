const add_banner = document.getElementById('add_banner')
const show_modal_banner = document.getElementById('show_modal_banner')
const close_banner_modal = document.getElementById('close_banner_modal')
const dropzone = document.getElementById('dropzone')
const file_upload = document.getElementById('file_upload')
const banner_submit_btn = document.getElementById('banner_submit_btn')
const preview = document.getElementById('preview')
const cancle_banner_btn = document.getElementById('cancle_banner_btn')
const select_banner_option = document.getElementById('select_banner_option')
const message_banner = document.getElementById('message_banner')
const banner_form = document.getElementById('banner_form')
const banner_table_body = document.getElementById('banner_table_body')
const banner_id = document.getElementById('banner_id')

//movie
const add_movie = document.getElementById('add_movie')
const show_modal_movie = document.getElementById('show_modal_movie')
const close_modal_movie = document.getElementById('close_modal_movie')
const cancle_movie_btn = document.getElementById('cancle_movie_btn')
const movie_submit_btn = document.getElementById('movie_submit_btn')
const file_upload_poster = document.getElementById('file_upload_poster')
const preview_poster = document.getElementById('preview_poster')
const movie_title = document.getElementById('movie_title')
const movie_year = document.getElementById('movie_year')
const movie_released = document.getElementById('movie_released')
const movie_runtime = document.getElementById('movie_runtime')
const movie_genre = document.getElementById('movie_genre')
const movie_release_1 = document.getElementById('movie_release_1')
const movie_release_time_1 = document.getElementById('movie_release_time_1')
const movie_release_time_2 = document.getElementById('movie_release_time_2')
const movie_release_time_3 = document.getElementById('movie_release_time_3')
const movie_release_time_4 = document.getElementById('movie_release_time_4')
const movie_release_2 = document.getElementById('movie_release_2')
const movie_release_time_5 = document.getElementById('movie_release_time_5')
const movie_release_time_6 = document.getElementById('movie_release_time_6')
const movie_release_time_7 = document.getElementById('movie_release_time_7')
const movie_release_time_8 = document.getElementById('movie_release_time_8')
const message_movie = document.getElementById('message_movie')
const movie_form = document.getElementById('movie_form')
const movie_table_body = document.getElementById('movie_table_body')

loadBanner()

let banner_type = 'create'
let movie_type = 'create'

add_banner.addEventListener('click', function () {
    banner_type = 'create'
    show_modal_banner.classList.remove('hidden')
    show_modal_banner.classList.add('opacity-1')
})

add_movie.addEventListener('click', function () {
    movie_type = 'create'
    show_modal_movie.classList.remove('hidden')
    show_modal_movie.classList.add('opacity-1')
})

close_banner_modal.addEventListener('click', function () {
    show_modal_banner.classList.add('hidden')
    show_modal_banner.classList.remove('opacity-1')
})

close_modal_movie.addEventListener('click', function () {
    show_modal_movie.classList.add('hidden')
    show_modal_movie.classList.remove('opacity-1')
})

cancle_banner_btn.addEventListener('click', function () {
    show_modal_banner.classList.add('hidden')
    show_modal_banner.classList.remove('opacity-1')
})

cancle_movie_btn.addEventListener('click', function () {
    show_modal_movie.classList.add('hidden')
    show_modal_movie.classList.remove('opacity-1')
})


file_upload.addEventListener('change', function (e) {
    var file = e.target.files[0]
    uploadFile(file).then().catch(err => console.log(err))
})

banner_submit_btn.addEventListener('click', function (e) {
    e.preventDefault()
    console.log(preview.src)
    console.log(Boolean(select_banner_option.value))
    configBanner()
    message_banner.classList.add('hidden')
})

async function uploadFile(file) {
    const formFile = new FormData()
    const request = new Request('/upload')
    formFile.append('file', file)
    try {
        const response = await fetch(request, {
            method: 'POST',
            body: formFile
        })
        console.log(response)
        const result = await response.json()
        preview.src = result.data
        preview.classList.remove('hidden')
        console.log(result)
    } catch (err) {
        console.log(err)
    }
} 

async function configBanner() {
    if (banner_type === 'create') {
        const request = new Request('/banner')
        try {
            let banner = {}
            banner.bannerId = 0
            banner.bannerUrl = preview.src
            banner.isActive = select_banner_option.value.toLowerCase() === 'true'
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(banner)
            })
            if (!response.ok) {
                throw new Error()
            }
            console.log(response)
            const result = await response.json()
            console.log(result)
            if (result.success) {
                messageBannerModalSuccess(result.message)
            } else {
                messageBannerModalWarning(result.message)
            }
        } catch (err) {
            console.log(err)
            messageBannerModalError('error to create banner')
        }
    } else {
        const bannerId = banner_id.innerHTML
        try {
            const request = new Request(`/banner/${bannerId}`)
            let banner = {}
            banner.bannerId = bannerId
            banner.bannerUrl = preview.src
            banner.isActive = select_banner_option.value.toLowerCase() === 'true'
            const response = await fetch(request, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(banner)
            })
            if (!response.ok) {
                throw new Error()
            }
            console.log(response)
            const result = await response.json()
            console.log(result)
            if (result.success) {
                messageBannerModalSuccess(result.message)
            } else {
                messageBannerModalWarning(result.message)
            }
        } catch (err) {
            console.log(err)
            messageBannerModalError('error to create banner')
        }
    }
}

async function loadBanner() {
    try {
        const request = new Request('/banner')
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        if (!response.ok) {
            console.log('error')
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            createBannerTable(result.data)
        } else {
            banner_table_body.textContent = ''
        }
    } catch (err) {
        console.log(err)
    }
}

async function loadBannerById(id) {
    try {
        const request = new Request(`/banner/${id}`)
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error()
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            console.log('yes')
            appendBannerEdit(result.data)
        }
    } catch (err) {
        messageBannerModalError(`can't load banner with id : ${id}`)
    }
}

async function deleteBannerById(id) {
    try {
        const request = new Request(`/banner/${id}`)
        const response = await fetch(request, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error()
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            console.log('success')
            loadBanner()
        }
    } catch (err) {
        messageBannerModalError(`can't load banner with id : ${id}`)
    }
}

function appendBannerEdit(data) {
    console.log('click')
    banner_id.innerHTML = data.bannerId
    preview.src = data.bannerUrl
    preview.classList.remove('hidden')
    select_banner_option.value = data.isActive
}

function createBannerTable(data) {
    console.log("datavalue", data)
    banner_table_body.textContent = ''
    data.forEach(d => {
        trTag = document.createElement('tr')
        thTag1 = document.createElement('th')
        thTag2 = document.createElement('th')
        thTag3 = document.createElement('th')
        thTag4 = document.createElement('th')
        imgTag = document.createElement('img')
        editBtn = document.createElement('button')
        deleteBtn = document.createElement('button')

        thTag1.textContent = d.bannerId
        thTag1.className = 'text-white border border-gray-200'
        imgTag.src = d.bannerUrl
        imgTag.className = 'w-[80%]'
        thTag2.append(imgTag)
        thTag2.className = 'text-white border border-gray-200'
        thTag3.textContent = d.isActive
        thTag3.className = 'text-white border border-gray-200'
        thTag4.className = 'text-white border border-gray-200 gap-2'
        editBtn.textContent = 'Edit'
        editBtn.className = 'bg-white py-2 px-1 rounded-md text-gray-800 mx-2 font-normal'
        editBtn.addEventListener('click', editBanner.bind(null, d.bannerId))
        deleteBtn.textContent = 'Delete'
        deleteBtn.className = 'bg-white py-2 px-1 rounded-md text-gray-800 mx-2 font-normal'
        deleteBtn.addEventListener('click', deleteBanner.bind(null, d.bannerId))
        thTag4.append(editBtn)
        thTag4.append(deleteBtn)
        trTag.append(thTag1)
        trTag.append(thTag2)
        trTag.append(thTag3)
        trTag.append(thTag4)
        banner_table_body.append(trTag)
    })
}

function deleteBanner(id) {
    deleteBannerById(id)
}

function editBanner(id) {
    console.log(id)
    show_modal_banner.classList.remove('hidden')
    show_modal_banner.classList.add('opacity-1')
    banner_type = "update"
    message_banner.classList.add('hidden')
    loadBannerById(id)
}

function messageBannerModalError(message) {
    message_banner.textContent = ''
    message_banner.classList.remove('hidden')
    message_banner.classList.add('bg-red-400', 'px-2', 'py-3', 'rounded-md', 'my-4')
    const spanIcon = document.createElement('span')
    const pTag = document.createElement('p')
    spanIcon.className = "material-symbols-outlined text-gray-800"
    spanIcon.textContent = "error"
    pTag.textContent = message
    pTag.className = "font-normal"
    message_banner.append(spanIcon)
    message_banner.append(pTag)
}

function messageBannerModalSuccess(message) {
    message_banner.textContent = ''
    message_banner.classList.remove('hidden')
    message_banner.classList.add('bg-green-400', 'px-2', 'py-3', 'rounded-md', 'my-4')
    const spanIcon = document.createElement('span')
    const pTag = document.createElement('p')
    spanIcon.className = "material-symbols-outlined text-gray-800"
    spanIcon.textContent = "check"
    pTag.textContent = message
    pTag.className = "font-normal"
    message_banner.append(spanIcon)
    message_banner.append(pTag)
    banner_form.reset()
    setTimeout(() => {
        show_modal_banner.classList.add('hidden')
        show_modal_banner.classList.remove('opacity-1')
    }, 2000)
    loadBanner()
}

function messageBannerModalWarning(message) {
    message_banner.textContent = ''
    message_banner.classList.remove('hidden')
    message_banner.classList.add('bg-yellow-400', 'px-2', 'py-3', 'rounded-md', 'my-4')
    const spanIcon = document.createElement('span')
    const pTag = document.createElement('p')
    spanIcon.className = "material-symbols-outlined text-gray-800"
    spanIcon.textContent = "warning"
    pTag.textContent = message
    pTag.className = "font-normal"
    message_banner.append(spanIcon)
    message_banner.append(pTag)
}

// movie

file_upload_poster.addEventListener('change', function (e) {
    var file = e.target.files[0]
    uploadFilePoster(file).then().catch(err => console.log(err))
})


async function uploadFilePoster(file) {
    const formFile = new FormData()
    const request = new Request('/upload')
    formFile.append('file', file)
    try {
        const response = await fetch(request, {
            method: 'POST',
            body: formFile
        })
        console.log(response)
        const result = await response.json()
        preview_poster.src = result.data
        preview_poster.classList.remove('hidden')
        console.log(result)
    } catch (err) {
        console.log(err)
    }
} 


movie_submit_btn.addEventListener('click', function (e) {
    e.preventDefault()
    console.log('click')
    configMovie().then().catch(err => console.log(err))
})

function getTime(time) {
    return new Intl.DateTimeFormat('default',
    {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    }).format(time);
}


async function configMovie () {
    if (movie_type == 'create') {
        try {
            let releaseTime1 = [
                {
                    releaseId: 0,
                    time: movie_release_time_1.value + ':00',
                },
                {
                    releaseId: 0,
                    time: movie_release_time_2.value + ':00',
                },
                {
                    releaseId: 0,
                    time: movie_release_time_3.value + ':00',
                },
                {
                    releaseId: 0,
                    time: movie_release_time_4.value + ':00',
                }
            ]
            let releaseTime2 = [
                {
                    releaseId: 0,
                    time: movie_release_time_5.value + ':00',
                },
                {
                    releaseId: 0,
                    time: movie_release_time_6.value + ':00',
                },
                {
                    releaseId: 0,
                    time: movie_release_time_7.value + ':00',
                },
                {
                    releaseId: 0,
                    time: movie_release_time_8.value + ':00',
                }
            ]
            let releaseDate = [
                {
                    releaseId: 0,
                    movieId: 0,
                    date: new Date(movie_release_1.value).toISOString(),
                    releaseTimes: releaseTime1
                },
                {
                    releaseId: 0,
                    movieId: 0,
                    date: new Date(movie_release_2.value).toISOString(),
                    releaseTimes: releaseTime2
                },
            ]
            let movie = {}
            movie.movieId = 0
            movie.poster = preview_poster.src
            movie.title = movie_title.value
            movie.year = Number(movie_year.value)
            movie.released = new Date(movie_released.value).toISOString()
            movie.runtime = movie_runtime.value + ':00'
            movie.genre = movie_genre.value
            movie.releaseMovies = releaseDate

            console.log(JSON.stringify(movie))
            const request = new Request('/movie')
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            if (!response.ok) {
                throw new Error()
            }
            console.log(response)
            const result = await response.json()
            console.log(result)
            if (result.success) {
                messageMovieModalSuccess(result.message)
            } else {
                
            }
        } catch (err) {
            console.log(err)
            messageBannerModalError('error to create banner')
        }
    } else {

    }
}

function messageMovieModalSuccess(message) {
    message_movie.textContent = ''
    message_movie.classList.remove('hidden')
    message_movie.classList.add('bg-green-400', 'px-2', 'py-3', 'rounded-md', 'my-4')
    const spanIcon = document.createElement('span')
    const pTag = document.createElement('p')
    spanIcon.className = "material-symbols-outlined text-gray-800"
    spanIcon.textContent = "check"
    pTag.textContent = message
    pTag.className = "font-normal"
    message_movie.append(spanIcon)
    message_movie.append(pTag)
    movie_form.reset()
    setTimeout(() => {
        show_modal_movie.classList.add('hidden')
        show_modal_movie.classList.remove('opacity-1')
    }, 2000)
    loadMovie()
}

loadMovie()
 async function loadMovie() {
    try {
        const request = new Request('/movie')
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log('error')
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            createMovieTable(result.data)
        } else {
            movie_table_body.textContent = ''
        }
    } catch (err) {
        console.log(err)
    }
}

function createMovieTable(data) {
    movie_table_body.textContent = ''
    data.forEach(d => {
        trTag = document.createElement('tr')
        thTag1 = document.createElement('th')
        thTag2 = document.createElement('th')
        thTag3 = document.createElement('th')
        thTag4 = document.createElement('th')
        thTag5 = document.createElement('th')
        editBtn = document.createElement('button')
        deleteBtn = document.createElement('button')
        thTag1.textContent = d.title
        thTag1.className = 'text-white border border-gray-200'
        thTag2.textContent = d.released
        thTag2.className = 'text-white border border-gray-200'
        thTag3.textContent = d.runtime
        thTag3.className = 'text-white border border-gray-200'
        thTag4.textContent = d.genre
        thTag4.className = 'text-white border border-gray-200'
        thTag5.className = 'text-white border border-gray-200 gap-2'
        editBtn.textContent = 'Edit'
        editBtn.className = 'bg-white py-2 px-1 rounded-md text-gray-800 mx-2 font-normal'
        editBtn.addEventListener('click', editMovie.bind(null, d.movieId))
        deleteBtn.textContent = 'Delete'
        deleteBtn.className = 'bg-white py-2 px-1 rounded-md text-gray-800 mx-2 font-normal'
        deleteBtn.addEventListener('click', deleteMovie.bind(null, d.movieId))
        thTag5.append(editBtn)
        thTag5.append(deleteBtn)
        trTag.append(thTag1)
        trTag.append(thTag2)
        trTag.append(thTag3)
        trTag.append(thTag4)
        trTag.append(thTag5)
        movie_table_body.append(trTag)
    })
}

function editMovie(id) {
    
}

function deleteMovie(id) {
    deleteMovieById(id)
}

async function deleteMovieById(id) {
    try {
        const request = new Request(`/movie/${id}`)
        const response = await fetch(request, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error()
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            console.log('success')
            loadMovie()
        }
    } catch (err) {
        //messageBannerModalError(`can't load movie with id : ${id}`)
    }
}