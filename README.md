# TakaChoisir
## How to start it in dev mode
```
npm install
npm run react-dev
npm run server-dev
```
## Build for production :
#### 1 : complete the file webpack.config.js file 
```
55  username: 'yann.doudin', //login LDAP ici
56  password: 'mdp', //password here
```
#### 2 : run this command to deploy everithing (careful, this will overwrite the files)
```
npm run build
```
#### 3 : in the VM run this command to update the server (backend) 
```
pm2 restart 1
```
#### 4 : the app is available at this URL 
```
http://takachoisir.tic.heia-fr.ch
```
#### note 
if you added or updated a npm package, you have to run the istall command in the VM
```
npm install
```