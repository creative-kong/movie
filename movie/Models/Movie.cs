namespace movie.Models
{
    public class Movie
    {
        public int? movieId { get; set; }
        public string? poster { get; set; }
        public string? title { get; set; }
        public int? year { get; set; }
        public DateTime? released { get; set; }
        public TimeOnly? runtime { get; set; }
        public string? genre { get; set; }
        public List<ReleaseMovie>? releaseMovies { get; set; }
    }
}
