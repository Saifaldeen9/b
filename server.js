const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

let vendors = [];
let employees = [];
let products = [];

// Load initial data from JSON files
const loadData = () => {
    try {
        if (fs.existsSync('vendors.json')) {
            vendors = JSON.parse(fs.readFileSync('vendors.json'));
        }
    } catch (error) {
        console.error("Error loading vendors.json:", error);
    }

    try {
        if (fs.existsSync('employees.json')) {
            employees = JSON.parse(fs.readFileSync('employees.json'));
        }
    } catch (error) {
        console.error("Error loading employees.json:", error);
    }

    try {
        if (fs.existsSync('products.json')) {
            products = JSON.parse(fs.readFileSync('products.json'));
        }
    } catch (error) {
        console.error("Error loading products.json:", error);
    }
};

// Save data to JSON files
const saveData = () => {
    fs.writeFileSync('vendors.json', JSON.stringify(vendors, null, 2));
    fs.writeFileSync('employees.json', JSON.stringify(employees, null, 2));
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
};

// Load initial data
loadData();

// Endpoint to save vendor data
app.post('/save_vender', (req, res) => {
    const venderData = req.body;

    console.log("Received vendor data:", venderData); // Log received data

    if (vendors.some(vendor => vendor.vendorId === venderData.vendorId)) {
        console.error("Vendor ID already exists.");
        return res.status(400).json({ status: 'error', message: 'Vendor ID already exists.' });
    }

    vendors.push(venderData);
    try {
        saveData();
        console.log("Vendor information saved successfully.");
        res.status(200).json({ status: 'success', message: 'Vendor information saved successfully.' });
    } catch (error) {
        console.error("Failed to save vendor information:", error);
        res.status(500).json({ status: 'error', message: 'Failed to save vendor information.' });
    }
});

// Endpoint to save employee data
app.post('/save_employee', (req, res) => {
    const employeeData = req.body;

    console.log("Received employee data:", employeeData); // Log received data

    if (employees.some(employee => employee.employeeId === employeeData.employeeId)) {
        console.error("Employee ID already exists.");
        return res.status(400).json({ status: 'error', message: 'Employee ID already exists.' });
    }

    employees.push(employeeData);
    try {
        saveData();
        console.log("Employee information saved successfully.");
        res.status(200).json({ status: 'success', message: 'Employee information saved successfully.' });
    } catch (error) {
        console.error("Failed to save employee information:", error);
        res.status(500).json({ status: 'error', message: 'Failed to save employee information.' });
    }
});

// Endpoint to save product data
app.post('/save_product', upload.array('productImages', 4), (req, res) => {
    const productData = req.body;
    productData.images = req.files.map(file => file.path);

    console.log("Received product data:", productData); // Log received data

    products.push(productData);
    try {
        saveData();
        console.log("Product information saved successfully.");
        res.status(200).json({ status: 'success', message: 'Product information saved successfully.' });
    } catch (error) {
        console.error("Failed to save product information:", error);
        res.status(500).json({ status: 'error', message: 'Failed to save product information.' });
    }
});

// Endpoint to get all employees
app.get('/get_employees', (req, res) => {
    res.status(200).json(employees);
});

// Endpoint to search for an employee by ID
app.get('/search_employee', (req, res) => {
    const employeeId = req.query.employeeId;
    const employee = employees.find(emp => emp.employeeId === employeeId);

    if (!employee) {
        return res.status(404).json({ status: 'error', message: 'Employee not found.' });
    }

    res.status(200).json(employee);
});

// Endpoint to search for a vendor by name or ID
app.get('/search_vendor', (req, res) => {
    const query = req.query.query.toLowerCase();
    const vendor = vendors.find(vend => vend.vendorId.toLowerCase() === query || vend.businessName.toLowerCase() === query);

    if (!vendor) {
        return res.status(404).json({ status: 'error', message: 'Vendor not found.' });
    }

    res.status(200).json(vendor);
});

// Serve static files (HTML pages)
app.use(express.static(path.join(__dirname, 'public')));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
