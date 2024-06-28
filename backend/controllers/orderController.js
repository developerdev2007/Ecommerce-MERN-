import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

//todo:Utility Function

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}
// !!!!creating order
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order Items ");
    }
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrdersItems = orderItems.map((itemsFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemsFromDB) => itemsFromDB._id.toString() === itemsFromClient._id
      );
      if (!matchingItemFromDB) {
        res.status(400);

        throw new Error(`Product Not Found:${itemsFromClient._id}`);
      }
      return {
        ...itemsFromClient,
        product: itemsFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calcPrices(dbOrdersItems);

    const order = new Order({
      orderItems: dbOrdersItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const calculateTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    res.json(salesByDate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (order) {
      res.json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
const markOrderPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params._id);
    if (order) {
      (order.isPaid = true), (order.PaidAt = Date.now());

      order.paymentResult = {
        id: req.body.id,
        status: req.user.status,
        update_time: req.body.update_time,
        email_address: res.body.email_address,
      };
      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
const markOrderAsDeliver = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderPaid,
  markOrderAsDeliver,
};
