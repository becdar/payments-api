var fs = require('fs'),
	readline = require('readline'),
	mongoose = require('mongoose');

// Create mongoose connection to db.payments and set up schema to keep things tidy
mongoose.connect('mongodb://localhost/payments'); 
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId; 

var paymentItem = new Schema({
	fiscalYear : { type: Number },
	vendorType : { type: String },
	vendorNumber : { type: String },
	vendorName : { type: String },
	vendorName2 : { type: String},
	addressLine1 : { type: String },
	addressLine2 : { type: String },
	addressLine3 : { type: String },
	agencyCode : { type: String },
	agencyName : { type: String },
	statewideDocumentNumber : { type: String },
	warrantNumber : { type: Number },
	warrantDate : { type: Date },
	agencyDocumentNumber : { type: String },
	areaCode : { type: String },
	phone : { type: String },
	invoiceNumber : { type: String, unique: true },
	object : { type: String },
	objectName : { type: String },
	amount : { type: Number }
});

var payment = mongoose.model('payment', paymentItem);
  
// Sets objects with headers in .doc because they aren't included in file
function toObject(arr1) {
	var headers = ["fiscalYear", "vendorType", "vendorNumber", "vendorName", "vendorName2", "addressLine1", "addressLine2", "addressLine3", "agencyCode", "agencyName", "statewideDocumentNumber", "warrantNumber", "warrantDate", "agencyDocumentNumber", "areaCode", "phone", "invoiceNumber", "object", "objectName", "amount"];

	var result = arr1.reduce(function(result, field, index) {
	    result[headers[index]] = field.trim();
	    return result;
	  }, {});

	return result;
}
 
// Create read-by-line stream settings
var rd = readline.createInterface({
	input: fs.createReadStream(__dirname + '/FY2014/FY2014.txt'),
	output: process.stdout,
	terminal: false
});
 
rd.on('line', function(line) {
	// Split on delimiter & convert to object with headers (strips whitespace, too)
	var split = toObject(line.split("|"));

	// Insert into MongoDB
	var insert = new payment(split);
 
	insert.save(function(err, insert) {
		if (err) return console.error(err);
		console.dir(insert);
	}); 
 
// This console.log is optional, but I like to keep tabs on the import while it's running because it's massive.
console.log(split);
}); 