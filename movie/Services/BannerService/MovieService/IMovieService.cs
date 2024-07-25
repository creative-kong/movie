using movie.Models;

namespace movie.Services.BannerService.MovieService
{
    public interface IMovieService
    {
        Task<ResponseModel<List<Movies>>> getAllMovie();
        Task<ResponseModel<Movies>> getMovie(int id);
        Task<ResponseModel<object>> createMovie(Movies model);
        Task<ResponseModel<object>> updateMovie(int id, Movies model);
        Task<ResponseModel<object>> deleteMovie(int id);
    }
}
