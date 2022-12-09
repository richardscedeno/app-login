<?php 
    class Acceso_Control {
        public $Acceso_Model = null;
        public function __construct() {
            $this -> acceso_model = new Acceso_Model();
        }

        public function getAccesoById($f3) {
            $paramsID = $f3 -> get('PARAMS.id');
            $response = $this -> acceso_model -> load(['rol_id = ?', $paramsID]);
            $message = '';
            $data = array();

            if(!$response) {
                $message = 'No existe el acceso con ese rol';
                echo json_encode ([
                    'message' => $message
                ]);
                return;
            }

            $message = 'Success';
            $data = $this -> acceso_model -> cast();

            echo json_encode ([
                'message' => $message,
                'info' => [
                    'data' => $data
                ]
            ]);
        }
    }
?>
