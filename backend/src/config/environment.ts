interface EnvironmentConfig {
  database: { url: string };
  jwt: {
    secret: string;
    expiry: string;
    refreshSecret: string;
    refreshExpiry: string;
  };
  api: {
    url: string;
    port: number;
    corsOrigin: string;
  };
  email: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
  logging: {
    level: string;
    dir: string;
  };
  env: 'development' | 'production' | 'testing';
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_EXPIRY',
    'REFRESH_TOKEN_SECRET',
    'REFRESH_TOKEN_EXPIRY',
    'API_URL',
    'API_PORT',
    'CORS_ORIGIN',
    'NODE_ENV',
  ];

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error(`Missing environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  return {
    database: { url: process.env.DATABASE_URL! },
    jwt: {
      secret: process.env.JWT_SECRET!,
      expiry: process.env.JWT_EXPIRY!,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
      refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY!,
    },
    api: {
      url: process.env.API_URL!,
      port: parseInt(process.env.API_PORT!, 10),
      corsOrigin: process.env.CORS_ORIGIN!,
    },
    email: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASSWORD || '',
      from: process.env.SMTP_FROM || 'noreply@lastmilecrm.com',
    },
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      dir: process.env.LOG_DIR || './logs',
    },
    env: (process.env.NODE_ENV as 'development' | 'production' | 'testing') || 'development',
  };
};

export const config = getEnvironmentConfig();
export default config;