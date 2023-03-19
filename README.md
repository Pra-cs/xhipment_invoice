# Xhipment pdf invoice generator.

## Prerequisites

-> [Node.js](http://nodejs.org/) (with npm or Yarn)

## Getting Started

This repository is an example of how to make PDF invoices with PDFKit and Node.js

There are two important fields in this this repository:

-> [`index.js`] is the main entry point. It defines the data structure used to create the invoices.
-> [`createInvoice.js`] exports a function that can be used to create invoice PDFs.

To get started, use the following commands:

```bash
git clone https://github.com/PSPDFKit-labs/pdfkit-invoice.git

npm install  # Install dependencies

npm start  # This will create an invoice.pdf file in the root of the project.
```