using movie.Models;

namespace movie.Services.BannerService
{
    public interface IBannerService
    {
        Task<ResponseModel<Banner>> createBanner(Banner model);
    }
}
