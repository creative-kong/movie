const add_banner = document.getElementById('add_banner')
const show_modal_banner = document.getElementById('show_modal_banner')
const close_banner_modal = document.getElementById('close_banner_modal')
const dropzone = document.getElementById('dropzone')
const file_upload = document.getElementById('file_upload')
const banner_submit = document.getElementById('banner_submit')

add_banner.addEventListener('click', function () {
    show_modal_banner.classList.remove('hidden')
    show_modal_banner.classList.add('opacity-1')
})

close_banner_modal.addEventListener('click', function () {
    show_modal_banner.classList.add('hidden')
    show_modal_banner.classList.remove('opacity-1')
})

file_upload.addEventListener('change', function (e) {
    console.log('change')
    var file = e.target.files[0]
    displayPreview(file)
    uploadFile(file).then().catch(err => console.log(err))
});

function displayPreview(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        var preview = document.getElementById('preview')
        preview.src = reader.result
        preview.classList.remove('hidden')
    };
}

banner_submit.addEventListener('click', function (e) {
    e.preventDefault()
    let file = file_upload.files[0]
    if (file) {
        console.log(file)
        uploadFile(file)
    }
})

async function uploadFile(file) {
    console.log("update")
    const formFile = new FormData()
    const request = new Request('/upload')
    formFile.append('file', file)
    try {
        let response = await fetch(request, {
            method: 'POST',
            body: formFile
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
} 