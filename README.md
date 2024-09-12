# Projects Objective
I developed a system that allows users to view and interact with specific pages of a large PDF file efficiently using PHP and JavaScript, without creating multiple copies of the PDF. The system also supports downloading the currently selected page, thereby achieving the goal of avoiding unnecessary duplication.

# Technologies use :

# FrontEnd 

Html5 : for designing web page
Bootstrap 5 : for styling web page

# BackEnd 

PHP : I use PHP as the backend for handling PDF files and interacting with the frontend. First, I upload PDF files and store them in a MySQL database. These files are then dynamically fetched and displayed on the frontend.
Database : use Mysql for storing and managing pdf files
Server : use Apache2 as a web server for running project

# Packages and Libraries 

# Pdf.js :

Use PDF.js to render PDF pages dynamically. This library enables efficient rendering of PDF content directly in the browser without needing multiple copies of the file. For single-page handling, load and display only the requested pages. This approach avoids loading the entire PDF at once, optimizing performance and reducing memory usage.

CDN Link : <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>


# Tesseract.js : 

use for Template Based Region Selection Tesseract.js is an OCR (Optical Character Recognition) library in JavaScript that allows us to extract text from scan pdfs directly in the browse

CDN Link : <script src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.1/dist/tesseract.min.js"></script>

# Steps to Run

1. Clone the repository.
2. If PHP is not installed, you need to install it.
3. If MySQL is not installed, you need to install it.
4. If the Apache2 server is not installed, you need to install it.
5. If phpMyAdmin is not set up, you need to set it up. After that, log in to phpMyAdmin with your login credentials.
6. Create a database named "pdf_db".
7. Import the pdf_db.sql file into the database.
8. As an alternate method to import, if you are using Linux, first navigate to the directory where pdf_db.sql is downloaded, and run the command sudo mysql -u database_username -p pdf_db < pdf_db.sql. After that, enter your MySQL database user password.
9. To serve the project using the Apache2 server, copy the project folder into the /var/www/html directory.
10. Check the project folder ownership using ls -l. If the owner is root, change ownership using sudo chown linux_username:linux_username /var/www/html/Project.
11. Open your browser, type http://localhost/Project and hit enter. You will see the project output.
12. Upload the sample PDF provided in the cloned project and test the functionalities.

