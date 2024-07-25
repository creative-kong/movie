namespace movie.Models
{
    public class ReleaseMovie
    {
        public int? releaseId { get; set; }
        public int? movieId { get; set; }
        public DateOnly? date { get; set; }
        List<ReleaseTime>? releaseTimes { get; set; }
    }
}
