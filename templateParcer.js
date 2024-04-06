function TemplateEngine(template, data) {
    // Regular expression to match placeholders in the template
    var regex = /<%([^%>]+)%>/g;

    // Replace placeholders with corresponding values from the data object
    return template.replace(regex, function(match, key) {
        // If the key exists in the data object, return its value
        // Otherwise, return an empty string
        return data.hasOwnProperty(key) ? data[key] : '';
    });
}

// Example usage
var template = 'Hello, my name is <%name%>. I\'m <%age%> years old.';
console.log(TemplateEngine(template, {
    name: "TestName",
    age: 29
}));
