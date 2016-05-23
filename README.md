# after cloning....
(all from project directory)
1. `npm intall`  
2. `node_modules\.bin\typings install dt~react --global --save`  
3. `node_modules\.bin\typings install dt~react-dom --global --save`  

# GRUNT tasks
- to release the app on any change: `node_modules\.bin\grunt watch`
- to clean the "dist" folder: `node_modules\.bin\grunt clean:release`
- to webpack the app: `node_modules\.bin\grunt webpack:main`
- to release the app: `node_modules\.bin\grunt`

# gruntfile.js
define all grunt task o help the development

# package.json
define your application package  
use `npm init` to pre-populate  

# tsconfig.json
define how TypeScript will do his job.  
"files" section is dynamic. Do not change.  
Instead update "filesGlob"  

# typings.json
define which typings are available for TypeScript  
To install typings:  
  from project directory:  
  `node_modules\.bin\typings install --proxy <PROXY> <TYPING> --global --save`  
  for instance:  
  `node_modules\.bin\typings install --proxy http://user:pass@my.proxy.com:8080 dt~react-dom --global --save`  
