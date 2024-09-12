document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(form);

        // Check if a file is selected before proceeding
        if (!formData.get('pdf')) {
            alert("Please select a PDF file to upload.");
            return;
        }

        // Send form data to the backend using Fetch API
        fetch("Backend/Upload.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            if (data.message) {
                alert("PDF uploaded successfully!");
                form.reset(); // Reset the form after successful submission

                // Load and render the uploaded PDF
                loadAndRenderPDF(data.id);
            } else {
                alert("An error occurred: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
        });
    });

    function loadAndRenderPDF(id) {
        fetch("Backend/Upload.php?id=" + id)
            .then(response => response.arrayBuffer()) // Retrieve the PDF as an ArrayBuffer
            .then(data => {
                const pdfjsLib = window["pdfjs-dist/build/pdf"];
                pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js";

                const loadingTask = pdfjsLib.getDocument({ data: data });
                loadingTask.promise.then(pdf => {
                    const pageList = document.getElementById("page-list");
                    const pdfCanvas = document.getElementById("pdf-canvas");
                    const ctx = pdfCanvas.getContext("2d");

                    pageList.innerHTML = ""; // Clear previous page numbers

                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        pageList.innerHTML += `<a class="list-group-item list-group-item-action" data-page="${pageNum}">Page ${pageNum}</a>`;
                    }

                    function renderPage(num) {
                        pdf.getPage(num).then(page => {
                            const viewport = page.getViewport({ scale: 1 });
                            pdfCanvas.height = viewport.height;
                            pdfCanvas.width = viewport.width;
                            const renderContext = {
                                canvasContext: ctx,
                                viewport: viewport,
                            };
                            page.render(renderContext).promise.then(() => {
                                // Once the page is rendered, extract text using Tesseract.js
                                extractTextWithTesseract(pdfCanvas);
                            });
                        });
                    }

                    // Event listener for page list click (to render specific pages)
                    document.getElementById("page-list").addEventListener("click", function (event) {
                        if (event.target.tagName === "A") {
                            const pageNum = parseInt(event.target.getAttribute("data-page"));
                            renderPage(pageNum); // Render selected page
                        }
                    });

                    // Render the first page by default
                    renderPage(1);
                }).catch(error => {
                    console.error("PDF loading error:", error);
                    alert("Failed to load PDF.");
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
                alert("Failed to fetch PDF data.");
            });
    }

    /**
     * Extract text using Tesseract.js from the rendered canvas.
     * @param {HTMLCanvasElement} canvas - The canvas element where the PDF page is rendered.
     */
    function extractTextWithTesseract(canvas) {
        Tesseract.recognize(
            canvas,
            'eng',
            {
                logger: info => console.log(info), // Log progress information
            }
        ).then(({ data: { text } }) => {
            parseAndDisplayQA(text); // Parse and display the extracted text
        }).catch(error => {
            console.error("Tesseract.js error:", error);
            alert("Text extraction failed.");
        });
    }

    /**
     * Parse and display questions and answers extracted from the text.
     * @param {string} text - The text content to parse.
     */
    function parseAndDisplayQA(text) {
        let qaTableBody = document.querySelector("#qa-table tbody");

        // If tbody doesn't exist, create it
        if (!qaTableBody) {
            const qaTable = document.querySelector("#qa-table");
            qaTableBody = document.createElement("tbody");
            qaTable.appendChild(qaTableBody);
        }

        qaTableBody.innerHTML = ""; 

        const questionsAndAnswers = text.split(/Q\d+\.\s+/).filter(part => part.trim().length > 0);

        questionsAndAnswers.forEach(part => {
            const [question, answer] = part.split(/Ans\s*:\s*/); 
            if (question && answer) {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${question.trim()}</td><td>${answer.trim()}</td>`;
                qaTableBody.appendChild(row); 
            }
        });
    }
});
