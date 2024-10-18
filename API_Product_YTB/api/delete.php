<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Header: Content-Type, Access-Control-Allow-Headers,Authorization,x-Requested-Width");




include_once '../config/Database.php';
include_once '../models/Product.php';


$database = new Database();
$db = $database->getConnection();
$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id) ){
    $product->id = $data->id;
    if ($product->delete()) {
        http_response_code(201);
        echo json_encode(array("message" => "Product was deleted"));
    }
    else{
        http_response_code(503);
        echo json_encode(array("message" => "Product not deleted"));
    }
}