# Instagram Botnet Service #

## API Documentation ##
Put **/api** before endpoint

**[GET] /product/group** - Get all product groups (Admin only)
**[POST] /product/group** - Create new product groups (Admin only)


**[GET] /product** - Get all products<br> 
**[POST] /product** - Create new product (Admin only)


**[POST] /order** - Create new order (Required: *product_item_id*) 
**[GET] /order/:id** - Get order (Access by access_key (in URL) or thru Admin)
**[PUT] /order/:id** - Update order parameters (Access by access_key (in URL) or thru Admin)