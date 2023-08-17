# bookmarks
## URL
* http://bookmarks.lat


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

## Local project setup


## Project deployment
### AWS Setup
#### AWS User and Role
Create AWS user that will be used for access S3 and EC2. For this user create S3 role with `AmazonS3FullAccess`

#### S3 bucket
**Note**: bucket name should be the same as website hosting name. If application is hosting in `bookmarks.lat` the bucket name should be the `bookmarks.lat`.
Create S3 bucket with public access.
Block public access Off.
Bucket policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::bookmarks.lat/*"
        }
    ]
}
```
In bucket properties setup `Static website hosting`.
#### EC2
In EC2 instance should be installed docker and MongoDb. Use ubuntu as OS.

### Environment variables and GitHub secrets
#### Google registration
Navigate to `Client ID for Web application` in google API, specify application name and `Authorized JavaScript origins` put there `http://localhost:3001`, `http://localhost`, `http://bookmarks.lat`(application public hostname).

#### GutHub Actions Secrets
 - `DOCKER_HUB_USERNAME` - specify docker hub username for your user;
 - `DOCKER_HUB_ACCESS_TOKEN` - specify docker hub secret token for your user;
 - `DOCKER_HUB_PASSWORD` - docker hub user password
 - `BOOKMARKS_GOOGLE_CALLBACK_URL` - register application in google api and specify callback url as `http://localhost:3000/api/v1/auth/login`;
 - `BOOKMARKS_GOOGLE_CLIENT_ID` - get google client ID from google API;
 - `BOOKMARKS_GOOGLE_CLIENT_SECRET` - get google client ID from google API;
 - `AWS_ACCESS_KEY_ID` - register AWS user and generate access key, put in this secret key ID;
 - `AWS_SECRET_ACCESS_KEY` - register AWS user and generate access secret;
 - `AWS_HOST` - AWS EC2 host name;
 - `AWS_USERNAME` - AWS EC2 username;
 - `AWS_PRIVATE_KEY` - AWS private ssh key for EC2 instance (generate ssh keay pair, put public key to ~/.ssh/authorized_keys and public to this secret);

#### GutHub Actions Variables
 - `BOOKMARKS_DB_HOST` - put database host, in case database hosted i the same server just `http://localhost`
 - `BOOKMARKS_DOMAIN` - put domain name `bookmarks.lat` required for Cookie
 - `BOOKMARKS_BASE_URL` - put here application base url `http://server.bookmarks.lat`
 - `S3_BUCKET` - S3 bucket name, should be the same as domain name `bookmarks.lat`
 - `AWS_REGION` - AWS region name `us-east-1`

## Deployment instructions
### Server
 - to build docker image just generate new tag(`svx.x.x`) and push, it trigger docker image generation and publish in docker hub: `yhbankov/bookmarks:latest`, `yhbankov/bookmarks:x.x.x` 
 - deploy server just create branch `deploy-server` and push it with force update flag;

### Client
 - to build and deploy client just create branch `deploy-client` and push it with force update flag;

