<?php 
    class Persona_Control {
        public $Persona_Model = null;
        public function __construct() {
            $this -> persona_model = new Persona_Model();
        }

        public function getPersonByCi($f3) {
            $paramsCI = $f3 -> get('PARAMS.ci');
            $response = $this -> persona_model -> load(['per_ci = ?', $paramsCI]);
            $message = '';
            $data = array();

            if(!$response) {
                $message = 'No persona con ese id';
                echo json_encode ([
                    'message' => $message
                ]);
                return;
            }

            $message = 'Success';
            $data = $this -> persona_model -> cast();

            echo json_encode ([
                'message' => $message,
                'info' => [
                    'data' => $data
                ]
            ]);
        }
    }
?>
