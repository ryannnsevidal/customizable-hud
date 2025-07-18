Customizable HUD - Complete Deployment Guide

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

### Step 1: Enable Google Cloud APIs
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com sqladmin.googleapis.com firebase.googleapis.com
```

### Step 2: Create Cloud SQL Database
```bash
gcloud sql instances create hud-postgres \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --storage-size=10GB
```

### Step 3: Create Database and User
```bash
gcloud sql databases create hud_db --instance=hud-postgres
gcloud sql users create hud_user --instance=hud-postgres --password=secure_password
```

### Step 4: Deploy Backend to Cloud Run
```bash
cd back_end
gcloud run deploy hud-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL=postgresql://hud_user:secure_password@/hud_db?host=/cloudsql/customize-hud:us-central1:hud-postgres
```

### Step 5: Build and Deploy Frontend
```bash
cd front_end/ride-hud-joyride-setup-main
npm run build
firebase deploy --only hosting
```

## A/B Testing Setup

### 1. Enable Firebase A/B Testing
```bash
gcloud services enable firebase.googleapis.com
firebase experiments:enable
```

### 2. Create Test in Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select project "customize-hud"
3. Go to "A/B Testing" in left sidebar
4. Create new experiment:
   - **Name**: "HUD Layout Optimization"
   - **Target**: Web app users
   - **Variants**: 
     - Control: Current HUD layout
     - Variant A: Simplified layout
     - Variant B: Enhanced layout
   - **Metrics**: User engagement, customization actions

### 3. Implement in Frontend
Add to `src/main.tsx`:
```typescript
import { getRemoteConfig } from 'firebase/remote-config';

const remoteConfig = getRemoteConfig();
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000, // 1 hour
};

// Use remote config values for A/B testing
const hudLayoutVariant = remoteConfig.getValue('hud_layout_variant').asString();
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://hud_user:secure_password@/hud_db?host=/cloudsql/customize-hud:us-central1:hud-postgres
PORT=4000
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://hud-backend-[hash]-uc.a.run.app
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=customize-hud.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=customize-hud
```

## Monitoring and Debugging

### Check Backend Status
```bash
gcloud run services describe hud-backend --region=us-central1
```

### View Logs
```bash
gcloud run services logs read hud-backend --region=us-central1
```

### Test API Endpoints
```bash
curl https://hud-backend-[hash]-uc.a.run.app/api/hud-settings
```

## Post-Deployment Verification

1. **Frontend**: Visit Firebase hosting URL
2. **Backend**: Test API endpoints
3. **Database**: Verify connection and data
4. **A/B Testing**: Confirm experiments are running

## Troubleshooting

### Common Issues:
1. **Billing not enabled**: Enable in Google Cloud Console
2. **API not enabled**: Run `gcloud services enable` commands
3. **Database connection**: Check Cloud SQL instance status
4. **CORS issues**: Verify backend CORS configuration

### Support:
- Google Cloud: [Cloud Console](https://console.cloud.google.com/)
- Firebase: [Firebase Console](https://console.firebase.google.com/)
- Documentation: [Cloud Run](https://cloud.google.com/run/docs)

## Success Metrics

After deployment, you should see:
- Backend API responding at Cloud Run URL
- Frontend accessible via Firebase Hosting
- Database connected and functional
- A/B tests configured and running
- Monitoring and logging active

## Cost Estimation

**Monthly costs (approximate):**
- Cloud Run: $0-5 (depends on usage)
- Cloud SQL: $7-15 (db-f1-micro)
- Firebase Hosting: $0 (free tier)
- A/B Testing: $0 (free tier)

**Total: ~$7-20/month**

## Next Steps

1. Set up custom domain
2. Configure SSL certificates
3. Add user authentication
4. Implement analytics
5. Set up CI/CD pipeline
6. Add performance monitoring
