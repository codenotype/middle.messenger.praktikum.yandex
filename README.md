# Chyat app

This application is work in progress.
It should be a messenger app in the nearest future!

Current version contains only basic layout.

# Requirements
NodeJS version is equal or more than 12

# Build and Run
1. Open cmd
2. Enter npm run start
3. Press Enter
4. Wait for message "ChYat app is running on port 3000!"
5. Open http://localhost:3000 in a browser

# Link to design prototype
https://www.figma.com/file/Z6wGXmTK2PGYsHgAw1nmub/chYat?node-id=0%3A1

# Netlify link
https://dainty-alpaca-c3e3a0.netlify.app/

# Code style
- Interfaces and types shouldn't start with T or I, try to find another name
- Try to use verbs for function names and subjectives for constants
- Not nessesary use capital letters for constants primitives
- If number of components for Block class are more than 2, move them to another file

# Latest features
- Events bus for emitting events
- Class for creating components with nested ones
- MVC pattern with updating components
- Chats page is finally opened but still WIP
- Validation for inputs and forms
- Fetch API