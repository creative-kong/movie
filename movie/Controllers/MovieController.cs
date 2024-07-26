using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using movie.Models;
using movie.Services.MovieService;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace movie.Controllers
{
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movie;
        public MovieController(IMovieService movie) 
        { 
            _movie = movie;
        }

        [HttpPost("/movie")]
        [Consumes("application/json")]
        public async Task<IActionResult> createMovie ([FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] Movies model)
        { 
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<object> result = await _movie.createMovie(model);
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

        [HttpGet("/movie")]
        public async Task<IActionResult> getAllMovie()
        {
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<List<Movies>> result = await _movie.getAllMovie();
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

        [HttpGet("/movie/{id}")]
        public async Task<IActionResult> getMovie(int id)
        {
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<Movies> result = await _movie.getMovie(id);
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

        [HttpDelete("/movie/{id}")]
        public async Task<IActionResult> deleteBanner(int id)
        {
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<object> result = await _movie.deleteMovie(id);
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
    }
}
