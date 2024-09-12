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



