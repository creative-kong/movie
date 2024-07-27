using movie.Models;

namespace movie.Services.BookingService
{
    public interface IBookingService
    {
        Task<ResponseModel<object>> createBooking(Booking model);
    }
}
