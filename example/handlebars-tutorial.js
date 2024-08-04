function fill_template() {
	var data = {
		title: "handlebars",
		list: [
		{name: "1"},
		{name: "2"},
		{name: "3"},
		{name: "<b>4</b>"}
		],
		footer: "footer"
	};
	var template = Handlebars.compile(document.querySelector('#template').innerHTML);
	var filled = template(data, {
		noEscape:true
	}); 
	document.querySelector('#output').innerHTML = filled;
}