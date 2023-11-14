import { DataTypes, Model } from 'sequelize'; 
import util from 'util'; 
import connectToDB from './db.js';  

export const db = await connectToDB('postgresql:///project-db');

export class User extends Model {   
[util.inspect.custom]() {     
return this.toJSON();   
}
}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'User', //Choose the model name here
    timestamps: false //assuming you dont want sequelize to automatically manage createdAt and updatedAt timestamps
});

export class Product extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }  

Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image_url: {
      type: DataTypes.TEXT,
      validate: {
        isURL: true
      }
    }
  }, {
    sequelize: db,
    modelName: 'Product',
    // tableName: 'Products',
    timestamps: false
  });

  export class Order extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }

  Order.init({
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize: db,
    modelName: 'Order',
    // tableName: 'Orders',
    timestamps: false
  });
  
  export class OrderDetail extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  OrderDetail.init({
    order_detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize: db,
    modelName: 'OrderDetail',
    // tableName: 'OrderDetails',
    timestamps: false
  });

  export class Review extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }

  Review.init({
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT
    },
    review_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize: db,
    modelName: 'Review',
    // tableName: 'Reviews',
    timestamps: false
  });
  
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, {foreignKey: 'user_id' });

User.hasMany(Review, { foreignKey: 'user_id'});
Review.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(OrderDetail, { foreignKey: 'product_id' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
  
  