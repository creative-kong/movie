using Microsoft.AspNetCore.Mvc;
using movie.Models;
using movie.Services.BannerService;

namespace movie.Controllers
{
    public class BannerController : Controller
    {
        private readonly IBannerService _banner;
        public BannerController(IBannerService banner) 
        {
            _banner = banner;
        }

        [HttpPost("/banner")]
        public async Task<IActionResult> createBanner([FromBody] Banner model)
        {
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<Banner> result = await _banner.createBanner(model);
                response = StatusCode(StatusCodes.Status200OK, result);
            }
            catch (Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, new ResponseModel<object>()
                {
                    success = false,
                    data = new object(),
                    message = ex.Message
                });
            }

            return response;
        }

        [HttpGet("/banner")]
        public async Task<IActionResult> getAllBanner()
        {
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<List<Banner>> result = await _banner.getAllBanner();
                response = StatusCode(StatusCodes.Status200OK, result);
            }
            catch (Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, new ResponseModel<object>()
                {
                    success = false,
                    data = new object(),
                    message = ex.Message
                });
            }

            return response;
        }

        [HttpGet("/banner/{id}")]
        public async Task<IActionResult> getBanner(int id)
        {
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<Banner> result = await _banner.getBanner(id);
                response = StatusCode(StatusCodes.Status200OK, result);
            }
            catch (Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, new ResponseModel<object>()
                {
                    success = false,
                    data = new object (),
                    message = ex.Message
                });
            }
            return response;
        }
    }
}
