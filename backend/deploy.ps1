cd backend

gcloud builds submit --tag gcr.io/storelocation-f9311/api

gcloud beta run deploy --image gcr.io/storelocation-f9311/api --platform managed