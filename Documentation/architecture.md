# 🌱 DevGarden Architecture

## 📱 Client Application

The client application is a cross-platform application built using React Native.

### Description

React Native is a framework for building native mobile apps using TypeScript. It allows you to write code once and run it on multiple platforms, including iOS, Android, and the web.

### Why React Native?

- **Cross-Platform**: With React Native, you can maintain a single codebase for multiple platforms. This can save a lot of time and resources compared to writing separate code for each platform. 🔄
- **TypeScript**: React Native uses TypeScript, a statically typed superset of JavaScript. This brings increased robustness and better developer tooling, improving code quality and developer productivity. 🛠️
- **Community Support**: React Native has a large and active community. This means you can find a lot of resources and third-party libraries to help with your project. 👥
- **Performance**: React Native apps perform almost as well as native apps, as they run on the device and have access to native features. ⚡

## 🌐 .NET API

The .NET API is a server-side application that unifies the endpoints from different Git services.

### Description

The .NET API acts as a middleman between the client application and the Git services. It handles the specifics of each Git service and provides a consistent interface for the client application.

### Why .NET API?

- **Familiarity**: The development team is more comfortable with .NET for building APIs. This can lead to faster development and fewer bugs. 🏠
- **Abstraction**: The .NET API abstracts the specifics of each Git service. This makes the client application simpler as it only needs to interact with one API. 🎭
- **Consistency**: The .NET API can provide a consistent data format to the client application, regardless of the data format used by each Git service. 📃
- **Security**: The .NET API can handle authentication and other security measures, reducing the security risks on the client side. 🔒

## 🗄️ Database

The database is a server-side storage system that holds user data and other relevant information.

### Description

The database stores sensitive user data such as access tokens, passwords, and login information. It also stores user preferences and other data related to the Git services. The data is stored server-side for security and accessibility reasons.

### Why Server-Side Database?

- **Security**: Storing sensitive data server-side allows for better control over security measures. Data can be encrypted at rest and in transit, and access can be tightly controlled. 🔒
- **Accessibility**: Data stored server-side can be accessed from any device. This is important for users who want to use the application on multiple devices. 🌐
- **Control**: Storing data on the server gives you more control over data management. You can implement backups, migrations, and other data operations more easily. 🎛️
- **Scalability**: A server-side database can be scaled up to handle more data as your user base grows. 📈

### Data Stored in the Database

| Data Type        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| User ID          | Unique identifier for each user.                                            |
| Access Tokens    | Tokens used to authenticate the user with each Git service.                 |
| Encrypted Password | User's password, stored in an encrypted format for security.               |
| Login Information | Information used to log in to the user's account on each Git service.       |
| :question: User Preferences | User's settings and preferences for the application.                        |
| :question: Git Data         | Data related to the Git services, such as repositories, commits, etc.       |