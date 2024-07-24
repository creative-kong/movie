using Microsoft.AspNetCore.Mvc;
using movie.Models;
using movie.Services.CommandService;
using System.Data;
using System.Data.SqlClient;

namespace movie.Services.BannerService
{
    public class BannerService : IBannerService
    {
        private readonly ICommandService _cmd;
        public BannerService (ICommandService cmd)
        {
            _cmd = cmd;
        }
        public async Task<ResponseModel<Banner>> createBanner(Banner model)
        {
            ResponseModel<Banner> response = new ResponseModel<Banner>();
            try
            {
                const string storedName = "manage_banner";
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter () { ParameterName = "@bannerId", SqlDbType = SqlDbType.Int, Value = 0 },
                    new SqlParameter () { ParameterName = "@bannerUrl", SqlDbType = SqlDbType.NVarChar, Value = model.bannerUrl },
                    new SqlParameter () { ParameterName = "@isActive", SqlDbType = SqlDbType.Bit, Value = model.isActive }
                };
                DataTable dt = await _cmd.StoredExecute(storedName, parameters);
                if (dt.Rows.Count > 0 && dt.Rows[0]["V_COLUMN"].ToString() != "-1")
                {
                    response = new ResponseModel<Banner>()
                    {
                        success = true,
                        data = new Banner (),
                        message = "create banner successfully"
                    };
                }
                else
                {
                    response = new ResponseModel<Banner>()
                    {
                        success = false,
                        data = new Banner (),
                        message = "can't create banner"
                    };
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
