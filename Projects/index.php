<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic PDF Rendering</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        .pdf-page {
            border: 1px solid black;
            margin-bottom: 20px;
            width: 100%;
        }
        .page-number-list {
            cursor: pointer;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h3 class="text-center">Dynamic PDF Rendering and Manipulation in the Frontend</h3>
    </div>

    <div class="container mt-5">
        <form id="upload-form" method="post" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="pdf" class="form-label text-dark">Select PDF to upload:</label>
                <input type="file" class="form-control" name="pdf" id="pdf" accept=".pdf">
            </div>
            <button type="submit" class="btn btn-primary">Upload</button>
        </form>
    </div>

    <div class="container mt-3">
        <div class="row m-5">
            <div id="page-list" class="list-group col-md-2">
                <!-- Page numbers will be dynamically inserted here -->
            </div>
            <div class="col-md-8">
                <canvas id="pdf-canvas" class="pdf-page"></canvas>
            </div>
            <div class="col-md-2">
                <button id="download-btn" class="btn btn-success mt-2">Download PDF</button>
            </div>
        </div>
    </div>

    <div class="container mt-5">
    <h3 class="text-center">Extracted Questions and Answers</h3>
    <table id="qa-table" class="table table-bordered table-hover">
        <thead class="table-dark">
            <tr>
                <th>Q.No</th>
                <th>Question</th>
                <th>Answer</th>
            </tr>
        </thead>
        <tbody>
            <!-- tbody will be populated dynamically by JavaScript -->
        </tbody>
    </table>
</div>


    <!-- Add PDF.js library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.min.js"></script>
    <!-- Add PDF-lib library for generating PDFs -->
    <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"></script>

    <!-- Add Tesseract.js library for text extraction -->
    <script src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.1/dist/tesseract.min.js"></script>
    <!-- Custom JavaScript file -->
    <script src="./Js/Render.js"></script>
</body>
</html>
