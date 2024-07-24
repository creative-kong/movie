using System.Data;
using System.Data.SqlClient;

namespace movie.Services.CommandService
{
    public class CommandService : ICommandService
    {
        private string? connectionString = string.Empty;
        public CommandService (IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<DataTable> StoredExecute(string storedName, SqlParameter[]? parameters)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand(storedName, connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    if(parameters != null && parameters.Length > 0)
                    {
                        cmd.Parameters.AddRange(parameters);
                    }
                    if (connection.State == ConnectionState.Open)
                    {
                        await connection.CloseAsync();
                    }
                    await connection.OpenAsync();
                    var reader = await cmd.ExecuteReaderAsync();
                    dt.Load(reader);
                    await connection.CloseAsync();
                    return dt;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
