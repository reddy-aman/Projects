document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const pdfCanvas = document.getElementById("pdf-canvas");
    const pageList = document.getElementById("page-list");
    const downloadBtn = document.getElementById("download-btn");
    let pdfDoc = null; // Store the loaded PDF document
    let selectedPageNum = 1; // Default to page 1

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
                    pdfDoc = pdf;
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
                                canvasContext: pdfCanvas.getContext("2d"),
                                viewport: viewport,
                            };
                            page.render(renderContext).promise.then(() => {
                                selectedPageNum = num; // Update the selected page number
                                extractTextFromPDF(pdfDoc, num); // Extract text after rendering
                            });
                        }).catch(error => {
                            console.error("Page rendering error:", error);
                        });
                    }

                    // Event listener for page list click (to render specific pages)
                    pageList.addEventListener("click", function (event) {
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

    function extractTextFromPDF(pdf, pageNum) {
        pdf.getPage(pageNum).then(page => {
            page.getTextContent().then(textContent => {
                const textItems = textContent.items;
                let text = textItems.map(item => item.str).join(' ');
                parseAndDisplayQA(text);
            });
        });
    }

    function parseAndDisplayQA(text) {
        const qaTableBody = document.querySelector('#qa-table tbody');
        qaTableBody.innerHTML = ''; // Clear previous content

        // Regular expression to match questions and answers
        const qaRegex = /Q(\d+)\.\s*(.*?)\s*Ans\s*:\s*(.*?)(?=(?:Q\d+\.|$))/gs;

        let match;
        let questionNumber = 1;

        while ((match = qaRegex.exec(text)) !== null) {
            const question = match[2].trim();
            const answer = match[3].trim();

            // Format answers to ensure consistent presentation
            const formattedAnswer = answer.replace(/\s+/g, ' '); // Remove extra whitespace

            // Ensure question and answer are non-empty
            if (question && formattedAnswer) {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${questionNumber}</td><td>${question}</td><td>${formattedAnswer}</td>`;
                qaTableBody.appendChild(row);
                questionNumber++;
            }
        }

        // Handle any remaining unprocessed text (e.g., incomplete questions or answers)
        // const remainingText = text.replace(qaRegex, '').trim();
        // if (remainingText) {
        //     const incompleteRow = document.createElement('tr');
        //     incompleteRow.innerHTML = `<td>Incomplete</td><td colspan="2">${remainingText}</td>`;
        //     qaTableBody.appendChild(incompleteRow);
        // }
    }

    /**
     * Download the currently selected page as a PDF.
     */
    async function downloadPage() {
        if (!pdfDoc) {
            alert("No PDF document loaded.");
            return;
        }
        
        try {
            const pdfjsLib = window["pdfjs-dist/build/pdf"];
            const { PDFDocument } = window.PDFLib;

            // Get the page from the existing PDF document
            const page = await pdfDoc.getPage(selectedPageNum);
            const viewport = page.getViewport({ scale: 1 });

            // Create a new canvas to render the page
            const canvas = document.createElement("canvas");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const context = canvas.getContext("2d");

            // Render the page onto the canvas
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            // Convert canvas to image data
            const imageData = canvas.toDataURL("image/png");

            // Create a new PDF document
            const newPdfDoc = await PDFDocument.create();
            const image = await newPdfDoc.embedPng(imageData);
            const pageWidth = canvas.width;
            const pageHeight = canvas.height;
            const pdfPage = newPdfDoc.addPage([pageWidth, pageHeight]);
            pdfPage.drawImage(image, {
                x: 0,
                y: 0,
                width: pageWidth,
                height: pageHeight
            });

            // Save the new PDF
            const pdfBytes = await newPdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `page-${selectedPageNum}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download the page as PDF.");
        }
    }

    // Event listener for download button
    downloadBtn.addEventListener('click', function() {
        downloadPage();
    });
});
