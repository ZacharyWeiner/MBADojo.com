$(function(){
	Parse.$ = jQuery;

	Parse.initialize("F9JwBgjiIktkVlGLlIHiFn7NPefiSZp9YqSkVfjc","KRo9teT0uHQHvqFHYtSJr36AuN2w9kbPhV4qWFfw");
	// var TestObject = Parse.Object.extend("TestObject");
	// var testObject = new TestObject();

	// testObject.save({foo:"bar"}).then(function(object){
	// 	alert("Holy fuck It Worked!");
	// });

	//Class Declaration - create a type of object that can have instances created from it  
	var Message = Parse.Object.extend("Message");

	var MessageSentView = Parse.View.extend({
		template: Handlebars.compile($('#message-sent-tpl').html()),
		render: function(){
			this.$el.html(this.template());
		}
	});
	
	var MessageView = Parse.View.extend({

		template: Handlebars.compile($('#message-tpl').html()), 
		events : {
			'submit .form-message': 'sendMessage'
		},
		sendMessage : function(e){
			e.preventDefault();
			var data = $(e.target).serializeArray(),
			 name = data[0].value,
			 email = data[1].value, 
			 text = data[2].value;

			 var Message = Parse.Object.extend("Message");
			var message = new Message();
			message.save({"name":name, "email":email, "text":text}).then(function(message){
				//alert('message sent!');
				var messageSentView = new MessageSentView();
				messageSentView.render();
				$('.message-form').html(messageSentView.el);
			});
		},
		render: function(){
			//var collection = {blog: this.collection.toJSON()};
			this.$el.html(this.template());
		}
	});

	


	var messageView = new MessageView();
	messageView.render();
	$('.message-form').html(messageView.el);


	

	// //Lets create an instance of a collection of blog items, we will use this collection to populate with
	// //blog entries  
	// var blogs = new Blogs();
	// blogs.fetch({
	// 	success:function(blogs){
	// 		console.log(blogs);
	// 		//When I get successfully get a collection of blogs this code will execute
	// 		// so lets create a View, and put the data in it. 
	// 		var blogsView = new BlogsView({collection:blogs});
	// 		blogsView.render();
	// 		$('.main-container').html(blogsView.el);

	// 		var datesView = new BlogsDateLinksView({collection:blogs});
	// 		datesView.render();
	// 		$('.dates-container').html(datesView.el);
	// 		var datesBarHeight = blogs.count * 200;
	// 		$('.dates-container').set({height:datesBarHeight});
	// 	}, 
	// 	error:function(blogs, error){
	// 		console.log(error);
	// 	}
	// });
});