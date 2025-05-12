# 🛒 praveenKart

**praveenKart** is a modern full-stack eCommerce platform built with **React**, **Tailwind CSS**, **Node.js**, **Express**, **MySQL**, and **Knex.js**. It provides a smooth and responsive user experience with essential features like product browsing, shopping cart, user authentication, and backend API integration.

---

## ⚙️ Tech Stack

### 🧩 Frontend
- **React** (with Vite)
- **Tailwind CSS** (responsive UI)
- **React Router DOM** (routing)
- **React(Tanstack) Query** (API calls)

### 🛠️ Backend
- **Node.js + Express** (REST API)
- **MySQL** (relational database)
- **Knex.js** (SQL query builder)
- **JWT** (authentication)
- **Dotenv** (environment config)

---

## 🚀 Features

- ✅ Responsive user interface
- 👤 User authentication (Register/Login)
- 🛍️ Product catalog
- 🛒 Add to cart / Remove from cart
- 📦 Order summary
- 🧾 API-based architecture
- 📧 Email integration via Nodemailer

---

## 🏁 Getting Started

### 📂 Clone the Repo

```bash
git clone https://github.com/yourusername/praveenKart.git
cd praveenKart



🖥️ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
The frontend runs on http://localhost:5173 by default.



🔧 Backend Setup
bash
Copy
Edit
cd backend
npm install


Create .env in backend/
env
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=praveenkart_db
JWT_SECRET=your_jwt_secret
Set Up Database with Knex
Ensure you have a valid knexfile.js, then run:

bash
Copy
Edit
npx knex migrate:latest     # Run all migrations
npx knex seed:run           # (Optional) Seed sample data
Start the Backend Server
bash
Copy
Edit
npm run dev
The backend runs on http://localhost:5000

🗂️ Project Structure
css
Copy
Edit
praveenKart/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── migrations/
│   ├── knexfile.js
│   └── server.js
🧪 Upcoming Features
✅ Admin dashboard (product/user management)

💳 Payment gateway integration (Stripe or Razorpay)

⭐ Product reviews and ratings

📦 Order tracking

📊 Analytics

📫 Contributing
If you'd like to contribute or report issues, feel free to open a pull request or raise an issue.

📄 License
MIT License

yaml
Copy
Edit

---

Would you like this saved as a downloadable `README.md` file or pasted into your GitHub repo directly? I can also help generate example `knexfile.js` or migration files if needed.







