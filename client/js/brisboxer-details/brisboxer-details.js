Template.brisboxerDetails.helpers({
    email: function(){
    	return this.emails[0].address;
    },
    exists: function(){
    	return this._id != undefined;
    }
});