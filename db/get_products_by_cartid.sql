select products.title as products_title, styles.title as styles_title, products.price as products_price, styles.imageurl, products_in_order.quantity as products_qty, products_in_order.productid as product_id, products_in_order.id as id
from products_in_order
join products
on products.productid = products_in_order.productid
join styles
on products_in_order.styleid = styles.styleid
where products_in_order.orderid = $1;
