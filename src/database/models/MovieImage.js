module.exports=function(sequelize, dataTypes){
    let alias = "MovieImage";
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        movies_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(200)
        }
    };
    let config = {
        tableName: "movies_images",
        timestamps: false
    }
    let MovieImage = sequelize.define(alias, cols, config);

    MovieImage.associate = function(models) {
        MovieImage.belongsTo(models.Movie, {
            as: "movies",
            foreignKey: "movies_id"
            })
    }

    return MovieImage;
}