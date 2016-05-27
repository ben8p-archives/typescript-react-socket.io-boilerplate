# after cloning....
(from project directory)  
install everything: `npm intall`

# GRUNT tasks
- to release the app on any file change (client): `npm run dev-client`
- to release the app on any file change (server): `npm run dev-server`
- to release the app: `npm run release`
- to start the server: `npm run start`
- to clean the release folders: `npm run clean`

# gruntfile.js
define all grunt task o help the development

# package.json
define your application package  
use `npm init` to pre-populate  

# tsconfig.json
define how TypeScript will do his job.  
"files" section is dynamic. Do not change.  
Instead update "filesGlob"  

# tslint.json
define how to lint the typescript / jsx code  

# typings.json
define which typings are available for TypeScript  
To install typings:  
  from project directory:  
  `node_modules\.bin\typings install --proxy <PROXY> <TYPING> --global --save`  
  for instance:  
  `node_modules\.bin\typings install --proxy http://user:pass@my.proxy.com:8080 dt~react-dom --global --save`  
