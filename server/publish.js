Meteor.publish('brisboxers', function () {
    return Meteor.users.find({roles: "brisboxer"}, {
        fields: {
            _id: 1,
            username: 1,
            emails: 1,
            profile: 1,
            accepted: 1,
            name: 1,
            surname: 1,
            phone: 1,
            zip: 1,
            assessments: 1
        }
    });
});

Meteor.publish('ordersAvailable', function () {
    var user_id = this.userId;
    if (!user_id) {
        throw new Meteor.Error("forbidden");
    }
    //La sentencia $where ejecuta Javascript. Bajo rendimiento con muchos registros.
    //La unica forma de solucionar el rendimiento es añadir dato derivado persistido que indique que el order está ya asignado completamente.
    return Orders.find({
        $where: "this.brisboxers.length < this.numberBrisboxers",
        "brisboxers._id": {$ne: user_id}
    });
});

Meteor.publish('myOrders', function () {
    var user_id = this.userId;
    if (!user_id) {
        throw new Meteor.Error("forbidden");
    }
    return Orders.find({"brisboxers._id": user_id});
});

Meteor.publish('zipsAll', function () {
    return Zips.find();
});

Meteor.publish('findCodePromotion', function () {
    return Promotions.find();
});

Meteor.publish('oneOrder', function(_id){
	return Orders.find({_id: _id});
});