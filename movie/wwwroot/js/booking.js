const movieId = new URLSearchParams(window.location.search).get('movieId')
const movie_poster = document.getElementById('movie_poster')
const movie_content = document.getElementById('movie_content')
const show_modal_booking = document.getElementById('show_modal_booking')
const movie_booking_id = document.getElementById('movie_booking_id')
const movie_booking_title = document.getElementById('movie_booking_title')
const movie_booking_date_id = document.getElementById('movie_booking_date_id')
const movie_booking_date = document.getElementById('movie_booking_date')
const movie_booking_time = document.getElementById('movie_booking_time')

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