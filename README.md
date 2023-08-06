# CCAPDEV-GROUP11
## cafebara cafe review site with backend

-----------------------------------------------------------------------
<<<<<<< HEAD
HOW TO RUN WEB APP:
1. Install dependencies using `npm i`
2. Populate the DB using
    1. `npm run pop1`
    2. Terminate manually
    3. `npm run pop2`
    4. Terminate manually
3. Run the web app using `npm run start`
4. Enter "http://localhost:3000/" in the browser address bar
5. Enjoy
=======
NOTE:   
    - Make sure to have a working 
    - Collections should still be manually imported to MongoDB.
        - Obtain the JSON files of the pre-existing collections in 'db_data_init' folder
        - Using MongoDB Compass, import the file collections to the database "apdev_test"
>>>>>>> f5d61038973dc27714ab771f8c162ff6e2b84282

    - To run the website
        - Start the server using "npm start" command
        - Enter "http://localhost:3000/cafebara/" in the browser url to open index.html (guest-view)
    
-----------------------------------------------------------------------

The following describes the features of a restaurant / store / service review web application. Groups may choose to either develop a review web application for either restaurants, stores, or services. For realism, groups may base the establishments featured in the application from actual establishments that are found around the campus. The minimum features required to be implemented for this project is as follows:
- View establishments
  - Upon visiting the web page, an unregistered visitor may see a list of establishments that are featured in the web application.
  - The overall rating and a brief description of the establishment must be easily viewed/accessible from the list.
  
- View an establishment’s reviews
  - Upon selecting an establishment, an unregistered visitor may see the top reviews. The user can also see the next set of top reviews--it is up to the group whether to implement this in the same (auto-load) or another page.
  - Reviews can be long, so some of the text in the preview could be truncated. Clicking the review will let the user view the review in full detail.
  - Reviews should also include how many registered users found the review helpful / unhelpful.
- Register
  - A visitor must register if they want to post a review. Here, a visitor must
enter their username, their password, an avatar, and a short description
(can be left empty).
- Login
  - After registering properly, a visitor may log-in. Upon logging in, the user
can start posting reviews. The user is given the option to be “remembered” by the website. When the user chooses this option, every log in and visit to the website will extend their “remember” period by 3 weeks.
- Logout
  - The user may log out from their account. This should cut short the
“remember” period if it exists, and clears any session-related data.
- View a user profile
  - Each user has their own page which shows their profile publicly. On the
same page, a visitor may see the user’s username, profile picture, and a short description. They may also see a portion of the user’s latest reviews and comments. The visitor may opt to see the rest of the posts and comments of the user.
- Edit Profile
  - A user that is logged in may edit their user profile, wherein they can add / modify a profile picture, and provide a short description (can be left
empty).
- Create a review
  - A logged-in user may create a review on a selected establishment. They
must give a title and the body of the review.
  - A rating must also be given by the reviewer. It is up to the student what
kind of rating system they choose to implement (e.g., 5-star rating, recommended/not recommended) as long as it can be aggregated to some degree.
  - Users must also be allowed to attach media (e.g., image, videos) to their review.
  - Additional points will be given for allowing markup (e.g., rich text editing) without the risk of cross site-scripting.
- Mark as Helpful / Unhelpful
  - A logged-in user can mark a review as either helpful/unhelpful once.
- Edit / Delete a review
  - The owner of the review may edit their review at any point. Edited reviews should have an indication that it has been edited.
  - The owner of the post may delete their review as well.
- Search Establishments / Reviews
  - A visitor/user can search for establishments by similarities in the name
or the description. By entering a search phrase/word, all establishment containing the keyword/phrase will appear. Visitors may also filter establishments based on its overall rating
  - A visitor/user can search for reviews on an establishment by similarities in the title or the post body. By entering a search phrase/word, all reviews containing it will appear as results.
- Establishment owner response
  - Groups must implement an additional user account role – establishment
owner. This doesn’t need to be integrated with the register system, and
credentials can be created manually by the database admin.
  - Establishmentowneraccountsaretiedtoasingleestablishment,andcan respond to reviews on their establishment. Their responses would then be
published, making it visible to the public.
- General
  - Good user experience.
  - Visitors can easily navigate without help, all information is easy to access.
  - Good visual design.
  - Design suits the theme of the application, and is cohesive and consistent across the whole application.

    
