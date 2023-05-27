# Select Box Auto-create Function

This is a simple custom select box creation function using jQuery.

## Usage

1. Include the jQuery library in your web page (if not already included):


```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```
# 2. Copy the JavaScript code into your JavaScript file or keep it within a <script> tag in your HTML document.
# 3. Use the createSelectBox method to create a custom select box:
```javascript
    $(selector).createSelectBox(apiUrl, pageSize, dataText, inputName, onSelect);
```
`selector`: A string representing the HTML element where you want to place the custom select box.
`apiUrl`: The URL of the API from which you want to retrieve data. This API should support the pageNo, pageRecord, and keyword parameters for pagination and data searching.
`pageSize`: The number of options to display per page.
`dataText`: The name of the property in the API options object to display as text in the options.
`inputName`: The name attribute for the input field within the custom select box.
`onSelect`: A callback function that is called when an option is selected. It receives the selected option value as an argument.
##
4. Use the getSelected method to retrieve the value of the selected option:
```javascript
let selectedValue = $(selector).getSelected();
```
`selectedValue` will contain an object with two properties: value (the value of the selected option) and text (the text displayed on the input field).

5 Use the `setData` method to set data for the input field within the custom select box:
```javascript
$(selector).setData(data);
```
`data` is the data you want to set for the input field.
Below is an example of how to use the function:
```javascript
// Create custom select box
$("#mySelectBox").createSelectBox("https://example.com/api/data", 10, "name", "myInput", function(selectedOption) {
    console.log("Selected option:", selectedOption);
});

// Get the value of the selected option
let selectedValue = $("#mySelectBox").getSelected();
console.log("Selected value:", selectedValue);

// Set data for the input field
let data = {
    value: 1,
    text: "Option 1"
};
$("#mySelectBox").setData(data);
//Replace "#mySelectBox" with any appropriate selector for the HTML element you want to use as the custom select box.
```

