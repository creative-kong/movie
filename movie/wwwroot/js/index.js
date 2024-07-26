const release_movie = document.getElementById('release_movie')

loadMovie().then().catch(err => console.log(err))

async function loadMovie() {
    try {
        const request = new Request('/movie')
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`can't load movie`)
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            createMovie(result.data)
        }
    } catch (err) {
        console.log(err)
    }
}

function createMovie(data) {
    data.forEach(d => {
        const divTag = document.createElement('div')
        const imgTag = document.createElement('img')
        const divContent = document.createElement('div')
        const h1Tag = document.createElement('h1')
        const p1Tag = document.createElement('p')
        const p2Tag = document.createElement('p')
        const p3Tag = document.createElement('p')
        const p4Tag = document.createElement('p')
        divTag.className = 'flex flex-row gap-4'
        imgTag.src = d.poster
        imgTag.className = 'w-[180px] h-[250px]'
        divContent.className = 'flex flex-col gap-1'
        h1Tag.textContent = 'Title : ' + d.title
        h1Tag.className = 'text-white text-xl'
        p1Tag.textContent = 'Year : ' + d.year
        p1Tag.className = 'text-white'
        p2Tag.textContent = 'Released : ' + `${new Date(d.released).getDay()}/${new Date(d.released).getMonth()}/${new Date(d.released).getFullYear()}` 
        p2Tag.className = 'text-white'
        p3Tag.textContent = 'Runtime : ' + d.runtime
        p3Tag.className = 'text-white'
        p4Tag.textContent = 'Genres : ' + d.genre
        p4Tag.className = 'text-white'
        divContent.append(h1Tag)
        divContent.append(p1Tag)
        divContent.append(p2Tag)
        divContent.append(p3Tag)
        divContent.append(p4Tag)
        divTag.append(imgTag)
        divTag.append(divContent)
        release_movie.append(divTag)
    })
}