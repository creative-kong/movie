using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;

namespace movie.Services.CommandService
{
    public class CommandService : ICommandService
    {
        private string? connectionString = string.Empty;
        public CommandService (IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<DataTable> SqlExecute(string sql, SqlParameter[]? parameters)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlDataAdapter da = new SqlDataAdapter(sql, connection);
                    if (parameters != null && parameters.Length > 0)
                    {
                        da.SelectCommand.Parameters.AddRange(parameters);
                    }
                    da.Fill(dt);
                    if (connection.State == ConnectionState.Open)
                    {
                        await connection.CloseAsync();
                    }
                    return dt;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> SqlExecuteNoneQuery(string sql, SqlParameter[]? parameters)
        {
            int i = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand(sql, connection);
                    if (parameters != null && parameters.Length > 0)
                    {
                        cmd.Parameters.AddRange(parameters);
                    }
                    if (connection.State == ConnectionState.Open)
                    {
                        await connection.CloseAsync();
                    }
                    await connection.OpenAsync();
                    i = await cmd.ExecuteNonQueryAsync();
                    await connection.CloseAsync();
                    return i;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> SqlExecuteNoneQueryTran(string sql, SqlConnection connection, SqlTransaction tran, SqlParameter[]? parameters)
        {
            int i;
            try
            {
                SqlCommand cmd = new SqlCommand(sql, connection);
                if (parameters != null && parameters.Length > 0)
                {
                    cmd.Parameters.AddRange(parameters);
                }
                cmd.Transaction = tran;
                i = await cmd.ExecuteNonQueryAsync();
                return i;
            }
            catch (Exception)
            {
                throw;
            }
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

        public async Task<DataTable> StoredExecuteTran(string storedName, SqlConnection connection, SqlTransaction tran, SqlParameter[]? parameters)
        {
            DataTable dt = new DataTable();
            try
            {
                SqlCommand cmd = new SqlCommand(storedName, connection);
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null && parameters.Length > 0)
                {
                    cmd.Parameters.AddRange(parameters);
                }
                cmd.Transaction = tran;
                var reader = await cmd.ExecuteReaderAsync();
                dt.Load(reader);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
