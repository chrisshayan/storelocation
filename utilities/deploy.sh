# stop services
cd ~/storelocation
pm2 stop storelocation
systemctl stop storelocation

# backup configurations
cp -p backend/flaskr/config.py ~
cp -p frontend/src/environments/environment.ts ~
git checkout frontend/src/environments/environment.ts
git checkout backend/flaskr/config.py

# update services
git pull
cp -p ~/config.py backend/flaskr/config.py
cp -p ~/environment.ts frontend/src/environments/environment.ts

# start services
systemctl start storelocation
pm2 start storelocation