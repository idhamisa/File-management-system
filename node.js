const express = require('express');
const sql = require('msnodesqlv8');
const app = express();
const port = 3000;

// SQL Server configuration with connection string
const connectionString = "server=LAPTOP-0CRS004B;Database=File_data;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";

// Middleware to parse JSON body
app.use(express.json());

// Fetch data from SQL Server for "/"
app.get("/", (req, res) => {
    const query = "SELECT * FROM [vw_sites-23.Jul.2024-2.19pm]";

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error("Error executing query for /:", err);
            return res.status(500).send("Server error");
        }

        // Log the query results to the console
        console.log("Query Results for /:", rows);

        // Send the query results as a response
        res.json(rows); // Changed to json for proper formatting
    });
});

// Fetch data from SQL Server for "/ShowCountries"
app.get("/ShowSiteName", (req, res) => {
    const query = "SELECT siteName FROM [vw_sites-23.Jul.2024-2.19pm]";

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error("Error executing query for /ShowSiteName:", err);
            return res.status(500).send("Server error");
        }

        // Log the query results to the console
        console.log("Query Results for /ShowSiteName:", rows);

        // Send the query results as a response
        res.json(rows); // Changed to json for proper formatting
    });
});


// Fetch data from SQL Server for "/ID"
app.use(express.json());

// Route to fetch data based on the provided id
app.post("/findbyID", (req, res) => {
    const { id } = req.body;

    // Validate the id parameter
    if (!id) {
        return res.status(400).send('ID is required');
    }

    // Define the query to fetch data where id = input id
    const query = `SELECT * FROM [vw_sites-23.Jul.2024-2.19pm] WHERE id = ?`;

    // Execute the query
    sql.query(connectionString, query, [id], (err, rows) => {
        if (err) {
            console.error("Error executing query for /findbyID:", err);
            return res.status(500).send("Server error");
        }

        // Log the query results to the console
        console.log("Query Results for /findbyID:", rows);

        // Send the query results as a response
        res.json(rows);
    });
});


