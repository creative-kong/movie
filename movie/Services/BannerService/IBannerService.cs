using movie.Models;

namespace movie.Services.BannerService
{
    public interface IBannerService
    {
        Task<ResponseModel<List<Banner>>> getAllBanner();
        Task<ResponseModel<Banner>> getBanner(int id);
        Task<ResponseModel<Banner>> createBanner(Banner model);
    }
}
