package vttp2022.assessment.csf.orderbackend.services;

import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;

@Service
public class OrderService {

	public static final String SQL_SELECT_ORDERS =
		"select order_id from orders where email=?";

	public static final String SQL_INSERT_ORDERS =
		"insert into orders(name, email, pizza_size, thick_crust, sauce, toppings, comments) values (?, ?, ?, ?, ?, ?, ?)";

	@Autowired
	private PricingService priceSvc;
	@Autowired
    private JdbcTemplate template;

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public void createOrder(Order order) {

		try {
            int updated = template.update(SQL_INSERT_ORDERS, order.getName(), order.getEmail(),
			 order.getSize(), order.isThickCrust(), order.getSauce(), order.getToppings(), order.getComments());;
            System.out.printf("updated: %d\n", updated);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
		

	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {
		// Use priceSvc to calculate the total cost of an order

		List<OrderSummary> orders = new LinkedList<>();
        SqlRowSet rs = template.queryForRowSet(SQL_SELECT_ORDERS, email);

        while (rs.next()) {

			Order p = new Order();

			OrderSummary os = new OrderSummary();
			os.setOrderId(rs.getInt("order_id"));
			os.setName(rs.getString("name"));
			os.setEmail((rs.getString("email")));
			os.setAmount((float) 0);

            orders.add(os);            
        }

        return orders;


	}
}
