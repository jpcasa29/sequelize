const db = require('../database/models');


const apiBuscadorController = {
    getAll: function(req, res) {
        db.Movie.findAll({
            include: [
                {association: "actores"}
                ],
              where: {
                status: 1
              },
              order: [
                ['title', 'ASC'],
                ]
        })
        .then(function(result) {
            return res.status(200).json(result)
        })
    }
    
}

module.exports = apiBuscadorController