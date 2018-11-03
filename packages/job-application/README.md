```
                   _       _                            _ _           _   _             
                  (_)     | |                          | (_)         | | (_)            
  _ __ ___   ___   _  ___ | |__ ______ __ _ _ __  _ __ | |_  ___ __ _| |_ _  ___  _ __  
 | '_ ` _ \ / _ \ | |/ _ \| '_ \______/ _` | '_ \| '_ \| | |/ __/ _` | __| |/ _ \| '_ \ 
 | | | | | |  __/_| | (_) | |_) |    | (_| | |_) | |_) | | | (_| (_| | |_| | (_) | | | |
 |_| |_| |_|\___(_) |\___/|_.__/      \__,_| .__/| .__/|_|_|\___\__,_|\__|_|\___/|_| |_|
                 _/ |                      | |   | |                                    
                |__/                       |_|   |_|                                    
```

Tie together [letter](../letter) and [resume](../resume) to create cohesive job application packages per #55.

1. Place a JS/JSX file (say `some-awesome-company.jsx`) that returns an instance of [`JobApplication`](./src/lib/jobApplication) in `/src/job-applications`
2. Generate your documents by running `npm run job-applications -- --name some-awesome-company`
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
npm start # Generate a stock, unpersonalized package
```

# Testing

```
npm test
```

# Generation

```
npm run build
npm run job-applications # Generate a stock, unpersonalized package
npm run job-applications -- --name some-awesome-company # Generate a package specific to `some-awesome-company`
```
