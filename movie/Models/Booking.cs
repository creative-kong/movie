namespace movie.Models
{
    public class Booking
    {
        public int? bookingId { get; set; }
        public int? movieId { get; set; }
        public int? releaseId { get; set; }
        public TimeOnly? time { get; set; }
        public string? customer_name { get; set; }
        public string? customer_tel { get; set; }
    }
}
