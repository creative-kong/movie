const add_banner = document.getElementById('add_banner')
const show_modal_banner = document.getElementById('show_modal_banner')
const close_banner_modal = document.getElementById('close_banner_modal')
const dropzone = document.getElementById('dropzone')
const file_upload = document.getElementById('file_upload')

add_banner.addEventListener('click', function () {
    show_modal_banner.classList.remove('hidden')
    show_modal_banner.classList.add('opacity-1')
})

close_banner_modal.addEventListener('click', function () {
    show_modal_banner.classList.add('hidden')
    show_modal_banner.classList.remove('opacity-1')
})

dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('border-indigo-600')
})

dropzone.addEventListener('dragleave', e => {
    e.preventDefault();
    dropzone.classList.remove('border-indigo-600')
})

dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('border-indigo-600')
    var file = e.dataTransfer.files[0]
    displayPreview(file)
});

file_upload.addEventListener('change', e => {
    var file = e.target.files[0]
    displayPreview(file)
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