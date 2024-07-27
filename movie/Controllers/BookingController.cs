using Microsoft.AspNetCore.Mvc;
using movie.Models;
using movie.Services.BookingService;

namespace movie.Controllers
{
    public class BookingController : Controller
    {
        private readonly IBookingService _booking;
        public BookingController(IBookingService booking) 
        {
            _booking = booking;
        }

        [HttpPost("/booking")]
        public async Task<IActionResult> createBooking ([FromBody] Booking model)
        {
            var response = StatusCode(StatusCodes.Status200OK, new object());
            try
            {
                ResponseModel<object> result = await _booking.createBooking(model);
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
