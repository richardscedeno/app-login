<?php 
    class Rol_Control {
        public $Rol_Model = null;
        public function __construct() {
            $this -> rol_model = new Rol_Model();
        }

        public function getRolById($f3) {
            $paramsID = $f3 -> get('PARAMS.id');
            $response = $this -> rol_model -> load(['rol_id = ?', $paramsID]);
            $message = '';
            $data = array();

            if(!$response) {
                $message = 'No existe rol con ese id';
                echo json_encode ([
                    'message' => $message
                ]);
                return;
            }

            $message = 'Success';
            $data = $this -> rol_model -> cast();

            echo json_encode ([
                'message' => $message,
                'info' => [
                    'data' => $data
                ]
            ]);
        }
    }
?>
