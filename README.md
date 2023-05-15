# Proximity Crud Application

This is a NextJS application focused to generate auto crud based on introspection of database and respective columns

## Tech Stack Involved

This project use Nx Workspace manager to maintain the project.

This project contains various smaller projects which collectively serves the purpose
This project involves
- A React UI Library
- A Express Project to host API's
- Prisma Client project to hold the ORM client and data models
- A NextJS project to give UI/UX to the crud application

## MVP of the project

- Introspect the database
- Create datamodels to interact with database
- Auto Generate API to work with database
- UI/UX to utilize the API and check for the operation
- Working with postgresql database

## Phase 2

- Ability to auto generate relational crud operations
- Ability to view custom table and columns in CRUD Builder
- Ability to add callback after insert and after update

## Phase 3

- Generate a entirely new project from this crud builder
- Update the generated project based on changes made in this tool

## Important Note

### Database connection url
- For PostgreSQL Database connection url must follow the following format
  - `postgresql://<username>:<password>@<host>:<port>/<database>`
- Connection url should follow cerain guideline for special characters
  ![Screenshot 2021-08-27 at 1 00 40 PM](https://user-images.githubusercontent.com/22559660/131089973-a53ad1dc-a1fe-4250-b016-bb6f3fde7f6e.png)
- For more details please refer [here](https://www.prisma.io/docs/reference/database-reference/connection-urls/)

### Database Settings
- Default database is `postgresql`
- If you want to change the database please follow steps below
  - Open `prisma.schema` from `libs/prisma-client/prisma/`
  - Change provider to the database of your choice
  - ![Screenshot 2021-08-27 at 1 05 47 PM](https://user-images.githubusercontent.com/22559660/131090724-b9cee261-684d-428d-b91d-efc3df10f31d.png)


### To run the project in local host for the first time
- Clone the repository
- Run the command `yarn`
- Rename `.env.sample` to `.env` in the root directory and enter your required credentials
- Run following commands
  - `npm run setup`
- You will find `Listening at <api-end-point>/api` in the console
- Use this `<api-end-point>` while creating below environment variables
- Rename a file named `.env.local.sample` to `.env.local` inside apps/crud-app/
- Enter the required credential required in env.local
- Then run the following command `npx nx serve crud-app`

### Once everything is running fine for the next consecutive build we just need to follow this
- Open two terminals and run the following commands
- Terminal 1
  - `npx nx serve api`
- Terminal 2
  - `npx nx serve crud-app`

## Screenshot - ER Diagram

<kbd>![er](https://user-images.githubusercontent.com/22559660/131087658-65f71938-0640-4da1-8e5e-df834b1fb338.png)</kbd>

## Screenshots - Desktop View

<kbd>![Screenshot 2021-08-26 at 2 20 16 PM](https://user-images.githubusercontent.com/22559660/131087969-da3eebf0-a58d-4d24-bbea-528b0b77402e.png)</kbd>

<kbd>![Screenshot 2021-08-26 at 2 20 30 PM](https://user-images.githubusercontent.com/22559660/131087978-20a23b86-14a1-4e59-92b4-b6548c567be5.png)</kbd>

<kbd>![Screenshot 2021-08-26 at 2 20 50 PM](https://user-images.githubusercontent.com/22559660/131087983-80a89791-3353-4a75-938a-7f4ecc9ef8e4.png)</kbd>

<kbd>![Screenshot 2021-08-26 at 2 21 07 PM](https://user-images.githubusercontent.com/22559660/131087986-7f764d14-8791-4bac-af93-63ddf45179ea.png)</kbd>

<kbd>![Screenshot 2021-08-26 at 2 21 18 PM](https://user-images.githubusercontent.com/22559660/131087989-aa44c3c1-ad1c-40a3-8cfa-07de7f0bec8a.png)</kbd>

<kbd>![Screenshot 2021-08-26 at 2 21 46 PM](https://user-images.githubusercontent.com/22559660/131088019-d8879785-cc98-418a-8050-09c8a2f5a46b.png)</kbd>

<kbd>![Screenshot 2021-08-26 at 2 21 35 PM](https://user-images.githubusercontent.com/22559660/131088024-911ccdfe-ae47-4734-9503-6ee960e2aa31.png)</kbd>

<kbd>![Screenshot 2021-08-19 at 9 51 39 PM](https://user-images.githubusercontent.com/22559660/130106334-f058a35c-f700-469c-80f8-42aebf106cbc.png)</kbd>

<kbd>![Screenshot 2021-08-19 at 9 51 59 PM](https://user-images.githubusercontent.com/22559660/130106338-a02d327a-b5b7-4990-accc-39c9cb519de2.png)</kbd>

<kbd>![Screenshot 2021-08-19 at 9 52 18 PM](https://user-images.githubusercontent.com/22559660/130106343-a4186716-befc-4019-9476-30d587d3747e.png)</kbd>

<kbd>![Screenshot 2021-08-19 at 9 52 34 PM](https://user-images.githubusercontent.com/22559660/130106348-67e3997d-76f3-4e13-8695-6521216cca5b.png)</kbd>

<kbd>![Screenshot 2021-08-19 at 9 52 53 PM](https://user-images.githubusercontent.com/22559660/130106435-e3728cf0-617c-4731-94c1-555b827b0e31.png)</kbd>

<kbd>![Screenshot 2021-08-19 at 9 53 20 PM](https://user-images.githubusercontent.com/22559660/130106430-efaa34a4-ac52-4fa6-9bf9-4a9a4380b7c7.png)</kbd>

<kbd>![Screenshot 2021-08-19 at 9 53 37 PM](https://user-images.githubusercontent.com/22559660/130106420-be8e0a14-3b7b-452d-8675-dcfe69fedfde.png)</kbd>




## Screenshots - Mobile View 

<kbd>![Screenshot 2021-08-19 at 10 00 18 PM](https://user-images.githubusercontent.com/22559660/130107702-cf781199-cbaf-4bf6-ba38-21e1da5c547b.png)</kbd>  <kbd>![Screenshot 2021-08-19 at 10 00 56 PM](https://user-images.githubusercontent.com/22559660/130107710-12e56f3f-9a4d-4aa9-99bd-5a6a4f0e720c.png)</kbd>  <kbd>![Screenshot 2021-08-19 at 10 01 18 PM](https://user-images.githubusercontent.com/22559660/130107715-370ece74-1a6d-4a73-a36a-4a70474fdbc8.png)</kbd>  <kbd>![Screenshot 2021-08-19 at 10 01 41 PM](https://user-images.githubusercontent.com/22559660/130107719-c5d67050-4958-496c-ad3d-a5c2417e5469.png)</kbd>  <kbd>![Screenshot 2021-08-19 at 10 02 09 PM](https://user-images.githubusercontent.com/22559660/130107723-d7d27c6f-dfca-4e6a-a469-896f8df5d596.png)</kbd>  <kbd>![Screenshot 2021-08-19 at 10 02 27 PM](https://user-images.githubusercontent.com/22559660/130107741-2461647b-ca82-4987-9b5f-f86406c12752.png)</kbd>  <kbd>![Screenshot 2021-08-19 at 10 02 46 PM](https://user-images.githubusercontent.com/22559660/130107747-548a1cc4-1d70-4c3e-ab08-58190007dae9.png)</kbd>  <kbd>![Screenshot 2021-08-19 at 10 03 02 PM](https://user-images.githubusercontent.com/22559660/130107752-638a3449-9652-450c-8fa5-2c60a8867a15.png)</kbd>

