const movieId = new URLSearchParams(window.location.search).get('movieId')
const movie_poster = document.getElementById('movie_poster')
const movie_content = document.getElementById('movie_content')
const show_modal_booking = document.getElementById('show_modal_booking')
const movie_booking_id = document.getElementById('movie_booking_id')
const movie_booking_title = document.getElementById('movie_booking_title')
const movie_booking_date_id = document.getElementById('movie_booking_date_id')
const movie_booking_title_id = document.getElementById('movie_booking_title_id')
const movie_booking_date = document.getElementById('movie_booking_date')
const movie_booking_time = document.getElementById('movie_booking_time')
const booking_submit_btn = document.getElementById('booking_submit_btn')
const customer_booking_name = document.getElementById('customer_booking_name')
const customer_booking_tel = document.getElementById('customer_booking_tel')
const message_booking = document.getElementById('message_booking')
const booking_form = document.getElementById('booking_form')
const close_booking_modal = document.getElementById('close_booking_modal')
const cancle_booking_btn = document.getElementById('cancle_booking_btn')

getMovie().then().catch(err => console.log(err))
async function getMovie() {
    try {
        const request = new Request(`/movie/${movieId}`)
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`can't load movie'`)
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            appendMovie(result.data)
        }
    } catch (err) {
        console.log(err)
    }
}

function appendMovie(data) {
    const imgTag = document.createElement('img')
    const containerTag = document.createElement('div')
    const titleMovie = document.createElement('h1')
    const yearMovie = document.createElement('p')
    const releasedMovie = document.createElement('p')
    const runtimeMovie = document.createElement('p')
    const genreMovie = document.createElement('p')
    const containerRelease = document.createElement('div')
    imgTag.src = data.poster
    imgTag.className = 'h-[550px]'
    containerTag.className = 'h-full flex flex-col'
    titleMovie.textContent = 'Movie Title : ' + data.title
    titleMovie.className = 'text-4xl text-gray-200'
    yearMovie.textContent = 'Year : ' + data.year
    yearMovie.className = 'text-2xl text-gray-200 my-4'
    releasedMovie.textContent = 'Released : ' + `${new Date(data.released).getDay()}/${new Date(data.released).getMonth()}/${new Date(data.released).getFullYear()}`
    releasedMovie.className = 'text-2xl text-gray-200 mb-4'
    runtimeMovie.textContent = 'Runtime : ' + data.runtime + ' m.'
    runtimeMovie.className = 'text-2xl text-gray-200 mb-4'
    genreMovie.textContent = 'Genres : ' + data.genre
    genreMovie.className = 'text-2xl text-gray-200 mb-4'
    containerRelease.className = 'flex flex-col gap-4 my-14'
    data.releaseMovies.forEach(r => {
        const releaseDate = document.createElement('p')
        const releaseTime = document.createElement('div')
        releaseDate.textContent = 'Released : ' + `${new Date(r.date).getDay()}/${new Date(r.date).getMonth()}/${new Date(r.date).getFullYear()}`
        releaseDate.className = 'text-gray-200 text-xl'
        releaseTime.className = 'flex flex-row gap-4'
        containerRelease.append(releaseDate)
        containerRelease.append(releaseTime)
        r.releaseTimes.forEach(t => {
            const timeButton = document.createElement('button')
            timeButton.textContent = t.time
            timeButton.className = 'bg-gray-200 w-[150px] px-2 py-3 rounded-md'
            timeButton.addEventListener('click', bookingItem.bind(null, data.movieId, data.title, r.releaseId, r.date, t.time))
            releaseTime.append(timeButton)
        })
    })
    containerTag.append(titleMovie)
    containerTag.append(yearMovie)
    containerTag.append(releasedMovie)
    containerTag.append(runtimeMovie)
    containerTag.append(genreMovie)
    containerTag.append(containerRelease)
    movie_poster.append(imgTag)
    movie_content.append(containerTag)
}

function bookingItem(movieId, title, releaseId, date, time) {
    console.log(movieId, title, releaseId, date, time)
    movie_booking_id.innerHTML = movieId
    movie_booking_title.innerHTML = 'Title : ' + title
    movie_booking_date_id.innerHTML = releaseId
    movie_booking_date.innerHTML = 'Date : ' + `${new Date(date).getDay()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`
    movie_booking_time.innerHTML = 'Time' + time
    showBooking()
}

function showBooking() {
    show_modal_booking.classList.remove('hidden')
    show_modal_booking.classList.add('opacity-1')
}

close_booking_modal.addEventListener('click', function () {
    booking_form.reset()
    show_modal_booking.classList.add('hidden')
    show_modal_booking.classList.remove('opacity-1')
})

cancle_booking_btn.addEventListener('click', function () {
    show_modal_booking.classList.add('hidden')
    show_modal_booking.classList.remove('opacity-1')
})

booking_submit_btn.addEventListener('click', async function (e) {
    e.preventDefault()
    if (customer_booking_name.value != '' || customer_booking_tel.value != '') {
        let booking = {}
        booking.movieId = movie_booking_id.innerHTML
        booking.releaseId = movie_booking_date_id.innerHTML
        booking.time = movie_booking_time.innerHTML.split('e')[1]
        booking.customer_name = customer_booking_name.value
        booking.customer_tel = customer_booking_tel.value
        try {
            const request = new Request('/booking')
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(booking)
            })
            if (!response.ok) {
                throw new Error(`can't create booking'`)
            }
            const result = await response.json()
            if (result.success) {
                booking_submit_btn.disabled = true
                messageModalSuccess(result.message)
            }
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }
    else {
        messageModalWarning('name or tel is required')
    }
})

function messageModalSuccess(message) {
    message_booking.textContent = ''
    message_booking.classList.remove('hidden')
    message_booking.classList.add('bg-green-400', 'px-2', 'py-3', 'rounded-md', 'my-4')
    const spanIcon = document.createElement('span')
    const pTag = document.createElement('p')
    spanIcon.className = "material-symbols-outlined text-gray-800"
    spanIcon.textContent = "check"
    pTag.textContent = message + ' waiting redirect'
    pTag.className = "font-normal"
    message_booking.append(spanIcon)
    message_booking.append(pTag)
    booking_form.reset()
    setTimeout(() => {
        show_modal_banner.classList.add('hidden')
        show_modal_banner.classList.remove('opacity-1')
    }, 2000)
    setTimeout(() => {
        window.location.href = '/'
    }, 2000)
}

function messageModalWarning(message) {
    message_booking.textContent = ''
    message_booking.classList.remove('hidden')
    message_booking.classList.add('bg-yellow-400', 'px-2', 'py-3', 'rounded-md', 'my-4')
    const spanIcon = document.createElement('span')
    const pTag = document.createElement('p')
    spanIcon.className = "material-symbols-outlined text-gray-800"
    spanIcon.textContent = "warning"
    pTag.textContent = message
    pTag.className = "font-normal"
    message_booking.append(spanIcon)
    message_booking.append(pTag)
}