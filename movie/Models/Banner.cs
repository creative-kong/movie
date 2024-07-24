using Newtonsoft.Json;

namespace movie.Models
{
    public class Banner
    {
        [JsonProperty("bannerId")]
        public int? bannerId { get; set; }
        [JsonProperty("bannerUrl")]
        public string? bannerUrl { get; set; }
        [JsonProperty("isActive")]
        public bool? isActive { get; set; }
    }
}
