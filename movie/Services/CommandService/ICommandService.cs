using System.Data;
using System.Data.SqlClient;

namespace movie.Services.CommandService
{
    public interface ICommandService
    {
        Task<DataTable> SqlExecute(string sql, SqlParameter[]? parameters);
        Task<int> SqlExecuteNoneQuery(string sql, SqlParameter[]? parameters);
        Task<DataTable> StoredExecute(string storedName, SqlParameter[]? parameters);
        Task<DataTable> StoredExecuteTran(string storedName, SqlConnection connection, SqlTransaction tran, SqlParameter[]? parameters);
    }
}
