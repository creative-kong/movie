using Newtonsoft.Json;

namespace movie.Models
{
    public class ReleaseMovie
    {

        public int releaseId { get; set; }
        public int movieId { get; set; }
        public DateTime date { get; set; }
        public List<ReleaseTime> releaseTimes { get; set; }
    }
}
