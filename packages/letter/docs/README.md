```plaintext
                             /$$             /$$     /$$                        
                            | $$            | $$    | $$                        
 /$$$$$$/$$$$   /$$$$$$     | $$  /$$$$$$  /$$$$$$ /$$$$$$    /$$$$$$   /$$$$$$ 
| $$_  $$_  $$ /$$__  $$    | $$ /$$__  $$|_  $$_/|_  $$_/   /$$__  $$ /$$__  $$
| $$ \ $$ \ $$| $$$$$$$$    | $$| $$$$$$$$  | $$    | $$    | $$$$$$$$| $$  \__/
| $$ | $$ | $$| $$_____/    | $$| $$_____/  | $$ /$$| $$ /$$| $$_____/| $$      
| $$ | $$ | $$|  $$$$$$$ /$$| $$|  $$$$$$$  |  $$$$/|  $$$$/|  $$$$$$$| $$      
|__/ |__/ |__/ \_______/|__/|__/ \_______/   \___/   \___/   \_______/|__/      
```

The spiritual companion to my [résumé](../resume). Just generate some cover letters that match everything else in this monorepo.

1. Place a JS/JSON/JSX file (say `some-awesome-company.json`) that can be parsed into an instance of [`Letter`](./src/lib/letter) in `/src/letters`
2. Generate your letters by running `npm run letter`
3. View them with `open ./dist`

# Dependencies

```
brew install nvm
nvm install 8
```

# Installation

```
npm install
```

# Usage

```
npm start
```

# Testing

```
npm test
```

# Generation

```
npm run build
npm run letter
```
