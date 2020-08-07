module.exports = function(sequelize, dataTypes) {
    let alias = "Movie";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        release_date: {
            type: dataTypes.DATE
            
        },
        length: dataTypes.INTEGER(10),
        awards: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        status: {
            type: dataTypes.TINYINT(5)
        },
        trailer: {
            type: dataTypes.STRING(500)
        }
    }
    let config = {
        tableName: "movies",
        timestamps: true,
        underscored: true
    }
    
    let Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models) {
        Movie.belongsTo(models.Genero, {
            as: "genero",
            foreignKey: "genre_id"
        });
        Movie.belongsToMany(models.Actor, {
            as: "actores",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        })
    }

    return Movie;
}