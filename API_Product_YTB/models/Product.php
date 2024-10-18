<?php 

class Product{
    private $conn;
    private $table = "t_product";

    public $id;
    public $productName;
    public $price;

    public function __construct($db)
    {
        $this->conn= $db;
    }

    public function read(){
        $query = "SELECT ID_Product, Product_Name, Product_Price FROM ".$this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create(){
        $query = "INSERT INTO " .$this->table . "
         SET Product_Name=:Product_Name,Product_Price=:Product_Price";
         $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Product_Name",$this->productName);
        $stmt->bindParam(":Product_Price",$this->price);

        if($stmt->execute()){
            return true;
        }
        else{
            false;
        }

    }

    public function update(){
        $query = "UPDATE  " .$this->table . "
         SET Product_Name=:Product_Name,Product_Price=:Product_Price
          WHERE ID_Product=:ID_Product";
         $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Product_Name",$this->productName);
        $stmt->bindParam(":Product_Price",$this->price);
        $stmt->bindParam(":ID_Product",$this->id);

        if($stmt->execute()){
            return true;
        }
        else{
            false;
        }

    }

    public function delete(){
        $query = "DELETE FROM  " .$this->table . " WHERE ID_Product = ?";
         $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1,$this->id);

        if($stmt->execute()){
            return true;
        }
        else{
            false;
        }

    }
    

}