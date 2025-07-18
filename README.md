# Customizable HUD Project

A full-stack application for customizing HUD (Head-Up Display) data visualization for cycling glasses.

## Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Authentication**: Firebase Admin SDK
- **Deployment**: Google Cloud + Firebase Hosting

## Quick Start

### Local Development

1. **Start Backend**:
```bash
cd back_end
npm install
npm start
```

2. **Start Frontend**:
```bash
cd front_end/ride-hud-joyride-setup-main
npm install
npm run dev
```

3. Access Application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000/api/user/hud

### Docker Setup

```bash
cd back_end
docker compose up --build
```

## Project Structure

```
customizable-hud/
├── back_end/
│   ├── src/
│   │   ├── index.ts
│   │   └── routes/
│   │       └── hud.ts
│   ├── package.json
│   ├── Dockerfile
│   └── docker-compose.yml
├── front_end/
│   └── ride-hud-joyride-setup-main/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── pages/
│       │   └── components/
│       └── package.json
├── firebase.json
├── .firebaserc
└── DEPLOYMENT_GUIDE.md
```

## Deployment

### Firebase Hosting (Frontend)
```bash
npm run build
firebase deploy
```

### Google Cloud Run (Backend)
```bash
gcloud run deploy hud-backend --source . --platform managed
```

### Complete Guide
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## Testing

### API Testing
```bash
curl http://localhost:4000/api/user/hud
```

### Frontend Testing
```bash
npm run build
npm run preview
```

## Environment Variables

### Backend (.env)
```
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/era_db
FIREBASE_PROJECT_ID=customize-hud
```

### Production
- Configure Cloud SQL for database
- Set up Firebase project
- Update environment variables for production

## Features

- **HUD Customization Interface**: Interactive UI for customizing display elements
- **Real-time Data**: Live updates for cycling metrics
- **Responsive Design**: Works on desktop and mobile
- **Firebase Integration**: Authentication and data storage
- **Docker Support**: Containerized deployment

## Security

- Firebase Authentication
- Environment variable management
- CORS configuration
- Input validation

## Monitoring

- Google Cloud Monitoring
- Firebase Analytics
- Error tracking
- Performance monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the deployment guide
2. Review the project structure
3. Test locally first
4. Check logs for errors

---

Status: Ready for production deployment
