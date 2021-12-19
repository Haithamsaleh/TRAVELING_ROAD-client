## Master Paece Project (Name)

(Name):the app focus on traveling and cultural exchange to make it essayer for the Tourists
to konw and the touristic places and historical places from Residents of the area ,
so the user can Post on the app his destination and ask about : what to do and not to do ,shops for necessities ,events can vists ,Restaurants...etc.
and the other users commint on the post to help or even arrange meeting to discover the plece together and make new friends .



## User Story 

- **Signup:**  user can sign up in the platform so that the user can start posts and reply to athers posts  
- **Login:**  user can login to the platform so that the user can see his oun posts and reply to the comments on  it 
- **Logout:** As a user I can logout from the platform so no one else can use my profile 
- **Add New Posts:** As a user I can post new post
- **Commint on posts:** As a user I can comment on all posts
- **Messages:** As a user I can seand private  messages to Another user 
- **Friend:** As a user I can add user to firends list and follow thers posts

##Admin Story 
- **Deleat posts:** As a Admin I can deleat any post  
- **Deleat Commint:** As a Admin I can deleat any Commint 
- **banned  user:** As a Admin I can banned any user from commint and post 

# Client / Frontend

## React Router Routes (React App)

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | homePage             | public `<Route>`           | Home page                                                    |
| `/signup`        | SignupPage           | public `<Route>`           | Signup form, link to login, navigate to homepage after signup|
| `/login`         | LoginPage            | public `<Route>`           | Login form, link to signup, navigate to homepage after login |
| `/posts`         | posts Page           | public `<Route>`           | Shows all posts                                              |
| `/post/create`   | create post Page     | user only `<PrivateRoute>` | create a post                                                |
| `/post/:id`      | post Page            | public `<Route>`           | read the post for all , and commint and like for useres, and edit for the owner      |
| `/meetsup`       | meets up Page        | public `<Route>`           | Shows all meets up                                           |
| `/meetup/create` | create meetup Page   | user only `<PrivateRoute>` | create a meet up                                             |
| `/meetup/:id`    | meetup Page          | public `<Route>`           | read the meet up for all , and commint ,like and aplly for useres, and edit for the owner      |
| `/services`      | services Page        | public `<Route>`           | Shows all services                                           |
| `/service/create`| create service Page  | user only `<PrivateRoute>` | create a service                                             |
| `/service/:id`   | service Page         | public `<Route>`           | read the service for all , and commint ,rate  and booking for useres, and edit for the owner      |
| `/profile/:id`   | service Page         | public `<Route>`           | read for all , and edit for the owner                        |

## Components
- HomePage
- PostPage
- MeetupPage
- ServicePage
- LoginPage
- ProfilePage
- SignupPage
- Navbar

# Server / Backend

## Models

User model

```
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  Phonenumber: {type: Number},
  HomeTown: {type: String},
  Sex: {type: String},
  Avatar : {type: String, required: true, default:},
  Bio: {type: String},
  VistedContry: {type: String},
  isdel: {type: boolean, default: false},
  isbanned: {type: boolean, default: false},
  rloe: {type: Schema.Types.ObjectId,ref:'Role'},
  Activate : {type: boolean, default: false},
}
```


Post model

```
 {
   Titel: {type: String, required: true},
   img: {type: String},
   post: {type: String, required: true},
   date: { type: String, default: new Date() },
   isdel: {type: boolean, default: false},
   isclose: {type: boolean, default: false},
   Comment: {type: Schema.Types.ObjectId,ref:'Comment'},
   creator: {type: Schema.Types.ObjectId,ref:'User'}
   like: {type: Schema.Types.ObjectId,ref:'Like'}
   tag: {type: String},


   
 }
```
meetup model

```
 {
   Titel: {type: String, required: true},
   img: {type: String},
   dese: {type: String, required: true},
   date: { type: String, default: new Date() },
   isdel: {type: boolean, default: false},
   isclose: {type: boolean, default: false},
   Comment: {type: Schema.Types.ObjectId,ref:'Comment'},
   creator: {type: Schema.Types.ObjectId,ref:'User'}
   like: {type: Schema.Types.ObjectId,ref:'Like'}
   tag: {type: String},


   
 }
```
service model

```
 {
   Titel: {type: String, required: true},
   img: {type: String},
   dese: {type: String, required: true},
   date: { type: String, default: new Date() },
   price: {type: Number},
   isdel: {type: boolean, default: false},
   isclose: {type: boolean, default: false},
   Comment: {type: Schema.Types.ObjectId,ref:'Comment'},
   creator: {type: Schema.Types.ObjectId,ref:'User'}
   raet: {type: Schema.Types.ObjectId,ref:'Like'}
   tag: {type: String},


   
 }
```


## Backend routes

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/login/:id`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/signup` | {username, email, password}                                    | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/login`  | {email, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/logout` | (empty)                                                      | 204            | 400          | Logs out the user                                            |
| GET         | /post/:id         | (empty) | 200               | 404             |Used to get one post by id . |
| GET         | /posts         | (empty) | 200               | 404             |Used to get all posts. |
| PUT         | /post/:id  | {username, img, titel, post, tag |  201           | 400          | Used to update one post by id                 |
| POST        | /post/creta| {username, img, titel, post, tag} |                |              | Used to create post , using current logged in user id as a creator. |
| DELETE      | /post/:id  |                                                              | 200            | 401          | Used to delete one post id                 |
| GET         | /meetup/:id   | (empty) | 200               | 404             |Used to get one meetup by id|
| GET         | /meetsup        | (empty) | 200               | 404             |Used to get all meetup. |
| PUT         | /meetup/:id  | {username, img, titel, post, tag,|  201           | 400          | Used to update one meetup by id .          |
| POST        | /meetup/creta| {username, img, titel, post, tag} |                |              | Used to create meetup , using current logged in user id as a creator. |
| DELETE      | /meetup/:id  |                                                              | 200            | 401          | Used to delete one meetup by id .            |
| GET         | /service/:id  | (empty) | 200               | 404             |Used to get one service by id|
| GET         | /services       | (empty) | 200               | 404             |Used to get all service. |
| PUT         | /service/:id  | {username, img, titel, post, tag,|  201           | 400          | Used to update one service by id .          |
| POST        | /service/creta| {username, img, titel, post, tag} |                |              | Used to create service , using current logged in user id as a creator. |
| DELETE      | /service/:id  |                                                              | 200            | 401          | Used to delete one service by id .            |
## Links
### Trello
[Link to your trello board](https://trello.com/mpprojecthaitham) 
### Git


[Client repository Link](https://github.com/MP-Project-Haitham/server)

[Server repository Link](https://github.com/MP-Project-Haitham/client)

[Deployed App Link](https://github.com/MP-Project-Haitham)
### Slides


[Slides Link](https://github.com/MP-Project-Haitham)

### Wireframe

Home page
![Home page](./img/home.png)
Post page
![Post page](./img/post_page.png)
Meetup page
![Meetup page](./img/meet_up_page.png)
Service page 
![Service page](./img/serves_page.png)

## UML
![UML](./img/UML.png)

## ERD
![ERD](./img/ERD.png)


