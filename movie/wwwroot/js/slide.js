const banner_slide = document.getElementById('banner_slide')
let slideIndex = 0
async function getBanner() {
    try {
        const request = new Request('/showbanner')
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error()
        }
        const result = await response.json()
        console.log(result)
        if (result.success) {
            createslides(result.data)
        }
    }
    catch (err) {
        console.log(err)
    }
}

getBanner().then().catch(err => console.log(err))

function createslides(data) {
    data.forEach(d => {
        const divTag = document.createElement('div')
        divTag.className = 'fade hidden bg-red-500 h-[350px]'
        divTag.id = 'slide'
        const imgTag = document.createElement('img')
        imgTag.src = d.bannerUrl
        imgTag.className = 'h-[350px] w-full'
        divTag.append(imgTag)
        banner_slide.append(divTag)
    })
    showSlides()
}

function showSlides() {
    let i
    let slides = document.querySelectorAll('#slide')
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden')
    }
    slideIndex++
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].classList.remove('hidden')
    setTimeout(showSlides, 2000)
}