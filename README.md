📌 Project Objective

I developed a system that allows users to view and interact with specific pages of a large PDF file efficiently using PHP and JavaScript, without creating multiple copies of the PDF. The system also supports downloading the currently selected page, thereby achieving the goal of avoiding unnecessary duplication.

🛠 Technologies Used

🎨 Frontend

HTML5: For designing the web page.

Bootstrap 5: For styling and making the web page responsive.

🔧 Backend

PHP: Used as the backend for handling PDF files and interacting with the frontend. PDFs are uploaded and stored in a MySQL database, then dynamically fetched and displayed on the frontend.

MySQL: Used for storing and managing PDF files.

Apache2: Web server used for running the project.

📚 Packages and Libraries

📄 PDF.js

Used to render PDF pages dynamically. This library enables efficient rendering of PDF content directly in the browser without needing multiple copies of the file. For single-page handling, only the requested pages are loaded and displayed, optimizing performance and reducing memory usage.

🔗 CDN Link:

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>

🔍 Tesseract.js

Used for Template-Based Region Selection. Tesseract.js is a JavaScript-based OCR (Optical Character Recognition) library that allows text extraction from scanned PDFs directly in the browser.

🔗 CDN Link:

<script src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.1/dist/tesseract.min.js"></script>

🗄 Database Configuration

$servername = "localhost";
$db = "pdf_db";
$username = "your_database_username";
$password = "your_database_password";

🚀 Steps to Run

Clone the repository:

git clone https://github.com/your-repository.git

Install dependencies:

If PHP is not installed, install it.

If MySQL is not installed, install it.

If Apache2 server is not installed, install it.

If phpMyAdmin is not set up, install and configure it.

Set up the database:

Log in to phpMyAdmin with your credentials.

Create a database named pdf_db.

Import the pdf_db.sql file into the database.

Alternate database import method (Linux users):

cd /path/to/pdf_db.sql
sudo mysql -u your_database_username -p pdf_db < pdf_db.sql

Enter your MySQL user password when prompted.

Deploy the project:

Copy the project folder into the /var/www/html directory.

Verify ownership:

ls -l /var/www/html

If the owner is root, change ownership:

sudo chown your_linux_username:your_linux_username /var/www/html/Project

Run the project:

Open your browser and navigate to:

http://localhost/Project

Upload the sample PDF provided in the cloned project and test the functionalities.

🚀 Enjoy using the system! Let me know if you have any questions. 😊

