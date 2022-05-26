# 🖥️ ADDRESS BOOK API

## ✅ Test the API

**[https://address-book-api-assignment.herokuapp.com/](https://address-book-api-assignment.herokuapp.com/)**

## 💾 Database schemas

#### Contact schema

| **Field** | **Type** | **Required** | **Unique** | **Default** |
| --------- | -------- | ------------ | ---------- | ----------- |
| name      | String   | True         | False      | -           |
| address   | String   | True         | False      | -           |
| contact   | String   | True         | True       | -           |

## 🌍 APIs

| Method | Route                           | Parameters | Query parameters         | Body                                               | Description                            |
| ------ | ------------------------------- | ---------- | ------------------------ | -------------------------------------------------- | -------------------------------------- |
| GET    | /api/auth/get-jwt               | -          | -                        | -                                                  | Get JWT access token                   |
| GET    | /api/contact/id                 | {id}       | -                        | -                                                  | Get single contact by using its ID     |
| GET    | /api/contact/query              | -          | {name, address, contact} | -                                                  | Get contacts by using query parameters |
| GET    | /api/contact                    | -          | {page, limit}            | -                                                  | Get paginated list of contacts         |
| POST   | /api/contact/new/single-contact | -          | -                        | {name: String, address: String, contact: String}   | Create new single contact              |
| POST   | /api/contact/new/bulk-contact   | -          | -                        | [{name: String, address: String, contact: String}] | Create bulk contacts                   |
| PATCH  | /api/contact                    | -          | {id}                     | -                                                  | Update existing contact details        |
| DELETE | /api/contact                    | -          | {id}                     | -                                                  | Delete existing contact                |

## 🛠 Installation and setup

1. Clone the repo to your local machine.
2. Install the required dependency for server using :

   ```javascript
   npm install
   ```

3. Create a .env file inside the root folder and provide the following environment variables:

   ```env
   PORT=<port>
   MONGODB_URI=<mongo_uri>
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRE=5d
   ```

4. Start the dev server using :

   ```javascript
   npm run dev
   ```

## 😎 Developed by

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/83509023?v=4" width="150px" alt="GSSoC'22" />
      <br/>
      Varun Kumar Tiwari
      <br/>
      <a href="https://www.linkedin.com/in/varun-tiwari-454591178/">LinkedIn</a>
      <a href="https://github.com/varunKT001">Github</a>
    </td> 
  </tr>
</table>
