const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const FACTORY_API_URL = 'https://api.factory.ai';
const GITHUB_REPO = 'rsemeah/InSense';

async function setupFactory() {
  try {
    console.log('🚀 Starting Factory.ai setup...');

    // Read environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY
    };

    // Create project configuration
    const projectConfig = {
      name: 'insense-by-red',
      repository: GITHUB_REPO,
      framework: 'nextjs',
      buildCommand: 'npm run build',
      outputDirectory: '.next',
      installCommand: 'npm install',
      environmentVariables: envVars,
      autoDeploy: true,
      previewDeployments: true,
      nodeVersion: '18.x'
    };

    // Save configuration
    const configPath = path.join(__dirname, '../factory.config.json');
    fs.writeFileSync(configPath, JSON.stringify(projectConfig, null, 2));
    console.log('✅ Project configuration saved');

    // Create deployment script
    const deployScript = `#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🏗️ Building application..."
npm run build

# Run database migrations
echo "🔄 Running database migrations..."
npm run migrate

echo "✅ Deployment preparation complete!"
`;

    const deployScriptPath = path.join(__dirname, 'deploy.sh');
    fs.writeFileSync(deployScriptPath, deployScript);
    fs.chmodSync(deployScriptPath, '755');
    console.log('✅ Deployment script created');

    // Create monitoring configuration
    const monitoringConfig = {
      name: 'insense-monitoring',
      version: '1.0.0',
      metrics: {
        performance: {
          enabled: true,
          interval: 60,
          endpoints: ['/api/health', '/api/onboarding', '/api/auth']
        },
        errors: {
          enabled: true,
          notifyOnError: true,
          logLevel: 'error'
        },
        database: {
          enabled: true,
          interval: 300,
          metrics: ['connection_pool', 'query_performance', 'error_rate']
        }
      },
      alerts: {
        errorRate: {
          threshold: 5,
          window: 300,
          notify: true
        },
        responseTime: {
          threshold: 2000,
          window: 60,
          notify: true
        },
        databaseErrors: {
          threshold: 3,
          window: 60,
          notify: true
        }
      }
    };

    const monitoringConfigPath = path.join(__dirname, '../monitoring.config.json');
    fs.writeFileSync(monitoringConfigPath, JSON.stringify(monitoringConfig, null, 2));
    console.log('✅ Monitoring configuration created');

    console.log('\n📝 Next steps:');
    console.log('1. Go to https://factory.ai');
    console.log('2. Create a new project');
    console.log('3. Connect your GitHub repository:', GITHUB_REPO);
    console.log('4. Import the configuration files we just created');
    console.log('5. Trigger your first deployment');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  }
}

setupFactory(); 