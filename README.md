# Door Lock App

## General Information

The app is a proof of concept - smart lock management and access interface. Both interfaces are available depending on users role: employee or admin. In both cases, a user has to authenticate to interact with the app.

The project was build using:
* [React](https://reactjs.org/)
* [Sass](https://sass-lang.com/)
* [redux](https://redux.js.org/)
* [Firebase](https://firebase.google.com/)
* [redux-form](https://redux-form.com/7.3.0/)
* [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase/)

Project setup is an ejected [create-react-app](https://github.com/facebook/create-react-app) -  adjusted to use scss-loader

## Usage Notes

The project is available on-line: https://www.thefullresolution.com/doorlock/

To run project locally, clone the repo, use command `yarn install`, then `yarn start`


### Admin's Functionality
To test admin's functionality use following credentials:

email	            | password
------------------|---------
manager@tommy.com | manager

* #### Home Page
On the home page, admin can open doors of all the businesses which are associated with the account.

* #### Dashboard
On the dashboard, admin can see the list all the businesses which are associated with the account, link to Employees dashboard and a toggle button to see last 5 logs. If logs list is opened a link to all logs is visible.

* #### Employees Dashboard
Employees Dashboard is the most complex part of the app. Admin can see the list of employees assigned to the current business. The access to the doors can be adjusted by clicking Edit toggle button. There an admin can also remove an employee.
To add employees admin can search the database by using a form on that page. If email exists, users info will appear on the right and then, it can be added to the list. To test this you can use list below, or create a new user by signing up.

* ##### Mock User Accounts

name 	    | lastname |	email	                 | password
----------|----------|-------------------------|-------
Liè       | Hovert   |thovert0@stanford.edu    | doorapp
Loïs      | Sturt    |bsturt1@weibo.com        | doorapp
Crééz     | Duester  |cduester2@dyndns.org     | doorapp
Marylène  | Diggons  |vdiggons3@state.tx.us    | doorapp
Miléna    | De Blase |jdeblase4@ox.ac.uk       | doorapp
Dafnée    | Rowan    |hrowan5@printfriendly.com| doorapp
Björn     | Bowler   |kbowler6@zimbio.com      | doorapp


### User Accounts

An average user has access only to home screen, where doors can be opened. However, to see any doors, the user has to be added to at least one business by the admin. Since firebase updates data out of the box, the page doesn't have to refresh to see the locks, once the user has been added to a business.
