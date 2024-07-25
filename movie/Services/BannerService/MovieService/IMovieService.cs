using movie.Models;

namespace movie.Services.BannerService.MovieService
{
    public interface IMovieService
    {
        Task<ResponseModel<List<Movie>>> getAllMovie();
        Task<ResponseModel<Movie>> getMovie(int id);
        Task<ResponseModel<object>> createMovie(Movie model);
        Task<ResponseModel<object>> updateMovie(int id, Movie model);
        Task<ResponseModel<object>> deleteMovie(int id);
    }
}
