(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['project-template'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<dt> "
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + " </dt>\n			<dd> "
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0)) != null ? stack1 : "")
    + "</dd>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"last")),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":10,"column":3},"end":{"line":18,"column":10}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<a href=\"#\" class=\"image-link\" data-url=\""
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0)) != null ? stack1 : "")
    + "\">\n					"
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n				</a>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<a href=\"#\" class=\"image-link\" data-url=\""
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0)) != null ? stack1 : "")
    + "\">\n					"
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n				</a>,\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<a style=\"color:black\" href=\"../index.html#projects\"> ← Back </a>	\n<h1>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":13}}}) : helper)))
    + "</h1>\n	<dl>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":8,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"photos") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":2},"end":{"line":19,"column":11}}})) != null ? stack1 : "")
    + "	</dl>\n";
},"useData":true});
})();