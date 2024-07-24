using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Security.Cryptography;

namespace movie.Controllers
{
    public class UploadController : Controller
    {
        [HttpPost("upload")]
        public IActionResult Upload(IFormFile file)
        {
            var response = StatusCode(StatusCodes.Status200OK, new
            {
                success = false,
                data = "",
                message = "can't upload file"
            });
            try
            {
                var folderName = Path.Combine("Upload");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var folderExists = Directory.Exists(pathToSave);
                var fileUrl = string.Empty;
                if (!folderExists)
                {
                    string root = Directory.GetCurrentDirectory();
                    Directory.CreateDirectory(Path.Combine(root, folderName));
                }
                if (file.Length > 0)
                {
                    var fileData = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var extension = System.IO.Path.GetExtension(fileData);
                    var fileName = DateTime.Now.ToString("yyyyMMdd-HHmmssfff");
                    var newName = fileName + extension;

                    var fullPath = Path.Combine(pathToSave, newName);
                    var pathDb = Path.Combine(folderName, newName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        fileUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/" + pathDb.Replace("\\", "/");
                        response = StatusCode(StatusCodes.Status200OK, new
                        {
                            success = true,
                            data = fileUrl,
                            message = "upload successfully"
                        });
                    }
                }
            }
            catch (Exception ex) 
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    data = "",
                    message = "server error"
                });
            }

            return response;
        }
    }
}
