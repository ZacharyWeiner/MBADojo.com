$(function(){
	Parse.$ = jQuery;

	Parse.initialize("F9JwBgjiIktkVlGLlIHiFn7NPefiSZp9YqSkVfjc","KRo9teT0uHQHvqFHYtSJr36AuN2w9kbPhV4qWFfw");
	// var TestObject = Parse.Object.extend("TestObject");
	// var testObject = new TestObject();

	// testObject.save({foo:"bar"}).then(function(object){
	// 	alert("Holy fuck It Worked!");
	// });

	//Class Declaration - create a type of object that can have instances created from it  
	var Blog = Parse.Object.extend("Blog");
	//Decalres a Class that is a Collection of a specific type in our case this is a blog 
	var Blogs = Parse.Collection.extend({
		model : Blog,
		query : (new Parse.Query(Blog)).descending('createdAt')
	});

	//Declares a class that takes and HTML Script tag as a template, it will look for the template with the 
	//$.id of #blogs-tpl and give that class a set of instructions as to what to do when
	//the template should be rendered. 
	// In this case when this Blogs view needs to be added to the screen it will get a 
	// collection of blog entries and render them into the blogs-ptl template by binding 
	// the properties of a Blog item and replacing the tokens from the template with the 
	// values of Blog item/.
	var BlogsView = Parse.View.extend({

		template: Handlebars.compile($('#blogs-tpl').html()), 
		render: function(){
			var collection = {blog: this.collection.toJSON()};
			this.$el.html(this.template(collection));
		}
	});

	// var BlogsDateLinksView = Parse.View.extend({
	// 	template : Handlebars.compile($('#blogs-date-link-tpl').html()),
	// 	render : function (){
	// 		var collection = {blog: this.collection.toJSON()}
	// 		// var dates[];
	// 		// for (var i = collection.length - 1; i >= 0; i--) {
	// 		// 	dates.add(collection[i]['createdAt'];
	// 		// };
	// 		this.$el.html(this.template(collection));
	// 	}

	// });

	//Lets create an instance of a collection of blog items, we will use this collection to populate with
	//blog entries  
	var blogs = new Blogs();
	blogs.fetch({
		success:function(blogs){
			console.log(blogs);
			//When I get successfully get a collection of blogs this code will execute
			// so lets create a View, and put the data in it. 
			var blogsView = new BlogsView({collection:blogs});
			blogsView.render();
			$('.main-container').html(blogsView.el);

			var datesView = new BlogsDateLinksView({collection:blogs});
			datesView.render();
			$('.dates-container').html(datesView.el);
			var datesBarHeight = blogs.count * 200;
			$('.dates-container').set({height:datesBarHeight});
		}, 
		error:function(blogs, error){
			console.log(error);
		}
	});
});