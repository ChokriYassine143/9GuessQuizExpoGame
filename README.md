9Guess Trivia Game
9Guess is a React Native mobile application built with Expo, designed for two or more groups to compete in exciting trivia challenges. Players can use three unique assistant cards—Extra Time, Double Points, and Reveal Trap—to gain an edge over their opponents.
Table of Contents

Features
Installation
Usage
Project Structure
Assistant Cards
Contributing
License

Features

Multi-group trivia competition with real-time scoring.
Three assistant cards for strategic gameplay:
Extra Time: Adds additional time to answer a question.
Double Points: Doubles the points for a correct answer.
Reveal Trap: Exposes a tricky question or incorrect answer option.


Engaging UI built with React Native and Expo.
Cross-platform support for iOS and Android.

Installation
To set up the project locally, follow these steps:

Clone the repository:
git clone https://github.com/yourusername/9guess.git
cd 9guess


Install dependencies:Ensure you have Node.js and Expo CLI installed. Then run:
npm install


Start the Expo development server:
npx expo start


Run the app:

Scan the QR code with the Expo Go app on your iOS or Android device.
Alternatively, run on an emulator:npx expo run:android
npx expo run:ios





Usage

Launch the app and create or join a trivia game session.
Form groups (minimum of two groups required).
Answer trivia questions within the given time limit.
Strategically use assistant cards to maximize your score.
The group with the highest score at the end of the game wins!

Project Structure
9guess/
├── assets/                # Images, fonts, and other static assets
├── components/            # Reusable React Native components
├── screens/               # Main app screens (e.g., Home, Game, Results)
├── navigation/            # Navigation setup (e.g., Stack or Tab Navigator)
├── constants/             # Constants like colors, themes, and trivia data
├── App.js                 # Entry point of the application
├── README.md              # Project documentation
├── package.json           # Project dependencies and scripts

Assistant Cards
Each group can use the following assistant cards once per game:

Extra Time: Extends the question timer by 10 seconds.
Double Points: Doubles the points awarded for the next correct answer.
Reveal Trap: Highlights a misleading answer or reveals a hint for the correct answer.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

Please ensure your code follows the project's coding standards and includes relevant tests.
License
This project is licensed under the MIT License. See the LICENSE file for details.
