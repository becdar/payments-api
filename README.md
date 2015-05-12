Florida Payments API Generator
==============================
The state of Florida released state agency payment data for use at the National Day of Civic Hacking (NDoCH) 2015.  This data is greatly appreciated, but it's in huge, pipe-delimited text files.  This isn't the easiest format to use.

This repository contains the files needed to set up your own RESTful API of that data.  In order to use it, you'll need the following:

* Node.JS
* MongoDB
* Sails
* Mongoose

To begin, download the payments data you want and extract. Place it in the folder of you choice (you'll see a text.txt file in 2014 - this is where FY2014.txt would go). Clone the repository and make sure that MongoDB is running. I create an empty database (payments) before starting.  Then navigate into the main folder and run:

```
    node import.js
```

This will import the records into your MongoDB database. *NOTE: This is memory intensive. Make sure you have at least 4GB of RAM allocated.*  Once the data has been imported, update the Sails configuration files to connect to your MongoDB database and run:

```
    sails lift
```

This will start your Sails API.  As of right now, the only API view setup is http://localhost:1337/payments. More will be added as we get closer to NDoCH, and all pull requests are welcome!