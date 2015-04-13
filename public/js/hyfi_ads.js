$(function(){
	Parse.$ = jQuery;

	Parse.initialize("41eTSPf2xqBfPJcQ49luADLkgGmM2ZJ04lkRa3u1","VZGwHtsmQKxJKbZP4WfuB9nOLKmcbcyIsLI8JkfL");
	var adUrl;
	function getQueryVariable(variable) {
	    var query = window.location.search.substring(1);
	    var vars = query.split("&");
	    for (var i = 0; i < vars.length; i++) {
	        var pair = vars[i].split("=");
	        if (pair[0] == variable) {
	            return unescape(pair[1]);
	        }
	    }
	    return false;
	}

	//Class Declaration - create a type of object that can have instances created from it  
	var Advertisement = Parse.Object.extend("Advertisement");
	//Decalres a Class that is a Collection of a specific type in our case this is a blog 
	var gender = getQueryVariable('gender');
	var age = getQueryVariable('age');
	var name = getQueryVariable('name');

	var adQuery = new Parse.Query(Advertisement);
	var ageInt = parseInt(age);
	adQuery.lessThan("ageMin", ageInt);
	adQuery.greaterThan("ageMax", ageInt);
	if(gender == 'male'){
		adQuery.notEqualTo('gender','female');
	}else if (gender == 'female'){
		adQuery.notEqualTo('gender', 'male');
	}else{
		adQuery.equalTo('gender', 'all');
	}
	adQuery.include('company');
	adQuery.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	    var imageUrl = results[0].get('imageFile');
	   	adUrl = imageUrl.url();
	    //alert(imageUrl.url());
	    
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});

	var Ads = Parse.Collection.extend({
		model : Advertisement,
		query : adQuery
	});

	//Declares a class that takes and HTML Script tag as a template, it will look for the template with the 
	//$.id of #blogs-tpl and give that class a set of instructions as to what to do when
	//the template should be rendered. 
	// In this case when this Blogs view needs to be added to the screen it will get a 
	// collection of blog entries and render them into the blogs-ptl template by binding 
	// the properties of a Blog item and replacing the tokens from the template with the 
	// values of Blog item/.
	var AdsView = Parse.View.extend({

		template: Handlebars.compile($('#blog-entry-tpl').html()), 
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
	var ads = new Ads();
	ads.fetch({
		success:function(ads){
			console.log(ads);
			var adsView = new AdsView({collection:ads});
			adsView.render();
			$('.main-container').html(adsView.el);
			$('.leadImage')[0].src = adUrl;
		}, 
		error:function(ads, error){
			console.log(error);
		}
	});
});