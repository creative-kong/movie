using Microsoft.AspNetCore.Mvc;

namespace movie.Controllers
{
    public class UploadController : Controller
    {
        [HttpPost]
        public IActionResult Upload (IFormFile file)
        {
            return Ok();
        }
    }
}
