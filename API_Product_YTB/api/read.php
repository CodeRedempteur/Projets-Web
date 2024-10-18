<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


include_once '../config/Database.php';
include_once '../models/Product.php';


$database = new Database();
$db = $database->getConnection();

$product = new Product($db);
$stm = $product->read();
$num = $stm->rowCount();

if($num > 0){
    $products_arr = array();
    $products_arr["records"] = array();

    while ($row = $stm->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $product_item = array(
            "ID_Product" => $ID_Product,
            "Product_Name" => $Product_Name,
            "Product_Price" => $Product_Price
        );
        array_push($products_arr["records"], $product_item);
    }
    http_response_code(200);
    echo json_encode($products_arr);
}
else{
    http_response_code(404)
    ;
    echo json_encode(array("message" => "No products found"));


}