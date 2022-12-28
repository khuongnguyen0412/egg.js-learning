module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const User = app.model.define('user', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      name: STRING(30),
      age: INTEGER,
    });
  
    User.add = async function(name: string, age: number) {
      return await this.create({
        name: name,
        age: age,
        created_at: Date.now(),
        updated_at: Date.now(),
      }).then(function (result) {
        if (result) {
          return true;
        } else {
          return false;
        }
    });
    }
  
    User.findById = async function(id) {
      return await this.findOne({
        attributes: ['id', 'name'],
        where: {
          id: id
        }
      });
    }
  
    User.getAll = async function() {
      return await this.findAll();
    }
  
    User.delete = async function(id) {
      return await this.destroy({
        where: {
          id: id
        }
      }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
          return true;
         }else{
          return false;
         }
      }, function(err){
          console.log(err); 
          return false;
      });
    }
  
    // don't use arraw function
    // User.prototype.logSignin = async function() {
    //   return await this.update({ last_sign_in_at: new Date() });
    // }
  
    return User;
  };