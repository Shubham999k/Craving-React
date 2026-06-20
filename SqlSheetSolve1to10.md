select S.order_number, S.customer_id, C.customer_name
from sales S Join customer C
on S.customer_id=C.customer_code;

select S.order_number, S.product_id, P.product_name
from sales S Join product P
on S.product_id=P.product_code;

select S.order_number, S.order_date, C.customer_name,C.customer_city
from sales S Join customer C
on S.customer_id=C.customer_code;

SELECT 
    P.product_name,
    P.product_category,
    P.product_sub_category,
    S.order_number,
    S.quantity
FROM
    sales S
JOIN
product P ON P.product_code = S.product_id;


SELECT 
    C.customer_name,
    C.customer_phone,
    S.order_date,
    S.total_amount,
    S.payment_mode
FROM customer C
JOIN sales S
ON C.customer_code = S.customer_id
WHERE S.payment_mode IN ('UPI', 'Wallet', 'NetBanking');

SELECT 
    C.customer_city,
    COUNT(S.order_number) AS total_orders
FROM customer C
JOIN sales S
ON C.customer_code = S.customer_id
GROUP BY C.customer_city;

Select S.order_number, P.product_name, P.product_MRP
FROM sales S JOIN product P
ON S.product_id=P.product_code
WHERE P.product_MRP < 500;

SELECT 
    C.customer_name, S.product_id, P.product_name, P.product_category
FROM
    sales S
        JOIN
    customer C ON S.customer_id = C.customer_code
        JOIN
    product P ON S.product_id = P.product_code
Where P.product_category = "Electronics";

SELECT 
    C.customer_name,
    SUM(S.total_amount) AS total_spent
FROM customer C
JOIN sales S
ON C.customer_code = S.customer_id
GROUP BY C.customer_name;

SELECT 
    S.order_number,
    S.order_date,
    C.customer_name,
    P.product_name
FROM sales S
JOIN customer C
ON S.customer_id = C.customer_code
JOIN product P
ON S.product_id = P.product_code
ORDER BY S.order_date DESC;

SELECT 
    P.product_name,
    P.product_MRP,
    S.quantity,
    (P.product_MRP * S.quantity) AS LineTotal
FROM sales S
JOIN product P
ON S.product_id = P.product_code;