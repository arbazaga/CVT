# Product Requirements Document

### Overview

This document details the requirements for CVT: Catalog Validation Tool which is an Excel-based Chrome extension that allows Amazon employees, vendors, and sellers to validate product data on Amazon detail pages. 

### Goals

- Allow users to validate key product data points on Amazon listing pages against an Excel spreadsheet of ASINs and expected values
- Increase efficiency of validating listings by automating the process of checking multiple pages
- Provide visual output of which data points matched or did not match expected values for easy analysis

### Requirements

#### Functional Requirements

- The extension must accept an Excel file with the following columns:
  - Column A: ASIN 
  - Column B and beyond: Expected string values to verify on page
- Users must be able to initiate processing from the extension popup. This will:
  - Loop through each row in the Excel sheet
  - Construct the Amazon URL using the ASIN in Column A
  - Navigate to the URL and extract the relevant data points from the page
  - Compare the extracted data to the expected values in that row
  - Color the cell green if the data matches or red if it does not
  - Move to the next row and repeat
- After processing all rows, the colored Excel sheet must be downloaded to the user's device
- The extension popup must show a "Processing..." status while verification is running

#### Non-Functional Requirements

- The extension must work across all Amazon regional domains (e.g. amazon.com, amazon.co.uk) 
- Processing of up to 1000 rows should complete within 5 minutes
- The colored Excel output must maintain all formulas and formatting of the original sheet
- The extension must work across Chrome, Edge, and Firefox browsers

#### Out of Scope

- Processing sheets with more than 1000 rows
- Advanced Excel functions like pivot tables in output
- Verification of images or non-text data points

### User Interface

The extension will have a simple popup with two buttons:

- Select Excel Sheet: File picker to choose input Excel sheet
- Start Processing: Initiates the verification process

While processing, the button will change to "Processing..." and be disabled.

### Project Status

The extension is currently in the testing and prototype phase. Key tasks completed:

- Initial Chrome extension scaffolding and manifest setup
- Proof of concept to parse Excel sheet and validate data on sample page 
- Mockups for basic UI flow and popup

Next steps are to:

- Develop out full functionality based on requirements
- Conduct internal testing across browsers
- Create documentation and guides
- Release a beta version for pilot users

### Future Enhancements

- Support for CSV input files
- Integration with Amazon Seller Central, Vendor Central to pull ASIN list and expected values
- Expansion to other data sources like Walmart, Target, etc.
