package vttp2022.assessment.csf.orderbackend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@RestController
@RequestMapping(path = "api/order")
public class OrderRestController {

    @Autowired
    private JdbcTemplate template;

    @Autowired
    private OrderService svc ;


    @GetMapping(path = "{email}")
    public ResponseEntity< List<OrderSummary>> getOrders(@PathVariable String email) {
        List<OrderSummary> opt = svc.getOrdersByEmail(email);


        // if (opt.isEmpty()) {
		// 	BookResponse resp = new BookResponse();
		// 	resp.setStatus(404);
		// 	resp.setMessage("Book %s not found".formatted(bookId));
		// 	return ResponseEntity.status(HttpStatus.NOT_FOUND)
		// 			.body(resp.toJson().toString());
		// }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(opt);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postUpoad(@RequestBody Order payload) {

        System.out.println(">>>>>> payload" + payload);

        svc.createOrder(payload);

        return ResponseEntity.ok(payload.toString());
    }

}
