import sql from 'mssql';

const config = {
  server: process.env.SQL_SERVER || 'sqlserver',
  database: process.env.SQL_DATABASE || 'reposteria_db',
  user: process.env.SQL_USER || 'sa',
  password: process.env.SQL_PASSWORD || 'TuPassword123!',
  options: { trustServerCertificate: true }
};

export const pool = await sql.connect(config);
