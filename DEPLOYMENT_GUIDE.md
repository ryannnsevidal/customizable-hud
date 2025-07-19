# Customizable HUD - Complete Deployment Guide

## Prerequisites Checklist

All tools installed:
- Google Cloud CLI (530.0.0) 
- Firebase CLI (13.36.0)
- Docker & Docker Compose
- Node.js and npm

Project authenticated:
- Google Cloud: `gcloud auth login` completed
- Active project: `customize-hud`

Required before deployment:
- Enable billing in Google Cloud Console for project `customize-hud`

## One-Command Deployment

Once billing is enabled, run:

```bash
./quick-deploy.sh
```

## Manual Step-by-Step Deployment
echo "- Login to Firebase: firebase login"
echo ""
echo "Steps:"
echo "1. cd /workspaces/customizable-hud"
echo "2. firebase init hosting"
echo "3. Build frontend: cd front_end/back_end/both && npm run build"
echo "4. Deploy: firebase deploy"
echo ""
echo "Your frontend will be available at: https://customize-hud.web.app"
echo ""

echo "Google Cloud Run (Backend)"
echo "---------------------------"
echo "Prerequisites:"
echo "- Install Google Cloud CLI: https://cloud.google.com/sdk/docs/install"
echo "- Login: gcloud auth login"
echo "- Set project: gcloud config set project customize-hud"
echo ""
echo "Steps:"
echo "1. cd /workspaces/customizable-hud/back_end"
echo "2. Build Docker image: docker build -t gcr.io/customize-hud/hud-backend ."
echo "3. Push to registry: docker push gcr.io/customize-hud/hud-backend"
echo "4. Deploy to Cloud Run: gcloud run deploy hud-backend --image gcr.io/customize-hud/hud-backend --platform managed --region us-central1 --allow-unauthenticated"
echo ""

echo "Google Cloud SQL (Database)"
echo "----------------------------"
echo "1. Create Cloud SQL PostgreSQL instance"
echo "2. Update DATABASE_URL in app.yaml"
echo "3. Enable Cloud SQL Admin API"
echo ""

echo "Complete Google Cloud setup"
echo "---------------------------"
echo "1. cd /workspaces/customizable-hud/back_end"
echo "2. gcloud app deploy app.yaml"
echo ""

echo "Testing and A/B testing"
echo "-----------------------"
echo "Firebase A/B Testing:"
echo "1. Go to Firebase Console > A/B Testing"
echo "2. Create experiment"
echo "3. Set up variants"
echo "4. Configure goals and metrics"
echo ""
echo "Google Analytics:"
echo "1. Add GA4 to your frontend"
echo "2. Set up conversion tracking"
echo "3. Create custom events"
echo ""

echo "Environment setup"
echo "-----------------"
echo "Production Environment Variables:"
echo "- DATABASE_URL: Your Cloud SQL connection string"
echo "- FIREBASE_PROJECT_ID: customize-hud"
echo "- PORT: 8080 (for App Engine)"
echo ""

echo "Monitoring and logging"
echo "----------------------"
echo "- Use Google Cloud Monitoring"
echo "- Set up alerts for errors"
echo "- Monitor response times"
echo "- Track user engagement"
echo ""

echo "Quick deployment commands"
echo "------------------------"
echo "# Frontend to Firebase:"
echo "cd /workspaces/customizable-hud/front_end/back_end/both"
echo "npm run build"
echo "cd ../../.."
echo "firebase deploy"
echo ""
echo "# Backend to Cloud Run:"
echo "cd /workspaces/customizable-hud/back_end"
echo "gcloud run deploy hud-backend --source . --platform managed --region us-central1"
echo ""

echo "Project is ready for deployment."
echo "---------------------------------"
echo "Current status:"
echo "- Backend API working at: http://localhost:4000/api/user/hud"
echo "- Docker containers running successfully"
echo "- Firebase configuration created"
echo "- Google Cloud configuration created"
echo ""
echo "Next steps:"
echo "1. Choose your deployment method"
echo "2. Set up production database"
echo "3. Configure environment variables"
echo "4. Deploy and test"
echo "5. Set up monitoring"
echo ""
echo "Ready to push to production."
