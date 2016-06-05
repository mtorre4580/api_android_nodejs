var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/db';
var logger = require('./logger/logger'); 

module.exports = {

	obtenerProfesoresCercanos:function(coordenadas,callback){
		MongoClient.connect(url, function(err, db) {
			if(err){
				logger.error('Error al conectarse a mongoDB ', err);
				callback(err);
			}else{
				db.collection('profesores').find({'ubicacion':{$within:{"$center":[coordenadas,10]}}}).toArray(function(err, profesoresCercanos){
  		  			callback(null,profesoresCercanos);
  				});
  			}
		});
	},

	registrarProfesor:function(profesor,callback){
		MongoClient.connect(url, function(err, db) {
			if(err){
				logger.error('Error al conectarse a mongoDB ', err);
				callback(err);
			}else{
				db.collection('profesores').insertOne(profesor,function(err,result){
					if(err){
						logger.error('Error al registrar al profesor ', err);
						callback(err);
					}else{
						logger.info('Se registra el profesor: ' + profesor);
						callback(null);
					}
				});
			}
		});
	}

}
