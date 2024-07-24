const add_banner = document.getElementById('add_banner')
const show_modal_banner = document.getElementById('show_modal_banner')
const close_banner_modal = document.getElementById('close_banner_modal')
const dropzone = document.getElementById('dropzone')
const file_upload = document.getElementById('file_upload')
const banner_submit_btn = document.getElementById('banner_submit')
const preview = document.getElementById('preview')
const cancle_banner_btn = document.getElementById('cancle_banner_btn')

let banner_type = 'create'

add_banner.addEventListener('click', function () {
    show_modal_banner.classList.remove('hidden')
    show_modal_banner.classList.add('opacity-1')
})

close_banner_modal.addEventListener('click', function () {
    show_modal_banner.classList.add('hidden')
    show_modal_banner.classList.remove('opacity-1')
})

cancle_banner_btn.addEventListener('click', function () {
    show_modal_banner.classList.add('hidden')
    show_modal_banner.classList.remove('opacity-1')
})

dropzone.addEventListener('dragover', e => {
    e.preventDefault()
    dropzone.classList.add('border-indigo-600')
})

dropzone.addEventListener('dragleave', e => {
    e.preventDefault()
    dropzone.classList.remove('border-indigo-600')
})

dropzone.addEventListener('drop', e => {
    e.preventDefault()
    dropzone.classList.remove('border-indigo-600')
    var file = e.dataTransfer.files[0]
    uploadFile(file).then().catch(err => console.log(err))
})

file_upload.addEventListener('change', function (e) {
    var file = e.target.files[0]
    uploadFile(file).then().catch(err => console.log(err))
})

banner_submit_btn.addEventListener('click', function (e) {
    e.preventDefault()
})

async function uploadFile(file) {
    const formFile = new FormData()
    const request = new Request('/upload')
    formFile.append('file', file)
    try {
        let response = await fetch(request, {
            method: 'POST',
            body: formFile
        })
        console.log(response)
        let result = await response.json()
        preview.src = result.data
        preview.classList.remove('hidden')
        console.log(result)
    } catch (err) {
        console.log(err)
    }
} 

async function configBanner() {
    if (banner_type === 'create') {

    } else {

    }
}