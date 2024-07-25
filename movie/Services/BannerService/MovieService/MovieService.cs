using Microsoft.AspNetCore.Mvc.Formatters;
using movie.Models;
using movie.Services.CommandService;
using System.Data;
using System.Data.SqlClient;

namespace movie.Services.BannerService.MovieService
{
    public class MovieService : IMovieService
    {
        private string? connectionString = string.Empty;
        private readonly ICommandService _cmd;
        public MovieService(IConfiguration configuration, ICommandService cmd) 
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
            _cmd = cmd;
        }
        public async Task<ResponseModel<object>> createMovie(Movie model)
        {
            ResponseModel<object> response = new ResponseModel<object>();
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    if (connection.State == ConnectionState.Open)
                    {
                        await connection.CloseAsync();
                    }
                    SqlTransaction tran = connection.BeginTransaction();
                    string storedName = "manage_movie";
                    SqlParameter[] parameters = new SqlParameter[]
                    {
                        new SqlParameter () { ParameterName = "@movieId", SqlDbType = SqlDbType.Int, Value = 0 },
                        new SqlParameter () { ParameterName = "@poster", SqlDbType = SqlDbType.NVarChar, Value = model.poster },
                        new SqlParameter () { ParameterName = "@title", SqlDbType = SqlDbType.NVarChar, Value = model.title },
                        new SqlParameter () { ParameterName = "@year", SqlDbType = SqlDbType.Int, Value = model.year },
                        new SqlParameter () { ParameterName = "@released", SqlDbType = SqlDbType.DateTime, Value = model.released },
                        new SqlParameter () { ParameterName = "@runtime", SqlDbType = SqlDbType.Time, Value = model.runtime },
                        new SqlParameter () { ParameterName = "@genre", SqlDbType = SqlDbType.NVarChar, Value = model.genre }
                    };
                    dt = await _cmd.StoredExecuteTran(storedName, connection, tran, parameters);
                    if (dt.Rows[0]["V_COLUMN"].ToString() == "-1")
                    {
                        tran.Rollback();
                        throw new Exception("can't create movie");
                    }
                    else
                    {
                        int _id = Int32.Parse(dt.Rows[0]["V_COLUMN"].ToString());

                        foreach(ReleaseMovie release in model.releaseMovies)
                        {
                            storedName = "manage_releaseMovie";
                            parameters = new SqlParameter[]
                            {
                                new SqlParameter () { ParameterName = "@releaseId", SqlDbType = SqlDbType.Int, Value = 0 },
                                new SqlParameter () { ParameterName = "@movieId", SqlDbType = SqlDbType.Int, Value = _id },
                                new SqlParameter () { ParameterName = "@date", SqlDbType = SqlDbType.Date, Value = release.date }
                            };
                            dt = await _cmd.StoredExecuteTran(storedName, connection, tran, parameters);
                            if (dt.Rows[0]["V_COLUMN"].ToString() == "-1")
                            {
                                tran.Rollback();
                                throw new Exception("can't create movie");
                            }
                            else
                            {
                                int id = Int32.Parse(dt.Rows[0]["V_COLUMN"].ToString());
                                foreach(ReleaseTime time in release.releaseTimes)
                                {
                                    storedName = "manage_releaseTime";
                                    parameters = new SqlParameter[]
                                    {
                                        new SqlParameter () { ParameterName = "@releaseId", SqlDbType = SqlDbType.Int, Value = id },
                                        new SqlParameter () { ParameterName = "@time", SqlDbType = SqlDbType.Time, Value = time.time }
                                    };
                                    dt = await _cmd.StoredExecuteTran(storedName, connection, tran, parameters);
                                    if (dt.Rows[0]["V_COLUMN"].ToString() == "-1")
                                    {
                                        tran.Rollback();
                                        throw new Exception("can't create movie");
                                    }
                                }
                                tran.Commit();
                            }
                        }
                    }
                    response = new ResponseModel<object>()
                    {
                        success = true,
                        data = new object (),
                        message = "successfully"
                    };
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ResponseModel<object>> deleteMovie(int id)
        {
            ResponseModel<object> response = new ResponseModel<object>();
            try
            {
                const string storedName = "delete_movie";
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter () { ParameterName = "@movieId", SqlDbType = SqlDbType.Int, Value = id }
                };
                DataTable dt = await _cmd.StoredExecute(storedName, parameters);
                if (dt.Rows[0]["V_COLUMN"].ToString() == "-1")
                {
                    response = new ResponseModel<object>()
                    {
                        success = false,
                        data = new object(),
                        message = "can't delete movie"
                    };
                }
                else
                {
                    response = new ResponseModel<object>()
                    {
                        success = true,
                        data = new object(),
                        message = "successfully"
                    };
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Task<ResponseModel<List<Movie>>> getAllMovie()
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel<Movie>> getMovie(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseModel<object>> updateMovie(int id, Movie model)
        {
            ResponseModel<object> response = new ResponseModel<object>();
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    if (connection.State == ConnectionState.Open)
                    {
                        await connection.CloseAsync();
                    }
                    SqlTransaction tran = connection.BeginTransaction();
                    string storedName = "manage_movie";
                    SqlParameter[] parameters = new SqlParameter[]
                    {
                        new SqlParameter () { ParameterName = "@movieId", SqlDbType = SqlDbType.Int, Value = id },
                        new SqlParameter () { ParameterName = "@poster", SqlDbType = SqlDbType.NVarChar, Value = model.poster },
                        new SqlParameter () { ParameterName = "@title", SqlDbType = SqlDbType.NVarChar, Value = model.title },
                        new SqlParameter () { ParameterName = "@year", SqlDbType = SqlDbType.Int, Value = model.year },
                        new SqlParameter () { ParameterName = "@released", SqlDbType = SqlDbType.DateTime, Value = model.released },
                        new SqlParameter () { ParameterName = "@runtime", SqlDbType = SqlDbType.Time, Value = model.runtime },
                        new SqlParameter () { ParameterName = "@genre", SqlDbType = SqlDbType.NVarChar, Value = model.genre }
                    };
                    dt = await _cmd.StoredExecuteTran(storedName, connection, tran, parameters);
                    if (dt.Rows[0]["V_COLUMN"].ToString() == "-1")
                    {
                        tran.Rollback();
                        throw new Exception("can't create movie");
                    }
                    else
                    {
                        int _id = Int32.Parse(dt.Rows[0]["V_COLUMN"].ToString());
                        string sql = "DELETE FROM releaseTime WHERE releaseId = @releaseId";
                        parameters = new SqlParameter[]
                        {
                            new SqlParameter () { ParameterName = "@releaseId", SqlDbType = SqlDbType.Int, Value  = _id }
                        };

                        int i = await _cmd.SqlExecuteNoneQueryTran(sql, connection, tran, parameters);

                        if (i < 0)
                        {
                            tran.Rollback();
                            throw new Exception("can't create movie");
                        }
                        else
                        {
                            foreach (ReleaseMovie release in model.releaseMovies)
                            {
                                storedName = "manage_releaseMovie";
                                parameters = new SqlParameter[]
                                {
                                new SqlParameter () { ParameterName = "@releaseId", SqlDbType = SqlDbType.Int, Value = release.releaseId },
                                new SqlParameter () { ParameterName = "@movieId", SqlDbType = SqlDbType.Int, Value = _id },
                                new SqlParameter () { ParameterName = "@date", SqlDbType = SqlDbType.Date, Value = release.date }
                                };
                                dt = await _cmd.StoredExecuteTran(storedName, connection, tran, parameters);
                                if (dt.Rows[0]["V_COLUMN"].ToString() == "-1")
                                {
                                    tran.Rollback();
                                    throw new Exception("can't create movie");
                                }
                                else
                                {
                                    int xid = Int32.Parse(dt.Rows[0]["V_COLUMN"].ToString());
                                    foreach (ReleaseTime time in release.releaseTimes)
                                    {
                                        storedName = "manage_releaseTime";
                                        parameters = new SqlParameter[]
                                        {
                                        new SqlParameter () { ParameterName = "@releaseId", SqlDbType = SqlDbType.Int, Value = id },
                                        new SqlParameter () { ParameterName = "@time", SqlDbType = SqlDbType.Time, Value = time.time }
                                        };
                                        dt = await _cmd.StoredExecuteTran(storedName, connection, tran, parameters);
                                        if (dt.Rows[0]["V_COLUMN"].ToString() == "-1")
                                        {
                                            tran.Rollback();
                                            throw new Exception("can't create movie");
                                        }
                                    }
                                    tran.Commit();
                                }
                            }
                        }
                    }
                    response = new ResponseModel<object>()
                    {
                        success = true,
                        data = new object(),
                        message = "successfully"
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