// Route to add new data
app.post('/addData', (req, res) => {
    const {
        id, status, siteId, siteName, address, zone, subdistrict,
        district, state, postCode, country, latitude, longitude,
        structureType, structureHeight, handover, active, dismantled,
        landExpiry, expiryDays, assets, sharers, excludeSharers,
        utilSharers, cabins, outdoors
    } = req.body;

    // Validate the required fields
    if (
        !id || !status || !siteId || !siteName || !address || !zone || !subdistrict ||
        !district || !state || !postCode || !country || latitude === undefined || longitude === undefined ||
        !structureType || structureHeight === undefined || !handover || active === undefined ||
        dismantled === undefined || !landExpiry || !expiryDays || !assets || 
        !sharers || !excludeSharers || !utilSharers || !cabins || !outdoors
    ) {
        return res.status(400).send('All fields are required');
    }

    // Construct the SQL query
    const query = `
        INSERT INTO [vw_sites-23.Jul.2024-2.19pm] 
        (id, status, siteId, siteName, address, zone, subdistrict, 
         district, state, postCode, country, latitude, longitude,
         structureType, structureHeight, handover, active, dismantled, 
         landExpiry, expiryDays, assets, sharers, excludeSharers, 
         utilSharers, cabins, outdoors)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    sql.query(connectionString, query, [
        id, status, siteId, siteName, address, zone, subdistrict,
        district, state, postCode, country, latitude, longitude,
        structureType, structureHeight, handover, active, dismantled,
        landExpiry, expiryDays, assets, sharers, excludeSharers,
        utilSharers, cabins, outdoors
    ], (err) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Server error");
        }

        console.log('Data added successfully');
        res.status(201).send('Data added successfully');
    });
});


// Route to update data based on the provided id, column, and value
app.post('/updateData', (req, res) => {
    const { id, column, value } = req.body;

    // Validate the required fields
    if (!id || !column || value === undefined) {
        return res.status(400).send('ID, column, and value are required');
    }

    // Define allowed columns to prevent SQL injection
    const allowedColumns = [
        'id', 'status', 'siteId', 'siteName', 'address', 'zone', 'subdistrict',
        'district', 'state', 'postCode', 'country', 'latitude', 'longitude',
        'structureType', 'structureHeight', 'handover', 'active', 'dismantled',
        'landExpiry', 'expiryDays', 'assets', 'sharers', 'excludeSharers',
        'utilSharers', 'cabins', 'outdoors'
    ];

    if (!allowedColumns.includes(column)) {
        return res.status(400).send('Invalid column specified');
    }

    // Construct the SQL queries
    const getCurrentValueQuery = `SELECT ${column} FROM [vw_sites-23.Jul.2024-2.19pm] WHERE id = ?`;
    const updateQuery = `UPDATE [vw_sites-23.Jul.2024-2.19pm] SET ${column} = ? WHERE id = ?`;

    // Execute the queries
    sql.query(connectionString, getCurrentValueQuery, [id], (err, rows) => {
        if (err) {
            console.error("Error executing query to get current value:", err);
            return res.status(500).send("Server error");
        }

        // Check if a record was found
        if (rows.length === 0) {
            return res.status(404).send('Record not found');
        }

        // Get the current value of the column
        const currentValue = rows[0][column];

        // Update the column value
        sql.query(connectionString, updateQuery, [value, id], (err) => {
            if (err) {
                console.error("Error executing query to update value:", err);
                return res.status(500).send("Server error");
            }

            // Send the old and new values as a response
            res.status(200).json({
                message: `${column} updated successfully`,
                oldValue: currentValue,
                newValue: value
            });
        });
    });
});


// Route to update Sale Price for record with ID = 1
app.use(express.json());

// Route to update data based on the provided id, column, and value
app.post('/updateData', (req, res) => {
    const { id, column, value } = req.body;

    // Validate the required fields
    if (!id || !column || value === undefined) {
        return res.status(400).send('ID, column, and value are required');
    }

    // Define allowed columns to prevent SQL injection
    const allowedColumns = [
        'id', 'status', 'siteId', 'siteName', 'address', 'zone', 'subdistrict',
        'district', 'state', 'postCode', 'country', 'latitude', 'longitude',
        'structureType', 'structureHeight', 'handover', 'active', 'dismantled',
        'landExpiry', 'expiryDays', 'assets', 'sharers', 'excludeSharers',
        'utilSharers', 'cabins', 'outdoors'
    ];

    if (!allowedColumns.includes(column)) {
        return res.status(400).send('Invalid column specified');
    }

    // Construct the SQL queries
    const getCurrentValueQuery = `SELECT [${column}] FROM [vw_sites-23.Jul.2024-2.19pm] WHERE id = ?`;
    const updateQuery = `UPDATE [vw_sites-23.Jul.2024-2.19pm] SET [${column}] = ? WHERE id = ?`;

    // Execute the queries
    sql.query(connectionString, getCurrentValueQuery, [id], (err, rows) => {
        if (err) {
            console.error("Error executing query to get current value:", err);
            return res.status(500).send("Server error");
        }

        // Check if a record was found
        if (rows.length === 0) {
            return res.status(404).send('Record not found');
        }

        // Get the current value of the column
        const currentValue = rows[0][column];

        // Update the column value
        sql.query(connectionString, updateQuery, [value, id], (err) => {
            if (err) {
                console.error("Error executing query to update value:", err);
                return res.status(500).send("Server error");
            }

            // Send the old and new values as a response
            res.status(200).json({
                message: `${column} updated successfully`,
                oldValue: currentValue,
                newValue: value
            });
        });
    });
});

app.use(express.json()); // This should be present



//To find all data
app.post('/find', (req, res) => {
    const query = "SELECT * FROM [Financial Sample] WHERE ID = 5"

    // Validate the required fields
    if (!id || !column || value === undefined) {
        return res.status(400).send('ID, column, and value are required');
    }

    // Define allowed columns to prevent SQL injection
    const allowedColumns = [
        'Segment', 'Country', 'Product', 'Discount Band', 'Units Sold',
        'Manufacturing Price', 'Sale Price', 'Gross Sales', 'Discounts',
        'Sales', 'COGS', 'Profit', 'Date', 'Month Number', 'Month Name', 'Year'
    ];

    if (!allowedColumns.includes(column)) {
        return res.status(400).send('Invalid column specified');
    }

    // Construct the SQL queries
    const getCurrentValueQuery = `SELECT [${column}] FROM [Financial Sample] WHERE ID = ?`;
    const updateQuery = `UPDATE [Financial Sample] SET [${column}] = ? WHERE ID = ?`;

    // Execute the queries
    sql.query(connectionString, getCurrentValueQuery, [id], (err, rows) => {
        if (err) {
            console.error("Error executing query to get current value:", err);
            return res.status(500).send("Server error");
        }

        // Check if a record was found
        if (rows.length === 0) {
            return res.status(404).send('Record not found');
        }

        // Get the current value of the column
        const currentValue = rows[0][column];

        // Update the column value
        sql.query(connectionString, updateQuery, [value, id], (err) => {
            if (err) {
                console.error("Error executing query to update value:", err);
                return res.status(500).send("Server error");
            }

            // Send the old and new values as a response
            res.status(200).json({
                message: `${column} updated successfully`,
                oldValue: currentValue,
                newValue: value
            });
        });
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
