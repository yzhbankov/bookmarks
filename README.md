# bookmarks
## URL
* http://yzhbankov-bucket.s3-website.eu-north-1.amazonaws.com

## High-level requirements
### Functional requirements:
* Users should be able to create an account using Google authentication.
* Users should be able to add bookmarks to their account, and categorize them based on tags or folders.
* Users should be able to search for bookmarks by keyword or tag.
* Users should be able to share their bookmarks with other users, either publicly or privately.
* Users should be able to import bookmarks from other users, either partially or fully.
* Users should be able to create bookmark spaces that can be shared with other users.
* Bookmark spaces should be able to be imported partially or fully into another user's space.
* Users should be able to view their bookmarks in a visually appealing and organized manner.
* Users should be able to delete bookmarks from their account.
* The application should have an intuitive and easy-to-use interface.

### Non-functional requirements:
* The application should be scalable to handle up to 1000 users initially, and potentially more in the future.
* The application should be secure and protect user data from unauthorized access or theft.
* The application should be reliable and available 24/7 with minimal downtime.
* The application should be responsive and fast, with minimal lag time when loading bookmarks or performing searches.
* The application should be compatible with modern web browsers and devices.
* The application should be designed with accessibility in mind, and conform to accessibility guidelines.
* The application should be easily maintainable and upgradable.
* The application should have a good user experience, with user feedback and suggestions taken into account for future updates.
* The application should be hosted on a stable and secure server with regular backups and monitoring.
* The application should be compliant with relevant data protection and privacy regulations.

## High-level design
https://miro.com/app/board/uXjVPogokTU=/

## Technologies stack
### Cloud
* AWS EC2
* AWS S3
* AWS Application load balancer

### Server
* NestJs
* MongoDb
* Mongoose

### Client
* React
* React-query
