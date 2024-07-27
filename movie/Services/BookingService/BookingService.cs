using movie.Models;
using movie.Services.CommandService;
using System.Data.SqlClient;

namespace movie.Services.BookingService
{
    public class BookingService : IBookingService
    {
        private readonly ICommandService _cmd;
        public BookingService(ICommandService cmd) 
        {
            _cmd = cmd;
        }
        public async Task<ResponseModel<object>> createBooking(Booking model)
        {
            ResponseModel<object> response = new ResponseModel<object>();
            try
            {
                string sql = "INSERT INTO booking (movieId, releaseId, time, customer_name, customer_tel)" +
                    " VALUES (@movieId, @releaseId, @time, @customer_name, @customer_tel)";
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter () { ParameterName = "@movieId", SqlDbType = System.Data.SqlDbType.Int, Value = model.movieId },
                    new SqlParameter () { ParameterName = "@releaseId", SqlDbType = System.Data.SqlDbType.Int, Value = model.releaseId },
                    new SqlParameter () { ParameterName = "@time", SqlDbType = System.Data.SqlDbType.Time, Value = model.time.ToString() },
                    new SqlParameter () { ParameterName = "@customer_name", SqlDbType = System.Data.SqlDbType.NVarChar, Value = model.customer_name },
                    new SqlParameter () { ParameterName = "@customer_tel", SqlDbType = System.Data.SqlDbType.NVarChar, Value = model.customer_tel }
                };
                int i = await _cmd.SqlExecuteNoneQuery(sql, parameters);

                if (i < 0)
                {
                    response = new ResponseModel<object>()
                    {
                        success = false,
                        data = new object(),
                        message = "can't booking movie"
                    };
                }
                else
                {
                    response = new ResponseModel<object>()
                    {
                        success = true,
                        data = new object(),
                        message = "successfully"
                    };
                }
            }
            catch(Exception)
            {
                throw;
            }

            return response;
        }
    }
}
