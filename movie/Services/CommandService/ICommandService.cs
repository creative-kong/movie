using System.Data;
using System.Data.SqlClient;

namespace movie.Services.CommandService
{
    public interface ICommandService
    {
        Task<DataTable> StoredExecute(string storedName, SqlParameter[]? parameters);
    }
}
