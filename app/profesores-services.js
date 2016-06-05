var app = require('express')();
var bodyParser = require('body-parser');
var mongoDB = require('./mongo.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/obtener-profesores/:lat/:long', function(req, res) { 
	mongoDB.obtenerProfesoresCercanos(crearUbicacion(req.params.lat,req.params.long),function(err,profesores){
		if(err){
			res.json({status:500, error: 'Error al buscar profesores cercanos en tu zona', msg :''}).end();
		}else{
			res.json(profesores).end();
		}
	});
});

app.post('/alta-profesor',function(req,res){
	mongoDB.registrarProfesor(crearProfesorJSON(req),function(err){
		if(err){
			res.json({status:500, error: 'Error al registrar al profesor' , msg :''}).end();
		}else{
			res.json({status:200,error: '',msg : 'Se ha registrado correctamente'}).end();
		}
	});
});

function crearUbicacion(lat,long){
	return [parseFloat(lat),parseFloat(long)];
}

function crearProfesorJSON(req){
	return {
		nombre: req.body.nombre,
		email: req.body.email,
		cel: req.body.cel,
		ubicacion: req.body.ubicacion,//[parseFloat(req.body.latitud),parseFloat(req.body.longitud)],
		instrumento: req.body.instrumento
	};
}

module.exports = app;



