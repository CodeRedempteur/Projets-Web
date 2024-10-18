<?php 
class Database{
    private $host = "localhost";
    private $database = "db_ytb";
    private $username = "root";
    private $password = "password";
    private $conn;

public function getConnection(){
    $this->conn = null;
    try{
        $this->conn = new PDO(
            "mysql:host=".$this->host.";dbname=".$this->database,
            $this->username,
            $this->password
        );
        $this->conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e){
        echo "Connection Error : ". $e->getMessage();
    }
    return $this->conn;
}

}