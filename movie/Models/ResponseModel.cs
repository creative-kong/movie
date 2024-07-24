namespace movie.Models
{
    public class ResponseModel<T>
    {
        public bool? success { get; set; }
        public T? data { get; set; }
        public string? message { get; set; }
    }
}
